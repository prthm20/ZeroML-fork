"use client";

import { PipelineBuilder } from "@/components/PipelineBuilder";

export default function BuilderPage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] pt-16">
      {/* pt-16 ensures content starts after navbar (if navbar is 64px tall) */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, #23283a 0%, #10141a 100%)",
          opacity: 0.7,
          zIndex: 0,
        }}
      />
      <div className="relative z-10">
        <PipelineBuilder />
      </div>
    </main>
  );
}