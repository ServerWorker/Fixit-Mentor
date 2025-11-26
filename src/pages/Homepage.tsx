import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Target,
  LineChart,
  Zap,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Search,
  Filter,
  TrendingUp,
  FileText,
  Download,
} from "lucide-react";

export default function Homepage() {
  const steps = [
    { icon: Target, title: "Identify", desc: "Define your goal clearly" },
    { icon: Search, title: "Analyse", desc: "Examine your resources" },
    { icon: Filter, title: "Evaluate", desc: "Check constraints & options" },
  ];

  const differences = [
    {
      normal: "Gives you an answer",
      thinkstruct: "Gives you a structured solution path",
    },
    {
      normal: "One-shot response",
      thinkstruct: "6-step guided workflow",
    },
    {
      normal: "No actionable breakdown",
      thinkstruct: "Downloadable action plan",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle overflow-hidden">
        {/* Spline 3D Orb Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none overflow-hidden">
          <iframe 
            src='https://my.spline.design/orb-nRggrwiCPbiWf6wn548YA5Pt/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="w-full h-full scale-150"
          />
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in">
            Better Than Normal AI
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            ThinkStruct AI —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smarter Than Normal AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up">
            A structured solution engine that thinks step-by-step like humans, not just gives answers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/system">
              <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 shadow-medium">
                Start Solving <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem with Normal AI */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                The Problem with Normal AI
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional AI gives you answers, but not the thinking process. It's like getting
                the solution to a math problem without understanding how to solve it.
              </p>
              <ul className="space-y-3">
                {["No structured breakdown", "Missing context", "No actionable steps"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8 bg-gradient-card shadow-medium">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Brain className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Normal AI Response:</h3>
                    <p className="text-muted-foreground">
                      "You should take your laptop to a repair shop."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">ThinkStruct AI:</h3>
                    <p className="text-muted-foreground">
                      "Let's structure this: <strong>Identify</strong> the issue, <strong>Analyse</strong> repair vs replace costs, 
                      <strong>Evaluate</strong> warranty status, <strong>Plan</strong> the best action..."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            ThinkStruct AI vs Normal AI
          </h2>
          <Card className="overflow-hidden shadow-strong">
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-6 bg-muted/30">
                <h3 className="font-semibold text-lg mb-4 text-center">Normal AI</h3>
              </div>
              <div className="p-6 bg-primary/5">
                <h3 className="font-semibold text-lg mb-4 text-center text-primary">ThinkStruct AI</h3>
              </div>
            </div>
            {differences.map((diff, idx) => (
              <div key={idx} className="grid grid-cols-2 divide-x divide-border border-t border-border">
                <div className="p-6 text-sm">{diff.normal}</div>
                <div className="p-6 text-sm font-medium bg-primary/5">{diff.thinkstruct}</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            ThinkStruct AI guides you through a proven 3-step thinking process
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <Card
                key={idx}
                className="p-8 bg-gradient-card hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-soft">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{idx + 1}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Example */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            What Makes ThinkStruct AI Different?
          </h2>
          <Card className="p-8 md:p-12 bg-gradient-card shadow-strong">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                Real Example
              </div>
              <h3 className="text-2xl font-bold mb-4">
                "I have a broken laptop — what should I do?"
              </h3>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: "1. Identify the Goal",
                  desc: "Fix or replace the laptop within budget",
                },
                {
                  icon: Search,
                  title: "2. Analyse Resources",
                  desc: "Budget: $300, Warranty: Expired, Data: Backed up",
                },
                {
                  icon: Filter,
                  title: "3. Evaluate Options",
                  desc: "Repair ($150), Replace ($400), Use old device temporarily",
                },
                {
                  icon: TrendingUp,
                  title: "4. Plan Action",
                  desc: "Get repair quote → Compare with new models → Decide within 48hrs",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/system">
                <Button className="bg-gradient-primary text-white hover:opacity-90">
                  Try It Yourself <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ThinkStruct AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                A structured solution engine that thinks step-by-step like humans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/system" className="hover:text-primary transition-colors">System</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 ThinkStruct AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
