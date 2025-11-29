import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Recycle, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export default function SystemPage() {
  const [wasteItem, setWasteItem] = useState("");
  const [budget, setBudget] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    setResponse("");

    try {
      // TODO: Replace with actual API call to /api/recycle
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Placeholder response - will be replaced with actual Gemini response
      setResponse("# API Integration Pending\n\nThe backend will be connected in the next step.");
      toast.success("Response generated!");
    } catch (err) {
      setError("Failed to generate plan. Please try again.");
      toast.error("Something went wrong");
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

        {/* Error Display */}
        {error && (
          <Card className="p-6 mb-8 bg-destructive/10 border-destructive/50 animate-fade-in">
            <p className="text-destructive text-center">{error}</p>
          </Card>
        )}

        {/* Response Display */}
        {response && (
          <Card className="p-8 bg-gradient-card shadow-soft animate-fade-in">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold mb-4 text-foreground" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-3 text-foreground" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold mt-6 mb-2 text-foreground" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-foreground leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-foreground" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-primary" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse border border-border" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-muted" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-border px-4 py-2 text-left font-semibold text-foreground" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-border px-4 py-2 text-foreground" {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
