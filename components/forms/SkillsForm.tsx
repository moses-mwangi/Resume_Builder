"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skill } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { PenTool, Plus, Trash2, Wrench } from "lucide-react";

export const SkillsForm = ({ skills, onUpdate, onDelete, onAdd }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wrench className="w-5 h-5 text-orange-600" />
          Skills
        </h3>
        <p className="text-sm text-gray-500 mt-1">Add your skills capability</p>
      </div>
      <Button onClick={onAdd} size="sm" className="gap-1 cursor-pointer">
        <Plus className="w-4 h-4" /> Add Skill
      </Button>
    </div>

    <AnimatePresence>
      {skills.map((skill: Skill) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center gap-4 p-4 border rounded-lg bg-card"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={skill.name}
                onChange={(e) => onUpdate(skill.id, "name", e.target.value)}
                placeholder="React.js"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={skill.category}
                onChange={(e) => onUpdate(skill.id, "category", e.target.value)}
                placeholder="Technical"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Proficiency (1-5)</Label>
              <select
                value={skill.level}
                onChange={(e) =>
                  onUpdate(skill.id, "level", parseInt(e.target.value))
                }
                className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value={1}>Beginner</option>
                <option value={2}>Novice</option>
                <option value={3}>Intermediate</option>
                <option value={4}>Advanced</option>
                <option value={5}>Expert</option>
              </select>
            </div>
          </div>
          <div className="relative px-4">
            <button
              onClick={() => onDelete(skill.id)}
              className="absolute top-2 right-1 cursor-pointer text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
