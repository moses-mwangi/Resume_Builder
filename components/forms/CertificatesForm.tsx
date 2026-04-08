"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Certificate } from "@/types/resume";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

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
      <h3 className="text-lg font-semibold">Certifications</h3>
      <Button onClick={onAdd} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Certificate
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
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(cert.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
