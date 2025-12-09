import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { useLanguage } from "@/contexts/LanguageContext";
import { ResponseNavigation } from "@/components/ResponseNavigation";

export default function ResponsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
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

    // Sanitize the response - remove leading garbage characters before markdown
    let cleanedResponse = response;
    if (cleanedResponse) {
      // Remove leading whitespace, commas, and other garbage before markdown starts
      cleanedResponse = cleanedResponse.replace(/^[\s,]+/, '');
      // Ensure it starts with valid markdown (# or text)
      const firstHashIndex = cleanedResponse.indexOf('#');
      if (firstHashIndex > 0 && firstHashIndex < 20) {
        // If there's garbage before the first heading, remove it
        cleanedResponse = cleanedResponse.substring(firstHashIndex);
      }
    }
    
    setFullReport(cleanedResponse);

    // Simple attempt to set a better title (optional)
    const lines = cleanedResponse.split('\n');
    if (lines.length > 0) {
      // Take the first heading as the title
      const titleLine = lines.find(line => line.trim().startsWith('#'));
      if (titleLine) {
        setProjectTitle(titleLine.replace(/^#+\s*/, '').trim());
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

  // Generate section ID from heading text
  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  return (
    <>
      <ResponseNavigation />
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
          <div id="overview" className="text-center mb-12 animate-fade-in scroll-mt-24">
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
        <Card className="p-6 sm:p-8 shadow-2xl bg-card border border-border animate-fade-in">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]} 
              components={{
                h1: ({ node, children, ...props }) => (
                  <h1 className="text-3xl font-bold mb-6 text-foreground" {...props}>{children}</h1>
                ),
                h2: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = generateId(text);
                  return (
                    <div id={id} className="mt-12 mb-6 pt-8 border-t-2 border-primary/30 scroll-mt-24">
                      <h2 className="text-2xl font-bold text-foreground" {...props}>{children}</h2>
                    </div>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = generateId(text);
                  return (
                    <h3 id={id} className="text-xl font-semibold mt-6 mb-3 text-foreground scroll-mt-24" {...props}>{children}</h3>
                  );
                },
                p: ({ node, ...props }) => (
                  <p className="text-foreground/90 leading-relaxed mb-4" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside space-y-2 text-foreground/90 mb-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside space-y-2 text-foreground/90 mb-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-foreground/90" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-foreground" {...props} />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-6 rounded-lg border border-border">
                    <table className="w-full border-collapse" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th className="border border-border px-4 py-3 text-left font-semibold text-foreground" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="border border-border px-4 py-3 text-foreground/90" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-6 p-4 bg-primary/10 rounded-lg" {...props} />
                ),
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
    </>
  );
}
