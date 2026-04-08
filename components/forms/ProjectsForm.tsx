"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export const ProjectsForm = ({ projects, onUpdate, onDelete, onAdd }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Projects</h3>
      <Button onClick={onAdd} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </div>

    <AnimatePresence>
      {projects.map((project: Project, index: number) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="border rounded-lg p-4 space-y-4 bg-card"
        >
          <div className="flex justify-between items-start">
            <h4 className="font-medium">Project {index + 1}</h4>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Project Name</Label>
              <Input
                value={project.name}
                onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                placeholder="E-commerce Website"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Start Date</Label>
              <Input
                type="month"
                value={project.startDate}
                onChange={(e) =>
                  onUpdate(project.id, "startDate", e.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={project.endDate}
                onChange={(e) =>
                  onUpdate(project.id, "endDate", e.target.value)
                }
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={project.description}
              onChange={(e) =>
                onUpdate(project.id, "description", e.target.value)
              }
              placeholder="Describe your project and its impact..."
              className="mt-1 min-h-[80px]"
            />
          </div>

          <div>
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={project.technologies.join(", ")}
              onChange={(e) =>
                onUpdate(
                  project.id,
                  "technologies",
                  e.target.value.split(",").map((t: string) => t.trim()),
                )
              }
              placeholder="React, Node.js, MongoDB"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Live Demo Link</Label>
              <Input
                value={project.link}
                onChange={(e) => onUpdate(project.id, "link", e.target.value)}
                placeholder="https://yourproject.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label>GitHub Link</Label>
              <Input
                value={project.github}
                onChange={(e) => onUpdate(project.id, "github", e.target.value)}
                placeholder="https://github.com/yourusername/project"
                className="mt-1"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
