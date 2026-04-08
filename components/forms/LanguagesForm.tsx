"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Language } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

export const LanguagesForm = ({
  languages,
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
      <h3 className="text-lg font-semibold">Languages</h3>
      <Button onClick={onAdd} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Language
      </Button>
    </div>

    <AnimatePresence>
      {languages.map((lang: Language, index: number) => (
        <motion.div
          key={lang.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center gap-4 p-4 border rounded-lg bg-card"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Language</Label>
              <Input
                value={lang.name}
                onChange={(e) => onUpdate(lang.id, "name", e.target.value)}
                placeholder="English"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Proficiency</Label>
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  onUpdate(lang.id, "proficiency", e.target.value)
                }
                className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional Working">
                  Professional Working
                </option>
                <option value="Limited Working">Limited Working</option>
                <option value="Elementary">Elementary</option>
              </select>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(lang.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
