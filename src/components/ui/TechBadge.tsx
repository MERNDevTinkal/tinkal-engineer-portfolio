"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  name: string;
  Icon: LucideIcon | string; // Allow string for future custom SVG or simple text
  index: number;
}

export function TechBadge({ name, Icon, index }: TechBadgeProps) {
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.1, y: -2, boxShadow: "0px 5px 15px hsla(var(--primary), 0.3)"}}
      className="inline-block"
    >
      <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2 cursor-default shadow-md bg-card hover:bg-secondary transition-all">
        {typeof Icon !== 'string' && <Icon className="h-5 w-5 text-primary" />}
        <span>{name}</span>
      </Badge>
    </motion.div>
  );
}
