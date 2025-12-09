import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contact.successMessage'));
    setFormData({ name: "", email: "", message: "" });
  };

  const whyContactReasons = [
    t('contact.whyContact1'),
    t('contact.whyContact2'),
    t('contact.whyContact3'),
    t('contact.whyContact4'),
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('contact.title')} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('contact.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card hover:shadow-medium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('contact.emailTitle')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('contact.emailDesc')}
                  </p>
                  <a
                    href="mailto:contact@fixitmentor.ai"
                    className="text-sm text-primary hover:underline"
                  >
                    contact@fixitmentor.ai
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card hover:shadow-medium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-soft">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{t('contact.feedbackTitle')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.feedbackDesc')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-3">{t('contact.whyContactTitle')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {whyContactReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-gradient-card shadow-medium">
            <h2 className="text-2xl font-bold mb-6">{t('contact.formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.nameLabel')}
                </label>
                <Input
                  id="name"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.emailLabel')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.messageLabel')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.messagePlaceholder')}
                  className="min-h-[150px] resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary text-white hover:opacity-90 shadow-medium"
              >
                <Send className="mr-2 w-5 h-5" />
                {t('contact.sendButton')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
