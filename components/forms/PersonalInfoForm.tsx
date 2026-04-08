"use client";
import RichTextEditor from "@/app/test/TextEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo } from "@/types/resume";
import { motion } from "framer-motion";

export const PersonalInfoForm = ({
  data,
  onUpdate,
  errors,
}: {
  data: PersonalInfo;
  onUpdate: (field: keyof PersonalInfo, value: string) => void;
  errors: Record<string, string>;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="fullName">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => onUpdate("fullName", e.target.value)}
          placeholder="John Doe"
          className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onUpdate("title", e.target.value)}
          placeholder="Software Engineer"
          className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          placeholder="john@example.com"
          className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          placeholder="New York, NY"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={data.website}
          onChange={(e) => onUpdate("website", e.target.value)}
          placeholder="https://yourwebsite.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={data.linkedin}
          onChange={(e) => onUpdate("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={data.github}
          onChange={(e) => onUpdate("github", e.target.value)}
          placeholder="https://github.com/yourusername"
          className="mt-1"
        />
      </div>
    </div>
    <div>
      <RichTextEditor data={data} onUpdate={onUpdate} />
    </div>
  </motion.div>
);
