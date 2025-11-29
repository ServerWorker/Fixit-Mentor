import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Section {
  title: string;
  content: string;
}

export default function ResponsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [projectTitle, setProjectTitle] = useState("");

  useEffect(() => {
    if (!location.state) {
      navigate("/system");
      return;
    }

    const response = location.state.response || "";
    if (response) {
      parseResponse(response);
    }
  }, [location.state, navigate]);

  const parseResponse = (text: string) => {
    // Extract title from the first line or Overview section
    const lines = text.split("\n");
    let title = "Smart Reuse Plan";
    
    // Try to find a title in the first few lines
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      if (lines[i].trim() && !lines[i].startsWith("#")) {
        title = lines[i].trim().replace(/^#+\s*/, "");
        break;
      }
    }
    setProjectTitle(title);

    // Define the section headers we're looking for
    const sectionHeaders = [
      "Overview",
      "Recommended Project Idea",
      "Materials Needed",
      "Step-by-Step Method",
      "Budget Breakdown",
      "Alternate Uses",
      "Safety Notes",
      "Final Summary"
    ];

    const parsedSections: Section[] = [];

    // Split by headers (## or # followed by section name)
    sectionHeaders.forEach((header, index) => {
      const headerRegex = new RegExp(`#+\\s*${header}`, "i");
      const startIndex = text.search(headerRegex);
      
      if (startIndex === -1) return;

      // Find the next section or end of text
      let endIndex = text.length;
      for (let i = index + 1; i < sectionHeaders.length; i++) {
        const nextHeaderRegex = new RegExp(`#+\\s*${sectionHeaders[i]}`, "i");
        const nextIndex = text.search(nextHeaderRegex);
        if (nextIndex > startIndex) {
          endIndex = nextIndex;
          break;
        }
      }

      const content = text.substring(startIndex, endIndex).trim();
      parsedSections.push({ title: header, content });
    });

    setSections(parsedSections);
  };

  const getSectionColor = (index: number) => {
    const colors = [
      "bg-background",
      "bg-muted/20",
      "bg-background",
      "bg-muted/20",
      "bg-background",
      "bg-muted/20",
      "bg-background",
      "bg-muted/20"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/system")}
          variant="ghost"
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to System
        </Button>

        {/* Project Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {projectTitle}
          </h1>
          <div className="flex gap-4 justify-center flex-wrap text-sm text-muted-foreground">
            {location.state?.wasteItem && (
              <span>Item: <strong className="text-foreground">{location.state.wasteItem}</strong></span>
            )}
            {location.state?.budget && (
              <span>Budget: <strong className="text-foreground">₹{location.state.budget}</strong></span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {(!sections || sections.length === 0) && (
          <Card className="p-12 bg-gradient-card shadow-soft animate-fade-in text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                No Response Generated Yet
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                {location.state?.error 
                  ? "There was an issue generating your plan. This could be due to API configuration or connectivity issues."
                  : "The response is empty. Please try again with different inputs or check your backend configuration."}
              </p>
              <div className="bg-muted/30 rounded-lg p-6 mb-6 text-left">
                <p className="text-sm text-muted-foreground mb-2">Your inputs:</p>
                <p className="text-foreground"><strong>Waste Item:</strong> {location.state?.wasteItem}</p>
                <p className="text-foreground"><strong>Budget:</strong> ₹{location.state?.budget}</p>
                {location.state?.otherInfo && (
                  <p className="text-foreground"><strong>Other Info:</strong> {location.state?.otherInfo}</p>
                )}
              </div>
              <Button
                onClick={() => navigate("/system")}
                size="lg"
                className="bg-gradient-primary text-white hover:opacity-90"
              >
                Try Again
              </Button>
            </div>
          </Card>
        )}

        {/* Sections */}
        {sections && sections.length > 0 && (
          <div className="space-y-0">
            {sections.map((section, index) => (
            <div
              key={section.title}
              className={`py-12 px-4 sm:px-8 ${getSectionColor(index)} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="max-w-4xl mx-auto">
                {/* Section Title */}
                <h2 className="text-3xl font-bold mb-6 text-foreground border-b-2 border-primary/20 pb-2">
                  {section.title}
                </h2>

                {/* Section Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-3xl font-bold mb-4 text-foreground" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4 text-foreground/90 leading-relaxed text-lg" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 text-foreground/90" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-3 text-foreground/90" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-foreground/90 text-lg" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-bold text-primary" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8 rounded-lg border border-border">
                          <table className="w-full border-collapse" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-primary/10" {...props} />
                      ),
                      tbody: ({ node, ...props }) => (
                        <tbody className="bg-card" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="border border-border px-6 py-3 text-left font-semibold text-foreground" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="border border-border px-6 py-3 text-foreground/90" {...props} />
                      ),
                      tr: ({ node, ...props }) => (
                        <tr className="hover:bg-muted/50 transition-colors" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4" {...props} />
                      ),
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>

                {/* Special styling for Final Summary */}
                {section.title === "Final Summary" && (
                  <div className="mt-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
                    <p className="text-lg text-foreground leading-relaxed">
                      Ready to start your sustainable project!
                    </p>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4 animate-fade-in">
          <Button
            onClick={() => navigate("/system")}
            size="lg"
            className="bg-gradient-primary text-white hover:opacity-90"
          >
            Create Another Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
