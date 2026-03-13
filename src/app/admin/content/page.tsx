'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ContentData {
  [key: string]: string;
}

export default function ContentEditor() {
  const [content, setContent] = useState<ContentData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const contentFields = {
    hero: [
      { key: 'hero_title', label: 'Hero Title', type: 'text' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
      { key: 'hero_cta_text', label: 'CTA Button Text', type: 'text' },
      { key: 'hero_trust_badge', label: 'Trust Badge Text', type: 'text' },
    ],
    about: [
      { key: 'about_title', label: 'About Title', type: 'text' },
      { key: 'about_body', label: 'About Body', type: 'textarea' },
    ],
    services: [{ key: 'services_title', label: 'Services Title', type: 'text' }],
    sneakpeek: [
      { key: 'sneakpeek_title', label: 'Sneak Peek Title', type: 'text' },
      { key: 'sneakpeek_body', label: 'Sneak Peek Body', type: 'textarea' },
      { key: 'sneakpeek_cta_text', label: 'CTA Button Text', type: 'text' },
    ],
    contact: [
      { key: 'contact_title', label: 'Contact Title', type: 'text' },
      { key: 'contact_phone', label: 'Phone Number', type: 'text' },
      { key: 'contact_email', label: 'Email Address', type: 'text' },
    ],
    footer: [
      { key: 'footer_copyright', label: 'Copyright Text', type: 'text' },
      { key: 'company_name', label: 'Company Name', type: 'text' },
    ],
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
      toast.error('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        toast.success('Content saved successfully!');
      } else {
        toast.error('Failed to save content');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <Sidebar>
        <div className="flex h-96 items-center justify-center">
          <div className="text-stone-500">Loading content...</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Content Editor</h1>
            <p className="text-stone-500">Edit the content displayed on your portfolio website.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={fetchContent} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
            {Object.keys(contentFields).map((section) => (
              <TabsTrigger
                key={section}
                value={section}
                className="rounded-lg border border-stone-200 bg-white px-4 py-2 capitalize data-[state=active]:border-amber-500 data-[state=active]:bg-amber-50"
              >
                {section}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(contentFields).map(([section, fields]) => (
            <TabsContent key={section} value={section}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
              >
                {fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="text-stone-700">
                      {field.label}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.key}
                        value={content[field.key] || ''}
                        onChange={(e) => updateContent(field.key, e.target.value)}
                        rows={4}
                        className="border-stone-200 focus:border-amber-500"
                      />
                    ) : (
                      <Input
                        id={field.key}
                        type="text"
                        value={content[field.key] || ''}
                        onChange={(e) => updateContent(field.key, e.target.value)}
                        className="border-stone-200 focus:border-amber-500"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Sidebar>
  );
}
