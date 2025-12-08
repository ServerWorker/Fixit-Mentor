import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react"; // Import XCircle for error state
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'; // <-- ADD THIS IMPORT for tables/checklists
import { useLanguage } from "@/contexts/LanguageContext";

// Remove the Section interface as we are no longer splitting the text

export default function ResponsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // --- NEW STATE ---
  const [fullReport, setFullReport] = useState("");
  const [projectTitle, setProjectTitle] = useState("Circularity Consultant Report");
  
  const reportData = location.state || {};
  const response = reportData.response || "";
  const error = reportData.error;

  useEffect(() => {
    if (!response && !error) {
      // Only redirect if there's no state or no response and no error flag
      navigate("/system");
      return;
    }

    setFullReport(response);

    // Simple attempt to set a better title (optional)
    const lines = response.split('\n');
    if (lines.length > 0) {
      // Take the first non-header line as the title, or keep the default
      const titleLine = lines.find(line => line.trim() && !line.startsWith('#'));
      if (titleLine) {
        setProjectTitle(titleLine.trim());
      }
    }

  }, [response, error, navigate]); // Depend only on response/error state

  const handleBack = () => navigate("/system");

  // --- Conditional Rendering (If there is an error or no response) ---
  if (error || !fullReport) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-12 bg-gradient-card shadow-soft animate-fade-in text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-foreground">{t('response.noResponseTitle')}</h2>
          <p className="text-muted-foreground mb-6 text-lg">
            {reportData.error ? t('response.errorDesc') : t('response.noResponseDesc')}
          </p>
          <Button onClick={handleBack} size="lg" className="bg-gradient-primary text-white hover:opacity-90">
            {t('response.tryAgain')}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <Button
          onClick={handleBack}
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
            {reportData.wasteItem && (
              <span>Item: <strong className="text-foreground">{reportData.wasteItem}</strong></span>
            )}
            {reportData.budget && (
              <span>Budget: <strong className="text-foreground">₹{reportData.budget}</strong></span>
            )}
          </div>
        </div>

        {/* Single Card to Render Full Report */}
        <Card className="p-6 sm:p-8 shadow-2xl bg-white border border-gray-200 animate-fade-in">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              // Crucial plugin for tables and other Markdown extensions
              remarkPlugins={[remarkGfm]} 
              components={{
                // Your custom components for styling are all kept here:
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold mb-4 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground border-b-2 border-primary/20 pb-2" {...props} />
                ),
                // ... all your other component overrides (h3, p, ul, table, etc.)
                // NOTE: The Final Summary special styling should be done via a custom component if needed,
                // but for simplicity, the standard markdown rendering is sufficient.
                
                // Example of a final summary block rendering correctly:
                blockquote: ({ node, ...props }) => {
                  // We can use the blockquote style you defined for the summary if Gemini wraps it in one
                  return <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4 p-4 bg-primary/10 rounded-lg" {...props} />;
                },

                // Keep the rest of your components (p, ul, table, etc.) here
                
                // ... (rest of the component overrides) ...

              }}
            >
              {fullReport}
            </ReactMarkdown>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4 animate-fade-in">
          <Button
            onClick={handleBack}
            size="lg"
            className="bg-gradient-primary text-white hover:opacity-90"
          >
            {t('response.newPlan')}
          </Button>
        </div>
      </div>
    </div>
  );
}
