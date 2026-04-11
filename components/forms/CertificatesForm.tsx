"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Certificate } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Award, PaperclipIcon, Plus, Trash2 } from "lucide-react";

export const CertificatesForm = ({
  certificates,
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
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-5 h-5 text-teal-600" />
          Certificate
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your certification background
        </p>
      </div>
      <Button onClick={onAdd} size="sm" className="gap-1 cursor-pointer">
        <Plus className="w-4 h-4" /> Add Certificate
      </Button>
    </div>

    <AnimatePresence>
      {certificates.map((cert: Certificate, index: number) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex items-center gap-4 p-4 border rounded-lg bg-card"
        >
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Certificate Name</Label>
              <Input
                value={cert.name}
                onChange={(e) => onUpdate(cert.id, "name", e.target.value)}
                placeholder="AWS Certified Developer"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Issuer</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => onUpdate(cert.id, "issuer", e.target.value)}
                placeholder="Amazon Web Services"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="month"
                value={cert.date}
                onChange={(e) => onUpdate(cert.id, "date", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="relative px-4">
            <button
              onClick={() => onDelete(cert.id)}
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
