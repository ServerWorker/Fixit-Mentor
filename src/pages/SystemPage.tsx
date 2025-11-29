import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Recycle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SystemPage() {
  const navigate = useNavigate();
  const [wasteItem, setWasteItem] = useState("");
  const [budget, setBudget] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // Validation
    if (!wasteItem.trim()) {
      toast.error("Please enter a waste item");
      return;
    }
    if (!budget || parseInt(budget) <= 0) {
      toast.error("Please enter a valid budget");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with your actual backend URL
      const response = await fetch("https://YOUR-BACKEND-URL/recycle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waste_item: wasteItem,
          budget: budget,
          other_info: otherInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await response.json();
      
      // Redirect to response page with the data
      navigate("/response", { 
        state: { 
          response: data.response,
          wasteItem,
          budget,
          otherInfo
        } 
      });
      
      toast.success("Response generated!");
    } catch (err) {
      toast.error("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Recycle className="inline w-4 h-4 mr-2" />
            AI-Powered Recycling Assistant
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Smart <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Reuse</span> Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your waste into creative projects with AI-powered suggestions tailored to your budget
          </p>
        </div>

        {/* Input Form */}
        <Card className="p-8 mb-8 bg-gradient-card shadow-soft">
          <div className="space-y-6">
            {/* Waste Item */}
            <div className="space-y-2">
              <Label htmlFor="wasteItem" className="text-base font-semibold">
                Enter the waste item you want to reuse:
              </Label>
              <Textarea
                id="wasteItem"
                placeholder="e.g., Broken laptop, Old plastic bottles, Burnt-out LED bulb, Cardboard packaging..."
                value={wasteItem}
                onChange={(e) => setWasteItem(e.target.value)}
                className="min-h-[100px] resize-none text-base"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-base font-semibold">
                Budget (INR)
              </Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 500, 1500, 2500..."
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="text-base"
                min="0"
              />
              <p className="text-sm text-muted-foreground">
                Enter your maximum budget in Indian Rupees.
              </p>
            </div>

            {/* Other Info */}
            <div className="space-y-2">
              <Label htmlFor="otherInfo" className="text-base font-semibold">
                Other Info <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <Textarea
                id="otherInfo"
                placeholder="e.g., I want something easy to build, Prefer decor-related ideas, I want a project for school..."
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
                className="min-h-[80px] resize-none text-base"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-primary text-white hover:opacity-90 shadow-medium h-12 text-base font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Smart Reuse Plan
                </>
              )}
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
