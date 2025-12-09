import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, ArrowLeft, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const sectionLinks = [
  { nameKey: "response.nav.overview", id: "overview" },
  { nameKey: "response.nav.idea", id: "recommended-project-idea" },
  { nameKey: "response.nav.materials", id: "materials-needed" },
  { nameKey: "response.nav.steps", id: "step-by-step-method" },
  { nameKey: "response.nav.budget", id: "budget-breakdown" },
  { nameKey: "response.nav.alternate", id: "alternate-uses" },
];

export const ResponseNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = sectionLinks.map(link => ({
        id: link.id,
        element: document.getElementById(link.id)
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:animate-glow transition-all">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
                Fixit Mentor
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    "text-xs font-medium transition-colors hover:text-primary relative whitespace-nowrap px-2 py-1",
                    activeSection === link.id
                      ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {t(link.nameKey)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("safety-notes")}
                className="whitespace-nowrap"
              >
                <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90 text-xs px-3">
                  {t('response.nav.safety')}
                </Button>
              </button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
                className="ml-2"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                {sectionLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-2 py-1 text-left",
                      activeSection === link.id ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {t(link.nameKey)}
                  </button>
                ))}
                <button onClick={() => scrollToSection("safety-notes")}>
                  <Button size="sm" className="w-full bg-gradient-primary text-white hover:opacity-90">
                    {t('response.nav.safety')}
                  </Button>
                </button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate("/system")}
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('response.backButton')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};
