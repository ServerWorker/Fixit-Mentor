import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Recycle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

export default function SystemPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [wasteItem, setWasteItem] = useState("");
  const [budget, setBudget] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
    // Validation (remains unchanged)
    if (!wasteItem.trim()) {
      toast.error(t('system.errorWasteItem'));
      return;
    }
    if (!budget || parseInt(budget) <= 0) {
      toast.error(t('system.errorBudget'));
      return;
    }

    setLoading(true);

    let geminiResponse = "";

    try {
      const { data, error } = await supabase.functions.invoke('gemini', {
        body: {
          item: wasteItem,
          budget: budget,
          otherInfo: otherInfo,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error(error.message || "Failed to generate plan.");
      } else if (data?.solution) {
        geminiResponse = data.solution;
        toast.success("Circularity Report Generated Successfully! 🚀");
      } else if (data?.message) {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Network or API call failed.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
      
      // Always redirect to response page
      navigate("/response", { 
        state: { 
          response: geminiResponse,
          wasteItem,
          budget,
          otherInfo,
          error: !geminiResponse
        } 
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Recycle className="inline w-4 h-4 mr-2" />
            {t('home.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('system.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('system.subtitle')}
          </p>
        </div>

        {/* Input Form */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-soft">
          <div className="space-y-6">
            {/* Waste Item */}
            <div className="space-y-2">
              <Label htmlFor="wasteItem" className="text-base font-semibold">
                {t('system.wasteItemLabel')}
              </Label>
              <Textarea
                id="wasteItem"
                placeholder={t('system.wasteItemPlaceholder')}
                value={wasteItem}
                onChange={(e) => setWasteItem(e.target.value)}
                className="min-h-[100px] resize-none text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base font-semibold">
                {t('system.budgetLabel')}
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder={t('system.budgetPlaceholder')}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="text-base"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherInfo" className="text-base font-semibold">
                {t('system.otherInfoLabel')}
              </Label>
              <Textarea
                id="otherInfo"
                placeholder={t('system.otherInfoPlaceholder')}
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
                className="min-h-[80px] resize-none text-base"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-primary text-white hover:opacity-90 shadow-medium h-12 text-base font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('system.generating')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('system.generateButton')}
                </>
              )}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}

