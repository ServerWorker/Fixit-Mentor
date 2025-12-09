import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { name: "Overview", id: "overview" },
  { name: "Recommended Project Idea", id: "recommended-project-idea" },
  { name: "Materials Needed", id: "materials-needed" },
  { name: "Step-by-Step", id: "step-by-step-method" },
  { name: "Budget", id: "budget-breakdown" },
  { name: "Alternate Ideas", id: "alternate-uses" },
];

export const ResponseNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:animate-glow transition-all">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fixit Mentor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative whitespace-nowrap",
                  activeSection === link.id
                    ? "text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("safety-notes")}
              className="whitespace-nowrap"
            >
              <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                Safety
              </Button>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1 text-left",
                    activeSection === link.id ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </button>
              ))}
              <button onClick={() => scrollToSection("safety-notes")}>
                <Button size="sm" className="w-full bg-gradient-primary text-white hover:opacity-90">
                  Safety
                </Button>
              </button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/system")}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to System
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
