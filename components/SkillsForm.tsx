// components/SkillsForm.tsx - Enhanced Professional Skills Section
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Users,
  Star,
  TrendingUp,
  Award,
  Code,
  Database,
  Cloud,
  Layout,
  Settings,
  Brain,
  Shield,
  BarChart,
  Zap,
  Package,
  GitBranch,
  Terminal,
  Smartphone,
  Globe,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skill } from "@/types/resume";

// Professional skill categories with icons
const skillCategories = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: Layout,
    color: "blue",
    skills: [],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: Code,
    color: "green",
    skills: [],
  },
  {
    id: "database",
    name: "Database & Storage",
    icon: Database,
    color: "purple",
    skills: [],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "cyan",
    skills: [],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: Smartphone,
    color: "orange",
    skills: [],
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: Brain,
    color: "indigo",
    skills: [],
  },
  { id: "security", name: "Security", icon: Shield, color: "red", skills: [] },
  {
    id: "tools",
    name: "Tools & Technologies",
    icon: Settings,
    color: "gray",
    skills: [],
  },
  { id: "soft", name: "Soft Skills", icon: Users, color: "pink", skills: [] },
  {
    id: "methodologies",
    name: "Methodologies",
    icon: GitBranch,
    color: "teal",
    skills: [],
  },
];

// Predefined skill suggestions by category
const skillSuggestions: Record<string, string[]> = {
  frontend: [
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Material UI",
    "Redux",
    "Webpack",
    "HTML5/CSS3",
  ],
  backend: [
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Ruby on Rails",
    "PHP",
    "C#",
    "Spring Boot",
    "Express.js",
    "Django",
  ],
  database: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
    "Elasticsearch",
    "Firebase",
    "DynamoDB",
    "Cassandra",
    "GraphQL",
    "Prisma",
  ],
  cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "CI/CD",
    "Serverless",
  ],
  mobile: [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "iOS",
    "Android",
    "Xamarin",
    "Ionic",
    "Capacitor",
    "Expo",
  ],
  ai: [
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "OpenCV",
    "NLTK",
    "LangChain",
    "Hugging Face",
    "LLM",
  ],
  security: [
    "OWASP",
    "Penetration Testing",
    "Encryption",
    "OAuth",
    "JWT",
    "SSL/TLS",
    "Network Security",
    "Kali Linux",
    "Metasploit",
    "Wireshark",
  ],
  tools: [
    "Git",
    "Docker",
    "Kubernetes",
    "Jira",
    "Confluence",
    "Figma",
    "Postman",
    "Swagger",
    "VSCode",
    "IntelliJ",
  ],
  soft: [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Agile",
    "Critical Thinking",
    "Project Management",
    "Mentoring",
    "Presentation",
    "Negotiation",
  ],
  methodologies: [
    "Agile",
    "Scrum",
    "Kanban",
    "Waterfall",
    "Lean",
    "DevOps",
    "TDD",
    "BDD",
    "CI/CD",
    "Microservices",
  ],
};

// Proficiency levels with descriptions
const proficiencyLevels = [
  {
    value: 1,
    label: "Awareness",
    description: "Basic understanding, familiar with concepts",
  },
  {
    value: 2,
    label: "Working Knowledge",
    description: "Can work on simple tasks with guidance",
  },
  {
    value: 3,
    label: "Proficient",
    description: "Independent contributor, can handle most tasks",
  },
  {
    value: 4,
    label: "Advanced",
    description: "Deep expertise, mentors others",
  },
  {
    value: 5,
    label: "Expert",
    description: "Industry leader, drives innovation",
  },
];

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (id: string, field: keyof Skill, value: any) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function SkillsForm({
  skills,
  onUpdate,
  onDelete,
  onAdd,
}: SkillsFormProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "compact">("grid");

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  // Calculate skill distribution stats
  const skillStats = {
    total: skills.length,
    averageLevel:
      skills.reduce((sum, s) => sum + s.level, 0) / (skills.length || 1),
    categories: Object.keys(groupedSkills).length,
    topSkills: [...skills].sort((a, b) => b.level - a.level).slice(0, 3),
  };

  const addSuggestedSkill = (skillName: string, category: string) => {
    const newSkill: Skill = {
      id: Date.now().toString() + Math.random(),
      name: skillName,
      category:
        skillCategories.find((c) => c.id === category)?.name || category,
      level: 3,
    };
    onUpdate(newSkill.id, "name", newSkill.name);
    onUpdate(newSkill.id, "category", newSkill.category);
    onUpdate(newSkill.id, "level", newSkill.level);
  };

  const getLevelColor = (level: number) => {
    if (level >= 4) return "bg-green-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const getLevelStars = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < level ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header with Stats */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            Technical Skills & Competencies
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your technical skills, tools, and professional competencies
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Skill Statistics Dashboard */}
      {skills.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {skillStats.total}
            </div>
            <div className="text-xs text-gray-600">Total Skills</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">
              {skillStats.categories}
            </div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {skillStats.averageLevel.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Avg Proficiency</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {skillStats.topSkills[0]?.name || "-"}
            </div>
            <div className="text-xs text-gray-600">Top Skill</div>
          </div>
        </div>
      )}

      {/* View Toggle for Skill Display */}
      <div className="flex gap-2 border-b pb-2">
        <Button
          variant={filterCategory === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilterCategory("all")}
        >
          All Skills
        </Button>
        {skillCategories.slice(0, 5).map((cat) => (
          <Button
            key={cat.id}
            variant={filterCategory === cat.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilterCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
        {showSuggestions && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(false)}
          >
            Hide Suggestions
          </Button>
        )}
      </div>

      {/* Skills Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {skills
              .filter(
                (skill) =>
                  filterCategory === "all" ||
                  skill.category.toLowerCase().includes(filterCategory),
              )
              .map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative border rounded-lg p-4 hover:shadow-lg transition-all bg-white dark:bg-slate-800"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDelete(skill.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>

                  <div className="mb-2">
                    <h4 className="font-semibold text-base pr-6">
                      {skill.name}
                    </h4>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {skill.category}
                    </Badge>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Proficiency</span>
                      <div className="flex gap-0.5">
                        {getLevelStars(skill.level)}
                      </div>
                    </div>
                    {/* <Progress
                      value={(skill.level / 5) * 100}
                      className="h-1.5"
                      indicatorClassName={getLevelColor(skill.level)}
                    /> */}
                    <p className="text-xs text-gray-400 mt-2">
                      {
                        proficiencyLevels.find((l) => l.value === skill.level)
                          ?.description
                      }
                    </p>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      ) : viewMode === "compact" ? (
        <div className="space-y-3">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="border rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 text-gray-600">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => {
                      /* Edit logic */
                    }}
                  >
                    {skill.name} • Level {skill.level}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {skills
              .filter(
                (skill) =>
                  filterCategory === "all" ||
                  skill.category.toLowerCase().includes(filterCategory),
              )
              .map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-3 border rounded-lg bg-card hover:shadow-md transition-all"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Skill Name</Label>
                      <div className="relative">
                        <Input
                          value={skill.name}
                          onChange={(e) =>
                            onUpdate(skill.id, "name", e.target.value)
                          }
                          placeholder="e.g., React.js"
                          className="mt-1 pr-20"
                          list={`skill-suggestions-${skill.id}`}
                        />
                        <datalist id={`skill-suggestions-${skill.id}`}>
                          {Object.values(skillSuggestions)
                            .flat()
                            .map((s) => (
                              <option key={s} value={s} />
                            ))}
                        </datalist>
                      </div>
                    </div>

                    <div>
                      <Label>Category</Label>
                      <select
                        value={skill.category}
                        onChange={(e) =>
                          onUpdate(skill.id, "category", e.target.value)
                        }
                        className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {skillCategories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label>Proficiency Level</Label>
                      <div className="flex gap-2 items-center mt-1">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={skill.level}
                          onChange={(e) =>
                            onUpdate(
                              skill.id,
                              "level",
                              parseInt(e.target.value),
                            )
                          }
                          className="flex-1"
                        />
                        <span className="text-sm font-medium min-w-[60px]">
                          {
                            proficiencyLevels.find(
                              (l) => l.value === skill.level,
                            )?.label
                          }
                        </span>
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {getLevelStars(skill.level)}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(skill.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}

      {/* Skill Suggestions Panel */}
      <div className="mt-6">
        <Button
          variant="outline"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Popular Skills & Suggestions
          </span>
          {showSuggestions ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-4 overflow-hidden"
            >
              {skillCategories.map((category) => (
                <div key={category.id}>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <category.icon
                      className={`w-4 h-4 text-${category.color}-500`}
                    />
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillSuggestions[category.id].map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => addSuggestedSkill(skill, category.id)}
                      >
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {skills.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="text-lg font-semibold mb-2">No skills added yet</h4>
          <p className="text-gray-500 mb-4">
            Add your technical skills, tools, and professional competencies
          </p>
          <Button onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Skill
          </Button>
        </div>
      )}

      {/* Skill Tips */}
      {skills.length > 0 && skills.length < 5 && (
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Pro Tip
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add 8-12 relevant skills for optimal ATS compatibility. Focus on
            both technical and soft skills that match your target job
            description.
          </p>
        </div>
      )}
    </motion.div>
  );
}
