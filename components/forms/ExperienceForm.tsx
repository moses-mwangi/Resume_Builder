"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export const ExperienceForm = ({
  experiences,
  onUpdate,
  onDelete,
  onAdd,
}: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Work Experience</h3>
      <Button onClick={onAdd} className="flex bg-blue-600 items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>

    <AnimatePresence>
      {experiences.map((exp: Experience, index: number) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="border rounded-lg p-4 space-y-4 bg-card"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Experience {index + 1}</h4>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(exp.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) => onUpdate(exp.id, "company", e.target.value)}
                placeholder="Company Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                value={exp.position}
                onChange={(e) => onUpdate(exp.id, "position", e.target.value)}
                placeholder="Job Title"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => onUpdate(exp.id, "location", e.target.value)}
                placeholder="City, State"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)}
                disabled={exp.current}
                className="mt-1"
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
            <Label>Description (one per line)</Label>
            <Textarea
              value={exp.description.join("\n")}
              onChange={(e) =>
                onUpdate(
                  exp.id,
                  "description",
                  e.target.value.split("\n").filter((l: string) => l.trim()),
                )
              }
              placeholder="Describe your responsibilities and achievements..."
              className="mt-1 min-h-[100px]"
            />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
