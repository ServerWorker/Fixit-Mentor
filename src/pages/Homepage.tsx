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
import { useLanguage } from "@/contexts/LanguageContext";

export default function Homepage() {
  const { t } = useLanguage();
  
  const steps = [
    { icon: Target, title: t('home.step1Title'), desc: t('home.step1Desc') },
    { icon: Search, title: t('home.step2Title'), desc: t('home.step2Desc') },
    { icon: Filter, title: t('home.step3Title'), desc: t('home.step3Desc') },
  ];

  const differences = [
    {
      normal: t('home.diff1Normal'),
      fixit: t('home.diff1Fixit'),
    },
    {
      normal: t('home.diff2Normal'),
      fixit: t('home.diff2Fixit'),
    },
    {
      normal: t('home.diff3Normal'),
      fixit: t('home.diff3Fixit'),
    },
    {
      normal: t('home.diff4Normal'),
      fixit: t('home.diff4Fixit'),
    },
    {
      normal: t('home.diff5Normal'),
      fixit: t('home.diff5Fixit'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle overflow-hidden">
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in">
            {t('home.badge')}
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            {t('home.title')}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('home.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/system">
              <Button size="lg" className="bg-gradient-primary text-white hover:opacity-90 shadow-medium">
                {t('home.getStarted')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                {t('home.learnMore')}
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
                {t('home.problemTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('home.problemDesc')}
              </p>
            </div>
            <Card className="p-8 bg-gradient-card shadow-medium">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Brain className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground">
                      {t('home.problemDesc')}
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
            {t('home.comparisonTitle')}
          </h2>
          <Card className="overflow-hidden shadow-strong">
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-6 bg-muted/30">
                <h3 className="font-semibold text-lg mb-4 text-center">{t('home.normalAI')}</h3>
              </div>
              <div className="p-6 bg-primary/5">
                <h3 className="font-semibold text-lg mb-4 text-center text-primary">{t('home.fixitAI')}</h3>
              </div>
            </div>
            {differences.map((diff, idx) => (
              <div key={idx} className="grid grid-cols-2 divide-x divide-border border-t border-border">
                <div className="p-6 text-sm">{diff.normal}</div>
                <div className="p-6 text-sm font-medium bg-primary/5">{diff.fixit}</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            {t('home.howItWorksTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            {t('home.howItWorksDesc')}
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
            {t('home.exampleTitle')}
          </h2>
          <Card className="p-8 md:p-12 bg-gradient-card shadow-strong">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                {t('home.exampleBadge')}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {t('home.exampleQuestion')}
              </h3>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: t('home.example1Title'),
                  desc: t('home.example1Desc'),
                },
                {
                  icon: Search,
                  title: t('home.example2Title'),
                  desc: t('home.example2Desc'),
                },
                {
                  icon: Filter,
                  title: t('home.example3Title'),
                  desc: t('home.example3Desc'),
                },
                {
                  icon: TrendingUp,
                  title: t('home.example4Title'),
                  desc: t('home.example4Desc'),
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
                  {t('home.tryIt')} <ArrowRight className="ml-2 w-4 h-4" />
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
                <span className="text-xl font-bold">Fixit Mentor</span>
              </div>
              <p className="text-muted-foreground mb-4">
                {t('home.footerDesc')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('home.quickLinks')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">{t('nav.dashboard')}</Link></li>
                <li><Link to="/system" className="hover:text-primary transition-colors">{t('nav.system')}</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('home.contactTitle')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary transition-colors">{t('home.getInTouch')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            {t('home.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}
