"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Education } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export const EducationForm = ({
  education,
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
          <GraduationCap className="w-5 h-5 text-green-600" />
          Education
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your educational background
        </p>
      </div>
      <Button onClick={onAdd} size="sm" className="gap-1">
        <Plus className="w-4 h-4" /> Add Education
      </Button>
    </div>

    <AnimatePresence>
      {education.map((edu: Education, index: number) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="border rounded-lg p-4 space-y-4 bg-card"
        >
          <div className="relative">
            <button
              onClick={() => onDelete(edu.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <Label>Institution *</Label>
              <Input
                value={edu.institution}
                onChange={(e) =>
                  onUpdate(edu.id, "institution", e.target.value)
                }
                placeholder="University Name"
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => onUpdate(edu.id, "degree", e.target.value)}
                placeholder="Bachelor's, Master's, etc."
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) => onUpdate(edu.id, "field", e.target.value)}
                placeholder="Computer Science, Business, etc."
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>GPA</Label>
              <Input
                value={edu.gpa}
                onChange={(e) => onUpdate(edu.id, "gpa", e.target.value)}
                placeholder="3.8/4.0"
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)}
                className="mt-0.5"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)}
                disabled={edu.current}
                className="mt-0.5"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                id={`current-edu-${edu.id}`}
                checked={edu.current}
                onChange={(e) => onUpdate(edu.id, "current", e.target.checked)}
                className="rounded"
              />
              <Label htmlFor={`current-edu-${edu.id}`}>
                Currently studying
              </Label>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
