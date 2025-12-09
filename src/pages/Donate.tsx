import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Donate() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleAmountSelect = (amount: string) => {
    navigate("/thank-you", { state: { amount } });
  };

  const impacts = [
    {
      icon: Recycle,
      title: t('donate.impact1Title'),
      desc: t('donate.impact1Desc'),
    },
    {
      icon: Leaf,
      title: t('donate.impact2Title'),
      desc: t('donate.impact2Desc'),
    },
    {
      icon: Heart,
      title: t('donate.impact3Title'),
      desc: t('donate.impact3Desc'),
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Heart className="inline w-4 h-4 mr-2" />
            {t('donate.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('donate.title')} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('donate.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card shadow-soft animate-fade-in" 
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <impact.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 text-foreground">{impact.title}</h3>
              <p className="text-muted-foreground">
                {impact.desc}
              </p>
            </Card>
          ))}
        </div>

        {/* Main Donation Card */}
        <Card className="p-8 bg-gradient-card shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">{t('donate.mainTitle')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('donate.mainDesc')}
            </p>
            
            {/* Donation Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {["₹500", "₹1,000", "₹2,500", "₹5,000"].map((amount, index) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="h-20 text-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  onClick={() => handleAmountSelect(amount)}
                >
                  {amount}
                </Button>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-gradient-primary text-white hover:opacity-90 h-14 px-12 text-lg font-semibold"
              onClick={() => handleAmountSelect("Custom Amount")}
            >
              <Heart className="mr-2 h-5 w-5" />
              {t('donate.donateNow')}
            </Button>

            <p className="text-sm text-muted-foreground mt-6">
              {t('donate.securePayment')}
            </p>
          </div>
        </Card>

        {/* Thank You Message */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-lg text-muted-foreground">
            {t('donate.thankYouMessage')}
          </p>
        </div>
      </div>
    </div>
  );
}
