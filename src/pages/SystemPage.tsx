import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Target,
  Search,
  AlertCircle,
  GitBranch,
  TrendingUp,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function SystemPage() {
  const [currentStep, setCurrentStep] = useState<string>("step1");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const steps = [
    {
      id: "step1",
      icon: Target,
      title: "1. Identify the Goal",
      desc: "What exactly do you want to achieve?",
      prompt: "Describe your problem or goal in detail. Be specific about what you want to accomplish.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "step2",
      icon: Search,
      title: "2. Analyse Your Resources",
      desc: "What do you have available?",
      prompt: "List your available resources: budget, time, skills, tools, people who can help, etc.",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "step3",
      icon: AlertCircle,
      title: "3. Constraints Check",
      desc: "What are your limitations?",
      prompt: "Identify constraints: deadlines, budget limits, technical limitations, legal/safety concerns.",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "step4",
      icon: GitBranch,
      title: "4. Solution Paths",
      desc: "What are your options?",
      prompt: "Brainstorm at least 3 different approaches or solutions. Think creatively!",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "step5",
      icon: TrendingUp,
      title: "5. Impact Comparison",
      desc: "Compare outcomes",
      prompt: "For each solution, consider: cost, time needed, success probability, and potential risks.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "step6",
      icon: FileText,
      title: "6. Final Action Plan",
      desc: "Create your roadmap",
      prompt: "Choose the best solution and break it down into concrete, actionable steps with deadlines.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const handleAnswer = (stepId: string, value: string) => {
    setAnswers({ ...answers, [stepId]: value });
  };

  const handleDownload = () => {
    const report = steps
      .map((step) => {
        const answer = answers[step.id] || "Not completed";
        return `${step.title}\n${"-".repeat(50)}\n${answer}\n\n`;
      })
      .join("");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thinkstruct-action-plan.txt";
    a.click();
    toast.success("Action plan downloaded!");
  };

  const isStepComplete = (stepId: string) => {
    return answers[stepId] && answers[stepId].trim().length > 0;
  };

  const completedSteps = steps.filter((s) => isStepComplete(s.id)).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Sparkles className="inline w-4 h-4 mr-2" />
            Structured Thinking System
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            6-Step Solution <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Workflow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow this proven framework to break down any problem into actionable solutions
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-8 bg-gradient-card shadow-soft">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm font-medium text-primary">
              {completedSteps} / {steps.length} steps completed
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Steps Accordion */}
        <Accordion type="single" collapsible value={currentStep} onValueChange={setCurrentStep}>
          {steps.map((step, idx) => (
            <AccordionItem
              key={step.id}
              value={step.id}
              className="mb-4 border-none"
            >
              <Card className={`overflow-hidden ${isStepComplete(step.id) ? "border-primary/50" : ""}`}>
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <div className="flex items-center gap-4 w-full">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-soft group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-bold text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                    {isStepComplete(step.id) && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">{step.prompt}</p>
                    </div>
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answers[step.id] || ""}
                      onChange={(e) => handleAnswer(step.id, e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnswer(step.id, "")}
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-primary text-white"
                        onClick={() => {
                          if (idx < steps.length - 1) {
                            setCurrentStep(steps[idx + 1].id);
                          }
                          toast.success("Progress saved!");
                        }}
                        disabled={!isStepComplete(step.id)}
                      >
                        {idx < steps.length - 1 ? "Next Step" : "Complete"}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Download Action Plan */}
        {completedSteps === steps.length && (
          <Card className="p-8 text-center bg-gradient-card shadow-medium animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground mb-6">
              You've completed all 6 steps. Download your structured action plan now.
            </p>
            <Button
              size="lg"
              className="bg-gradient-primary text-white hover:opacity-90 shadow-medium"
              onClick={handleDownload}
            >
              <Download className="mr-2 w-5 h-5" />
              Download Action Plan
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
