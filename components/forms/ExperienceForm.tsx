"use client";
import SummaryEditor from "@/app/editor/SummaryEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Plus, Trash2 } from "lucide-react";

export const ExperienceForm = ({
  experiences,
  onUpdate,
  onDelete,
  onAdd,
}: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-4"
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-600" />
          Work Experience
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your professional experience
        </p>
      </div>
      <Button onClick={onAdd} size="sm" className="gap-1">
        <Plus className="w-4 h-4" /> Add Experience
      </Button>
    </div>

    <AnimatePresence>
      {experiences.map((exp: Experience, index: number) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="border rounded-lg p-4 space-y-4 bg-card relative"
        >
          <div className="flex justify-between items-end">
            {/* <h4 className="font-medium">Experience {index + 1}</h4> */}
            <button
              onClick={() => onDelete(exp.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <Label>Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
                placeholder="Company Name"
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Position *</Label>
              <Input
                value={exp.position}
                onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
                placeholder="Job Title"
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => onUpdate(exp.id, "location", e.target.value)}
                placeholder="City, State"
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
                disabled={exp.current}
                className="mt-0.5"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => onUpdate(exp.id, "current", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`current-${exp.id}`}>
                Currently working here
              </Label>
            </div>
          </div>

          <div>
            <Label>Description</Label>

            <SummaryEditor
              initialContent={exp.description ?? ""}
              onChange={(value) => onUpdate(exp.id, "description", value)}
            />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
