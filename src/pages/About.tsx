import { Card } from "@/components/ui/card";
import {
  Brain,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const reasons = [
    {
      icon: Target,
      title: "Structured Over Random",
      desc: "Our system forces you to think systematically, not just react to the first answer.",
    },
    {
      icon: Lightbulb,
      title: "Learn The Process",
      desc: "You don't just get answers—you learn how to solve similar problems in the future.",
    },
    {
      icon: Users,
      title: "Human-Like Reasoning",
      desc: "Mimics how successful problem-solvers think: identify, analyze, evaluate, plan.",
    },
    {
      icon: TrendingUp,
      title: "Better Decisions",
      desc: "By comparing multiple solutions and their impacts, you make informed choices.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ThinkStruct AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the difference between unstructured and structured AI
          </p>
        </div>

        {/* Why Not Just AI */}
        <Card className="p-8 md:p-10 mb-8 bg-gradient-card shadow-medium">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Why This System is NOT Just AI</h2>
              <p className="text-muted-foreground leading-relaxed">
                Traditional AI systems give you fast answers, but they lack the structured thinking process
                that humans naturally use when solving complex problems. ThinkStruct AI is different—it's
                a <strong>framework</strong> that guides you through each critical step of problem-solving,
                ensuring you consider all angles before making a decision.
              </p>
            </div>
          </div>
        </Card>

        {/* Unstructured vs Structured */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 border-destructive/20">
            <h3 className="text-xl font-bold mb-4 text-destructive">❌ Unstructured AI</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Single answer without context",
                "No breakdown of thinking steps",
                "Doesn't consider your constraints",
                "No comparison of alternatives",
                "Can't adapt to your resources",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 border-primary/50 bg-primary/5">
            <h3 className="text-xl font-bold mb-4 text-primary">✓ Structured AI (ThinkStruct)</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Guided 6-step workflow",
                "Clear breakdown of each phase",
                "Considers your constraints upfront",
                "Compares multiple solution paths",
                "Adapts to your specific resources",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Why Students & Innovators Prefer It */}
        <Card className="p-8 md:p-10 mb-8 bg-gradient-card shadow-medium">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Students & Innovators Prefer Structured Thinking
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* How It Helps */}
        <Card className="p-8 md:p-10 bg-gradient-subtle">
          <h2 className="text-2xl font-bold mb-4">How ThinkStruct AI Helps You</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">For Students:</strong> Learn to approach assignments, 
              projects, and life decisions with a clear, replicable method. This isn't just about solving 
              one problem—it's about building a mental framework you'll use forever.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">For Innovators:</strong> Turn vague ideas into actionable 
              plans. Whether you're building a product, starting a project, or solving a technical challenge, 
              the 6-step system ensures nothing is overlooked.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">For Everyone:</strong> Make better decisions by seeing the 
              full picture—resources, constraints, alternatives, and impacts—before committing to a solution.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
