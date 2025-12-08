import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Banknote, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const selectedAmount = location.state?.amount || "";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 md:p-12 bg-gradient-card shadow-soft animate-fade-in text-center">
          {/* Cash Only Notice */}
          <div className="mb-8">
            <Banknote className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('cashOnlyTitle')}
            </h1>
            {selectedAmount && (
              <p className="text-xl text-primary font-semibold mb-2">
                {t('selectedAmount')}: {selectedAmount}
              </p>
            )}
          </div>

          {/* Thank You Message */}
          <div className="space-y-6 text-muted-foreground">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground">
              {t('thankYouTitle')}
            </h2>
            
            <p className="text-lg leading-relaxed">
              {t('thankYouMessage1')}
            </p>
            
            <p className="text-lg leading-relaxed">
              {t('thankYouMessage2')}
            </p>
            
            <p className="text-lg leading-relaxed">
              {t('thankYouMessage3')}
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-sm">
                {t('contactForDonation')}
              </p>
              <p className="text-primary font-semibold mt-2">
                contact@fixitmentor.com
              </p>
            </div>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate("/")}
            className="mt-8 bg-gradient-primary text-white hover:opacity-90"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
        </Card>
      </div>
    </div>
  );
}
