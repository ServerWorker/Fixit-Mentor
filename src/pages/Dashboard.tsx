import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Laptop,
  GraduationCap,
  Leaf,
  Heart,
  Lightbulb,
  Search,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const categories = [
    {
      icon: Laptop,
      title: "Electronic Waste",
      desc: "Broken devices, repair or replace decisions",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "School Problems",
      desc: "Study planning, project management, time optimization",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Leaf,
      title: "Climate / Environment",
      desc: "Sustainability choices, eco-friendly solutions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Heart,
      title: "Personal Issues",
      desc: "Life decisions, relationships, health choices",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: Lightbulb,
      title: "Creative Build Ideas",
      desc: "DIY projects, innovation, maker problems",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Problem <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a category or search for your specific problem to start the structured thinking process
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search your problem... (e.g., 'laptop won't turn on', 'need study schedule')"
              className="pl-12 h-14 text-lg shadow-soft"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Problem Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <Card
                key={idx}
                className="group p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-card"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm">{category.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Start Examples */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Start Examples</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "My laptop screen is cracked - should I repair or replace?",
              "I need to organize my study schedule for 5 subjects",
              "How can I reduce my carbon footprint on a budget?",
              "I want to build a solar-powered phone charger",
            ].map((example, idx) => (
              <Card
                key={idx}
                className="p-5 hover:shadow-soft transition-all hover:border-primary cursor-pointer group"
              >
                <p className="text-sm mb-3 group-hover:text-primary transition-colors">{example}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Start solving</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/system">
            <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 shadow-medium">
              Go to Main System <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
