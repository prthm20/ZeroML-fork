import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, Database, GitBranch, Play, Settings, Zap } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MLFlow Pro
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Pipelines
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Database className="h-4 w-4" />
              Datasets
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Cpu className="h-4 w-4" />
              Models
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              Experiments
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Training Active
          </Badge>
          <Button size="sm" className="gap-2 bg-gradient-primary">
            <Play className="h-4 w-4" />
            Run Pipeline
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};