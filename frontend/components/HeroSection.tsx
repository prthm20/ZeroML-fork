import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowRight,
	GitBranch,
	Database,
	Cpu,
	Activity,
	Play,
	Sparkles,
} from "lucide-react";

type HeroSectionProps = {
	setCurrentView: (view: "hero" | "dashboard" | "pipeline") => void;
};

export const HeroSection = ({ setCurrentView }: HeroSectionProps) => {
	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
			</div>

			<div className="relative z-10 container text-center space-y-12">
				{/* Hero Content */}
				<div className="space-y-6 max-w-4xl mx-auto">
					<Badge className="mx-auto gap-2 bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] border-primary/20 text-white shadow-lg">
						<Sparkles className="h-4 w-4" />
						Next-Generation ML Platform
					</Badge>

					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
						Build{" "}
						<span className="bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] bg-clip-text text-transparent">
							ML Pipelines
						</span>
						<br />
						Visually & Intuitively
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
						Create, train, and deploy machine learning models with our drag-and-drop
						interface.
						<br className="hidden sm:block" />
						From data preprocessing to model deployment - all in one platform.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Button
							className="bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-[#3b82f6] hover:to-[#00f6ff] transition"
							onClick={() => setCurrentView("pipeline")}
						>
							<Play className="h-5 w-5" />
							Start Building
							<ArrowRight className="h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="px-8 py-6 text-lg border-muted-foreground"
						>
							View Examples
						</Button>
					</div>
				</div>

				{/* Feature Cards */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
					{[
						{
							icon: GitBranch,
							title: "Visual Pipelines",
							description: "Drag-and-drop ML workflow builder",
							color: "text-blue-400",
						},
						{
							icon: Database,
							title: "Smart Data Processing",
							description: "Automated cleaning and preprocessing",
							color: "text-green-400",
						},
						{
							icon: Cpu,
							title: "Hybrid Training",
							description: "Local and cloud model training",
							color: "text-purple-400",
						},
						{
							icon: Activity,
							title: "Real-time Monitoring",
							description: "Live experiment tracking",
							color: "text-orange-400",
						},
					].map((feature, index) => (
						<Card
							key={index}
							className="p-6 bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300 group"
						>
							<div className="space-y-4 text-center">
								<div className="mx-auto w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
									<feature.icon
										className={`h-6 w-6 ${feature.color}`}
									/>
								</div>
								<div>
									<h3 className="font-semibold">{feature.title}</h3>
									<p className="text-sm text-muted-foreground mt-2">
										{feature.description}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Demo Metrics */}
				<div className="max-w-4xl mx-auto">
					<Card className="p-8 bg-gradient-secondary border-border/50">
						<div className="grid md:grid-cols-3 gap-8 text-center">
							<div>
								<div className="text-3xl font-bold text-success">10x</div>
								<p className="text-muted-foreground">
									Faster Development
								</p>
							</div>
							<div>
								<div className="text-3xl font-bold text-primary">94.2%</div>
								<p className="text-muted-foreground">
									Average Model Accuracy
								</p>
							</div>
							<div>
								<div className="text-3xl font-bold text-accent">50+</div>
								<p className="text-muted-foreground">
									Pre-built Components
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};