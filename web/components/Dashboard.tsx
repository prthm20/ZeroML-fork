import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  Database, 
  Cpu, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause
} from "lucide-react";

export const Dashboard = () => {
  const experiments = [
    {
      id: 1,
      name: "Image Classification - ResNet50",
      status: "running",
      progress: 75,
      accuracy: "94.2%",
      loss: 0.128,
      duration: "2h 34m"
    },
    {
      id: 2,
      name: "NLP Sentiment Analysis",
      status: "completed",
      progress: 100,
      accuracy: "91.8%",
      loss: 0.089,
      duration: "1h 12m"
    },
    {
      id: 3,
      name: "Time Series Forecasting",
      status: "queued",
      progress: 0,
      accuracy: "-",
      loss: "-",
      duration: "-"
    }
  ];

  const stats = [
    { label: "Active Pipelines", value: "12", icon: Activity, trend: "+3" },
    { label: "Models Trained", value: "48", icon: Cpu, trend: "+12" },
    { label: "Datasets Processed", value: "156", icon: Database, trend: "+8" },
    { label: "Avg Accuracy", value: "92.4%", icon: TrendingUp, trend: "+2.1%" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-primary animate-pulse" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "queued":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-primary/10 text-primary border-primary/20";
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "queued":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-gradient-secondary border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Active Experiments */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Active Experiments</h2>
          <Button className="gap-2">
            <Play className="h-4 w-4" />
            New Experiment
          </Button>
        </div>

        <div className="space-y-4">
          {experiments.map((experiment) => (
            <Card key={experiment.id} className="p-6 bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(experiment.status)}
                  <h3 className="font-semibold">{experiment.name}</h3>
                  <Badge className={getStatusColor(experiment.status)}>
                    {experiment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={experiment.progress} className="flex-1" />
                    <span className="text-sm font-medium">{experiment.progress}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-sm font-medium mt-1">{experiment.accuracy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loss</p>
                  <p className="text-sm font-medium mt-1">{experiment.loss}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium mt-1">{experiment.duration}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};