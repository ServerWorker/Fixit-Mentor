import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage, languages, Language } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('nav.settings')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">{t('nav.language')}</Label>
            <div className="grid gap-2 max-h-[400px] overflow-y-auto">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  className="justify-between h-auto py-3"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <div className="text-left">
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-muted-foreground">{lang.name}</div>
                  </div>
                  {language === lang.code && <Check className="w-4 h-4" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
