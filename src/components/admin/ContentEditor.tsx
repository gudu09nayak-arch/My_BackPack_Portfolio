'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Save, Loader2 } from 'lucide-react'

interface ContentEditorProps {
  section: string
  title: string
  fields: {
    key: string
    label: string
    type: 'text' | 'textarea' | 'json'
    placeholder?: string
  }[]
}

export function ContentEditor({ section, title, fields }: ContentEditorProps) {
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [section])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/content?section=${section}`)
      const data = await res.json()
      setContent(data.content || {})
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content })
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Content saved successfully!')
      } else {
        toast.error('Failed to save content')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleJsonChange = (key: string, value: string) => {
    try {
      const parsed = JSON.parse(value)
      setContent(prev => ({ ...prev, [key]: parsed }))
    } catch {
      // Invalid JSON, keep as string for now
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.type === 'text' && (
              <Input
                id={field.key}
                value={String(content[field.key] || '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
            {field.type === 'textarea' && (
              <Textarea
                id={field.key}
                value={String(content[field.key] || '')}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
              />
            )}
            {field.type === 'json' && (
              <Textarea
                id={field.key}
                value={JSON.stringify(content[field.key] || {}, null, 2)}
                onChange={(e) => handleJsonChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={8}
                className="font-mono text-sm"
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function ContentEditorTabs() {
  const sections = [
    {
      section: 'hero',
      title: 'Hero Section',
      fields: [
        { key: 'headline', label: 'Headline', type: 'text' as const },
        { key: 'subheadline', label: 'Subheadline', type: 'textarea' as const },
        { key: 'ctaText', label: 'CTA Button Text', type: 'text' as const },
        { key: 'images', label: 'Images (JSON Array)', type: 'json' as const },
      ]
    },
    {
      section: 'about',
      title: 'About Section',
      fields: [
        { key: 'title', label: 'Title', type: 'text' as const },
        { key: 'body', label: 'Body Text', type: 'textarea' as const },
        { key: 'pillars', label: 'Pillars (JSON Array)', type: 'json' as const },
      ]
    },
    {
      section: 'sneakpeek',
      title: 'Sneak Peek Section',
      fields: [
        { key: 'title', label: 'Title', type: 'text' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'text' as const },
        { key: 'description', label: 'Description', type: 'textarea' as const },
        { key: 'features', label: 'Features (JSON Array)', type: 'json' as const },
      ]
    },
    {
      section: 'contact',
      title: 'Contact Section',
      fields: [
        { key: 'title', label: 'Title', type: 'text' as const },
        { key: 'subtitle', label: 'Subtitle', type: 'text' as const },
        { key: 'phone', label: 'Phone Number', type: 'text' as const },
        { key: 'email', label: 'Email Address', type: 'text' as const },
        { key: 'address', label: 'Address', type: 'text' as const },
      ]
    },
    {
      section: 'social',
      title: 'Social Links',
      fields: [
        { key: 'facebook', label: 'Facebook URL', type: 'text' as const },
        { key: 'instagram', label: 'Instagram URL', type: 'text' as const },
        { key: 'twitter', label: 'Twitter URL', type: 'text' as const },
        { key: 'youtube', label: 'YouTube URL', type: 'text' as const },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'text' as const },
      ]
    },
    {
      section: 'footer',
      title: 'Footer',
      fields: [
        { key: 'copyright', label: 'Copyright Text', type: 'text' as const },
        { key: 'links', label: 'Links (JSON Array)', type: 'json' as const },
      ]
    },
  ]

  return (
    <Tabs defaultValue="hero" className="space-y-4">
      <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
        {sections.map((s) => (
          <TabsTrigger
            key={s.section}
            value={s.section}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white"
          >
            {s.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((s) => (
        <TabsContent key={s.section} value={s.section}>
          <ContentEditor section={s.section} title={s.title} fields={s.fields} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
