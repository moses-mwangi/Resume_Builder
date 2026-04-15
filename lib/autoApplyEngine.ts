import { Job, Application, AutoApplySettings, UserProfile } from "@/types/job";

class AutoApplyEngine {
  private applications: Application[] = [];
  private todayApplications: number = 0;
  private lastApplyDate: string = "";

  constructor() {
    this.loadState();
  }

  private loadState() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("auto_apply_state");
      if (saved) {
        const state = JSON.parse(saved);
        this.applications = state.applications || [];
        this.todayApplications = state.todayApplications || 0;
        this.lastApplyDate = state.lastApplyDate || "";
      }
    }
  }

  private saveState() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "auto_apply_state",
        JSON.stringify({
          applications: this.applications,
          todayApplications: this.todayApplications,
          lastApplyDate: this.lastApplyDate,
        }),
      );
    }
  }

  private resetDailyCounter() {
    const today = new Date().toDateString();
    if (this.lastApplyDate !== today) {
      this.todayApplications = 0;
      this.lastApplyDate = today;
      this.saveState();
    }
  }

  private matchesJob(
    job: Job,
    settings: AutoApplySettings,
    profile: UserProfile,
  ): boolean {
    // Check keywords
    if (settings.keywords.length > 0) {
      const jobText =
        `${job.title} ${job.description} ${job.skills.join(" ")}`.toLowerCase();
      const hasKeyword = settings.keywords.some((kw) =>
        jobText.includes(kw.toLowerCase()),
      );
      if (!hasKeyword) return false;
    }

    // Check excluded keywords
    if (settings.excludedKeywords.length > 0) {
      const jobText = `${job.title} ${job.description}`.toLowerCase();
      const hasExcluded = settings.excludedKeywords.some((kw) =>
        jobText.includes(kw.toLowerCase()),
      );
      if (hasExcluded) return false;
    }

    // Check salary
    if (settings.minSalary > 0) {
      const salaryMatch = job.salary.match(/\d+/g);
      if (salaryMatch) {
        const maxSalary = Math.max(...salaryMatch.map(Number));
        if (maxSalary < settings.minSalary) return false;
      }
    }

    // Check location
    if (settings.locations.length > 0) {
      if (
        !settings.locations.some(
          (loc) =>
            job.location.toLowerCase().includes(loc.toLowerCase()) ||
            (settings.remoteOnly && job.remote),
        )
      ) {
        return false;
      }
    }

    // Check job type
    if (settings.jobTypes.length > 0) {
      if (!settings.jobTypes.includes(job.type)) return false;
    }

    // Check experience level
    if (settings.experienceLevels.length > 0) {
      if (!settings.experienceLevels.includes(job.experienceLevel))
        return false;
    }

    // Check remote only
    if (settings.remoteOnly && !job.remote) return false;

    // Check if already applied
    const alreadyApplied = this.applications.some(
      (app) => app.jobId === job.id,
    );
    if (alreadyApplied) return false;

    return true;
  }

  private generateCoverLetter(job: Job, profile: UserProfile): string {
    return `Dear Hiring Manager at ${job.company},

I am writing to express my strong interest in the ${job.title} position. With my background in ${profile.skills.slice(0, 3).join(", ")}, I am confident that I would be a valuable addition to your team.

${profile.experience}

My skills in ${profile.skills.join(", ")} align perfectly with your requirements for this role. I am particularly excited about the opportunity to work on ${job.responsibilities[0]}.

Thank you for considering my application. I look forward to discussing how I can contribute to ${job.company}'s success.

Best regards,
${profile.name}`;
  }

  async autoApply(
    jobs: Job[],
    settings: AutoApplySettings,
    profile: UserProfile,
  ): Promise<{ applied: Application[]; skipped: number; errors: number }> {
    this.resetDailyCounter();

    const applied: Application[] = [];
    let skipped = 0;
    let errors = 0;

    if (!settings.enabled) {
      return { applied: [], skipped: jobs.length, errors: 0 };
    }

    const remainingSlots =
      settings.maxApplicationsPerDay - this.todayApplications;
    if (remainingSlots <= 0) {
      return { applied: [], skipped: jobs.length, errors: 0 };
    }

    const eligibleJobs = jobs.filter((job) =>
      this.matchesJob(job, settings, profile),
    );
    const jobsToApply = eligibleJobs.slice(0, remainingSlots);

    for (const job of jobsToApply) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const application: Application = {
          id: `app_${Date.now()}_${Math.random()}`,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          appliedDate: new Date().toISOString(),
          status: "pending",
          coverLetter: settings.autoGenerateCoverLetter
            ? this.generateCoverLetter(job, profile)
            : "",
          resumeVersion: "latest",
          autoApplied: true,
        };

        this.applications.push(application);
        applied.push(application);
        this.todayApplications++;
        this.saveState();
      } catch (error) {
        errors++;
        console.error(`Failed to apply to ${job.title}:`, error);
      }
    }

    skipped = jobs.length - eligibleJobs.length;
    return { applied, skipped, errors };
  }

  getApplications(): Application[] {
    return this.applications;
  }

  updateApplicationStatus(
    applicationId: string,
    status: Application["status"],
  ) {
    const app = this.applications.find((a) => a.id === applicationId);
    if (app) {
      app.status = status;
      this.saveState();
    }
  }

  getTodayCount(): number {
    this.resetDailyCounter();
    return this.todayApplications;
  }
}

export const autoApplyEngine = new AutoApplyEngine();
