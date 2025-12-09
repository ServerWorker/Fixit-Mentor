import { Card } from "@/components/ui/card";
import {
  Brain,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  
  const reasons = [
    {
      icon: Target,
      title: t('about.reason1Title'),
      desc: t('about.reason1Desc'),
    },
    {
      icon: Lightbulb,
      title: t('about.reason2Title'),
      desc: t('about.reason2Desc'),
    },
    {
      icon: Users,
      title: t('about.reason3Title'),
      desc: t('about.reason3Desc'),
    },
    {
      icon: TrendingUp,
      title: t('about.reason4Title'),
      desc: t('about.reason4Desc'),
    },
  ];

  const unstructuredItems = [
    t('about.unstructured1'),
    t('about.unstructured2'),
    t('about.unstructured3'),
    t('about.unstructured4'),
    t('about.unstructured5'),
  ];

  const structuredItems = [
    t('about.structured1'),
    t('about.structured2'),
    t('about.structured3'),
    t('about.structured4'),
    t('about.structured5'),
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('about.title')} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('about.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Why Not Just AI */}
        <Card className="p-8 md:p-10 mb-8 bg-gradient-card shadow-medium">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-soft">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">{t('about.whyNotJustAITitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.whyNotJustAIDesc')}
              </p>
            </div>
          </div>
        </Card>

        {/* Unstructured vs Structured */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 border-destructive/20">
            <h3 className="text-xl font-bold mb-4 text-destructive">❌ {t('about.unstructuredAI')}</h3>
            <ul className="space-y-3 text-sm">
              {unstructuredItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 border-primary/50 bg-primary/5">
            <h3 className="text-xl font-bold mb-4 text-primary">✓ {t('about.structuredAI')}</h3>
            <ul className="space-y-3 text-sm">
              {structuredItems.map((item, idx) => (
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
            {t('about.whyPreferTitle')}
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
          <h2 className="text-2xl font-bold mb-4">{t('about.howItHelpsTitle')}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{t('about.forStudents')}</strong> {t('about.forStudentsDesc')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{t('about.forInnovators')}</strong> {t('about.forInnovatorsDesc')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{t('about.forEveryone')}</strong> {t('about.forEveryoneDesc')}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
