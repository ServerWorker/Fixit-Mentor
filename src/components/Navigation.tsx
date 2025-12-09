import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { SettingsDialog } from "@/components/SettingsDialog";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.dashboard'), path: "/dashboard" },
    { name: t('nav.system'), path: "/system" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.contact'), path: "/contact" },
    { name: t('nav.donate'), path: "/donate" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:animate-glow transition-all">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden xs:block">
              Fixit Mentor
            </span>
          </Link>

          {/* Desktop Navigation - Large screens */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative whitespace-nowrap",
                  isActive(link.path)
                    ? "text-primary after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/system">
              <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                {t('nav.startSolving')}
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Tablet Navigation - Medium screens */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs font-medium transition-colors hover:text-primary relative whitespace-nowrap",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/system">
              <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90 text-xs px-3">
                {t('nav.startSolving')}
              </Button>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSettingsOpen(true)}
              className="p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button + Settings */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSettingsOpen(true)}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
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
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-lg",
                    isActive(link.path) ? "text-primary bg-primary/10" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/system" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="w-full bg-gradient-primary text-white hover:opacity-90">
                  {t('nav.startSolving')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </nav>
  );
};
