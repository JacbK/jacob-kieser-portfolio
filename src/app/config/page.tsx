'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Sparkles, Upload, FileText, Image, X, Check, Terminal, ArrowRight, ChevronRight, Loader2, Edit3 } from 'lucide-react';
import Link from 'next/link';

type ConfigStep = 'basics' | 'design' | 'review';

const ARCHETYPE_EXAMPLES = [
  {
    id: 1,
    name: 'Brutalist',
    description: 'Sharp edges, monospace, high contrast',
    color: 'from-neutral-900 to-neutral-800',
    examples: [
      {
        name: 'Brutalist Web Design',
        url: 'https://brutalist-web.design',
        screenshot: '/inspirations/brutalist-web-design.png',
        design: {
          typography: 'System monospace, no custom fonts, 16px base',
          colors: 'Pure black/white, no grays, high contrast',
          layout: 'Single column, left-aligned, no grid, HTML default flow',
          spacing: 'Minimal padding, browser defaults, dense',
          motion: 'None - completely static',
          details: 'No shadows, underlined links, raw HTML aesthetic'
        }
      },
      {
        name: 'Neobrutalism',
        url: 'https://neobrutalism.dev',
        screenshot: '/inspirations/neobrutalism.png',
        design: {
          typography: 'Bold sans-serif headers (800+ weight), monospace body',
          colors: 'Black backgrounds, white text, neon accent (yellow/cyan)',
          layout: 'Boxy cards, thick borders (4-8px), no border-radius',
          spacing: 'Generous padding (24-48px), clear sections',
          motion: 'Sharp snap animations, no easing curves',
          details: 'Heavy drop shadows (8-12px), stark borders, grid-based'
        }
      },
      {
        name: 'Mono Company',
        url: 'https://mono.company',
        screenshot: '/inspirations/mono-company.png',
        design: {
          typography: 'Monospace everywhere (IBM Plex Mono), 14-16px',
          colors: 'True monochrome (black/white/grays), no color',
          layout: 'Fixed-width (1200px max), centered, strict grid',
          spacing: 'Consistent 8px grid, mathematical spacing',
          motion: 'Minimal hover states, fade transitions only',
          details: 'Thin borders (1px), subtle shadows, pixel-perfect alignment'
        }
      },
    ],
  },
  {
    id: 2,
    name: 'Editorial',
    description: 'Magazine layouts, serif headers',
    color: 'from-amber-900 to-amber-800',
    examples: [
      {
        name: 'NY Times',
        url: 'https://www.nytimes.com',
        screenshot: '/inspirations/nytimes.png',
        design: {
          typography: 'Georgia/Serif headers (28-48px), Sans body (16-18px)',
          colors: 'Black text, white bg, minimal red accents',
          layout: 'Multi-column grid, asymmetric breakup, sidebars',
          spacing: 'Tight line-height (1.4), dense paragraph spacing',
          motion: 'None - static content focus',
          details: 'Thin divider lines (1px), occasional images, text-heavy'
        }
      },
      {
        name: 'The Pudding',
        url: 'https://pudding.cool',
        screenshot: '/inspirations/pudding.png',
        design: {
          typography: 'Bold serif headlines (60-80px), sans body (18-21px)',
          colors: 'Vibrant accent colors, white/cream backgrounds',
          layout: 'Asymmetric columns (70/30 split), overlapping elements',
          spacing: 'Generous (100-200px section gaps), breathable',
          motion: 'Scroll-triggered animations, data visualizations',
          details: 'Large pull quotes, colored text blocks, image/text overlap'
        }
      },
      {
        name: 'The Verge',
        url: 'https://www.theverge.com',
        screenshot: '/inspirations/theverge.png',
        design: {
          typography: '__Optimist/serif headlines (32-56px), sans body (17px)',
          colors: 'Black/white base, neon accent (hot pink/lime)',
          layout: 'Card-based grid, featured hero, sidebar modules',
          spacing: 'Moderate (40-60px gaps), card padding (24px)',
          motion: 'Smooth image lazy-loads, hover scale effects',
          details: 'Rounded cards (8px), soft shadows, category tags'
        }
      },
    ],
  },
  {
    id: 3,
    name: 'Terminal',
    description: 'Command-line aesthetic, CRT colors',
    color: 'from-green-900 to-green-800',
    examples: [
      {
        name: 'Terminal Sexy',
        url: 'https://terminal.sexy',
        screenshot: '/inspirations/terminal-sexy.png',
        design: {
          typography: 'Monospace (Fira Code/JetBrains), 14px fixed',
          colors: 'Dark bg (#0d0d0d), green text (#00ff41), cursor blink',
          layout: 'Fixed-width (80ch), single column, text-only',
          spacing: 'Line-height 1.5, no padding, terminal default',
          motion: 'Blinking cursor, typewriter effect on load',
          details: 'ASCII borders, prompt symbols (>), CRT scanlines'
        }
      },
      {
        name: 'Robin Sloan',
        url: 'https://www.robinsloan.com',
        screenshot: '/inspirations/robin-sloan.png',
        design: {
          typography: 'Monospace (Courier/Consolas), 16px, serif fallback',
          colors: 'Black bg, white text, no colors',
          layout: 'Narrow column (60ch), left-aligned, essay format',
          spacing: 'Generous line-height (1.8), wide margins',
          motion: 'None - reading-focused',
          details: 'Underlined links, minimal decoration, text-first'
        }
      },
      {
        name: 'GitHub',
        url: 'https://github.com',
        screenshot: '/inspirations/github.png',
        design: {
          typography: 'Monospace code (SF Mono), sans UI (14px)',
          colors: 'Dark mode (#0d1117), white text, blue accents',
          layout: 'File tree sidebar, content main, 3-column',
          spacing: 'Compact (8-16px gaps), dense information',
          motion: 'Instant transitions, no delays',
          details: 'Syntax highlighting, line numbers, code blocks'
        }
      },
    ],
  },
  {
    id: 4,
    name: 'Retro Arcade',
    description: 'Pixel fonts, neon colors, 8-bit',
    color: 'from-fuchsia-900 to-purple-900',
    examples: [
      {
        name: 'Poolsuite',
        url: 'https://poolsuite.net',
        screenshot: '/inspirations/poolsuite.png',
        design: {
          typography: 'Rounded sans (Comic Sans-adjacent), 16-20px, playful',
          colors: 'Pastel (pink/blue/yellow), gradients, retro palette',
          layout: 'Centered cards, floating elements, sticker aesthetic',
          spacing: 'Varied (24-80px), playful asymmetry',
          motion: 'Wobble animations, parallax scrolling, float effects',
          details: 'Soft shadows, rounded corners (16-24px), illustrations'
        }
      },
      {
        name: 'Bruno Simon',
        url: 'https://bruno-simon.com',
        screenshot: '/inspirations/bruno-simon.png',
        design: {
          typography: 'Bold sans-serif, 14-18px, clean UI',
          colors: 'Dark bg, white text, colorful 3D elements',
          layout: '3D canvas full-screen, minimal UI overlay',
          spacing: 'UI elements: compact (12-16px), spacious canvas',
          motion: '3D physics, interactive elements, smooth 60fps',
          details: 'WebGL rendering, car/road metaphor, gamified'
        }
      },
      {
        name: 'Windows 93',
        url: 'https://www.windows93.net',
        screenshot: '/inspirations/windows93.png',
        design: {
          typography: 'Pixel font (Press Start 2P), 8-12px, bitmap',
          colors: 'Neon (magenta/cyan/yellow), black bg, high saturation',
          layout: 'OS window metaphor, draggable windows, desktop UI',
          spacing: 'Pixelated 8px grid, retro OS spacing',
          motion: 'Glitch effects, cursor trails, animated backgrounds',
          details: 'Pixel art icons, window chrome, 90s nostalgia'
        }
      },
    ],
  },
  {
    id: 5,
    name: 'Geometric',
    description: 'Color blocking, shapes, bold',
    color: 'from-blue-900 to-blue-800',
    examples: [
      {
        name: 'Linear',
        url: 'https://linear.app',
        screenshot: '/inspirations/linear.png',
        design: {
          typography: 'Inter/SF Pro, 14-16px, -0.02em tracking, 500 weight',
          colors: 'True black (#000), white (#fff), purple accent (#5e6ad2)',
          layout: 'Centered, max-width 1200px, symmetric grid',
          spacing: 'Generous (80-120px sections), 40px padding',
          motion: 'Subtle fades (200ms), smooth scroll, polished',
          details: 'No borders, soft gradients, clean edges, minimal'
        }
      },
      {
        name: 'Stripe',
        url: 'https://stripe.com',
        screenshot: '/inspirations/stripe.png',
        design: {
          typography: 'Camphor/sans-serif, 16-18px, medium weight',
          colors: 'White bg, black text, blue (#635bff) accent',
          layout: 'Asymmetric hero, grid-based content, diagonal dividers',
          spacing: 'Variable (60-100px), responsive scaling',
          motion: 'Animated gradients, smooth scroll reveals',
          details: 'Gradient meshes, geometric shapes, depth layers'
        }
      },
      {
        name: 'Vercel',
        url: 'https://vercel.com',
        screenshot: '/inspirations/vercel.png',
        design: {
          typography: 'Geist/mono hybrid, 14-16px, tight spacing',
          colors: 'True black (#000), white (#fff), no color',
          layout: 'Full-width sections, edge-to-edge, no max-width',
          spacing: 'Extreme (120-200px section gaps), minimal padding',
          motion: 'Fast (100ms), instant feedback, no delays',
          details: 'Thin borders (1px), sharp corners, monochromatic'
        }
      },
    ],
  },
  {
    id: 6,
    name: 'Luxury',
    description: 'Elegant serifs, large whitespace',
    color: 'from-stone-900 to-stone-800',
    examples: [
      {
        name: 'Apple',
        url: 'https://www.apple.com',
        screenshot: '/inspirations/apple.png',
        design: {
          typography: 'SF Pro Display, 21-80px headlines, light/medium weights',
          colors: 'White bg, black text, minimal color (product images)',
          layout: 'Large hero images, centered text, single column flow',
          spacing: 'Massive (150-300px gaps), generous padding',
          motion: 'Smooth scrollytelling, parallax, video backgrounds',
          details: 'High-res images, soft shadows, rounded corners (12px)'
        }
      },
      {
        name: 'Rolex',
        url: 'https://www.rolex.com',
        screenshot: '/inspirations/rolex.png',
        design: {
          typography: 'Serif headers (28-48px), light sans body (14-16px)',
          colors: 'Black/white/gold (#d4af37), minimal palette',
          layout: 'Narrow column (700px), centered, ample margins',
          spacing: 'Luxurious (100-200px), single element focus',
          motion: 'Slow fades (600ms), elegant transitions',
          details: 'Elegant dividers, gold accents, serif details'
        }
      },
      {
        name: 'Bottega Veneta',
        url: 'https://www.bottegaveneta.com',
        screenshot: '/inspirations/bottega-veneta.png',
        design: {
          typography: 'Light serif (300 weight), 18-24px, letter-spacing +0.05em',
          colors: 'Cream/beige bg, black text, earth tones',
          layout: 'Image-first, minimal text overlay, editorial flow',
          spacing: 'Extreme whitespace (200-400px), breathing room',
          motion: 'Slow reveals (800ms), lazy image loads',
          details: 'Thin borders, elegant typography, refined aesthetic'
        }
      },
    ],
  },
];

export default function ConfigPage() {
  const [config, setConfig] = useState({
    name: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    cli: 'claude-code',
    sections: {
      hero: true,
      about: true,
      experience: true,
      projects: true,
      skills: false,
      education: false,
      contact: true,
      blog: false,
      testimonials: false,
    },
    design: {
      creativity: 5,
      simplicity: 7,
      playfulness: 4,
      animation: 5,
      color_intensity: 4,
      notes: '',
    },
    content: {
      tone: 'conversational',
      length: 'balanced',
      focus: 'projects',
    },
    ai: {
      quality_bar: 7,
      research_depth: 6,
      copy_creativity: 5,
    },
    notes: '',
  });

  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; path: string; folder: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);
  const [showDownloadHelp, setShowDownloadHelp] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConfigStep>('basics');
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingConfig, setHasExistingConfig] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing config on mount
  useEffect(() => {
    async function loadExistingConfig() {
      try {
        const res = await fetch('/api/read-config');
        const data = await res.json();

        if (data.exists && data.config) {
          const c = data.config;
          setHasExistingConfig(true);

          // Populate form with existing values
          setConfig({
            name: c.name || '',
            email: c.email || '',
            github: c.github || '',
            linkedin: c.linkedin || '',
            twitter: c.twitter || '',
            website: c.website || '',
            cli: c.cli || 'claude-code',
            sections: {
              hero: c.sections?.hero ?? true,
              about: c.sections?.about ?? true,
              experience: c.sections?.experience ?? true,
              projects: c.sections?.projects ?? true,
              skills: c.sections?.skills ?? false,
              education: c.sections?.education ?? false,
              contact: c.sections?.contact ?? true,
              blog: c.sections?.blog ?? false,
              testimonials: c.sections?.testimonials ?? false,
            },
            design: {
              creativity: c.design?.creativity ?? 5,
              simplicity: c.design?.simplicity ?? 7,
              playfulness: c.design?.playfulness ?? 4,
              animation: c.design?.animation ?? 5,
              color_intensity: c.design?.color_intensity ?? 4,
              notes: c.design?.notes || '',
            },
            content: {
              tone: c.content?.tone || 'conversational',
              length: c.content?.length || 'balanced',
              focus: c.content?.focus || 'projects',
            },
            ai: {
              quality_bar: c.ai?.quality_bar ?? 7,
              research_depth: c.ai?.research_depth ?? 6,
              copy_creativity: c.ai?.copy_creativity ?? 5,
            },
            notes: c.notes || '',
          });

          // Load design inspirations if they exist
          if (c.design_inspirations && Array.isArray(c.design_inspirations)) {
            const urls = c.design_inspirations.map((i: { url?: string }) => i.url).filter(Boolean);
            setSelectedExamples(urls);
          }
        }
      } catch (err) {
        console.error('Failed to load config:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadExistingConfig();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: 'documents' | 'images') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      try {
        const res = await fetch('/api/upload-material', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const data = await res.json();
          setUploadedFiles(prev => [...prev, { name: data.name, path: data.path, folder }]);
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    setIsUploading(false);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeUploadedFile = (path: string) => {
    setUploadedFiles(prev => prev.filter(f => f.path !== path));
  };

  const toggleExample = (url: string) => {
    setSelectedExamples((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  // Parse design attributes from text descriptions into structured values
  const parseDesignAttributes = (design: {
    typography: string;
    colors: string;
    layout: string;
    spacing: string;
    motion: string;
    details: string;
  }) => {
    // Extract font family (first font mentioned)
    const fontMatch = design.typography.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/);
    const fontFamily = fontMatch ? fontMatch[1] : 'Inter';

    // Extract base font size (average if range)
    const sizeMatch = design.typography.match(/(\d+)(?:-(\d+))?px/);
    const fontSize = sizeMatch ? (sizeMatch[2] ? Math.round((parseInt(sizeMatch[1]) + parseInt(sizeMatch[2])) / 2) : parseInt(sizeMatch[1])) : 16;

    // Extract font weight
    const weightMatch = design.typography.match(/(\d{3})\s*weight/);
    const fontWeight = weightMatch ? parseInt(weightMatch[1]) : 400;

    // Extract letter spacing
    const trackingMatch = design.typography.match(/([-\d.]+)em\s*tracking/);
    const letterSpacing = trackingMatch ? trackingMatch[1] + 'em' : 'normal';

    // Extract colors (hex codes)
    const hexMatches = design.colors.match(/#[0-9A-Fa-f]{3,6}/g) || [];
    const colorBg = hexMatches[0] || '#000000';
    const colorText = hexMatches[1] || '#ffffff';
    const colorAccent = hexMatches[2] || hexMatches[0] || '#5e6ad2';

    // Extract max width
    const widthMatch = design.layout.match(/(\d+)px/);
    const maxWidth = widthMatch ? parseInt(widthMatch[1]) : 1200;

    // Extract alignment
    const alignment = design.layout.toLowerCase().includes('centered') ? 'centered' :
                     design.layout.toLowerCase().includes('full') ? 'full-width' : 'left';

    // Extract section spacing (average if range)
    const spacingMatch = design.spacing.match(/(\d+)(?:-(\d+))?px/);
    const sectionSpacing = spacingMatch ? (spacingMatch[2] ? Math.round((parseInt(spacingMatch[1]) + parseInt(spacingMatch[2])) / 2) : parseInt(spacingMatch[1])) : 100;

    // Extract padding
    const paddingMatch = design.spacing.match(/(\d+)px\s*padding/);
    const padding = paddingMatch ? parseInt(paddingMatch[1]) : 40;

    // Extract motion duration
    const durationMatch = design.motion.match(/(\d+)ms/);
    const motionDuration = durationMatch ? parseInt(durationMatch[1]) : 200;

    // Extract motion style
    const motionStyle = design.motion.toLowerCase().includes('fade') ? 'fade' :
                       design.motion.toLowerCase().includes('slide') ? 'slide' :
                       design.motion.toLowerCase().includes('snap') ? 'snap' : 'fade';

    // Extract border info
    const borderMatch = design.details.match(/(\d+)px\s*border/);
    const borderWidth = design.details.toLowerCase().includes('no border') ? 0 : (borderMatch ? parseInt(borderMatch[1]) : 1);

    // Extract border radius
    const borderRadius = design.details.toLowerCase().includes('sharp') ||
                        design.details.toLowerCase().includes('clean edges') ? 0 :
                        design.details.toLowerCase().includes('rounded') ? 8 : 0;

    return {
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      colorBg,
      colorText,
      colorAccent,
      maxWidth,
      alignment,
      sectionSpacing,
      padding,
      motionDuration,
      motionStyle,
      borderWidth,
      borderRadius
    };
  };

  const generateYaml = () => {
    // Build design inspirations section with embedded design specs AND parsed attributes
    const inspirationsText = selectedExamples.length > 0
      ? `\ndesign_inspirations:${selectedExamples.map(url => {
          const example = ARCHETYPE_EXAMPLES.flatMap(a => a.examples).find(e => e.url === url);
          if (!example) return '';
          const attrs = parseDesignAttributes(example.design);
          return `
  - name: "${example.name}"
    # Extracted attributes (use these programmatically)
    attributes:
      fontFamily: "${attrs.fontFamily}"
      fontSize: ${attrs.fontSize}
      fontWeight: ${attrs.fontWeight}
      letterSpacing: "${attrs.letterSpacing}"
      colorBg: "${attrs.colorBg}"
      colorText: "${attrs.colorText}"
      colorAccent: "${attrs.colorAccent}"
      maxWidth: ${attrs.maxWidth}
      alignment: "${attrs.alignment}"
      sectionSpacing: ${attrs.sectionSpacing}
      padding: ${attrs.padding}
      motionDuration: ${attrs.motionDuration}
      motionStyle: "${attrs.motionStyle}"
      borderWidth: ${attrs.borderWidth}
      borderRadius: ${attrs.borderRadius}
    # Original descriptions (for reference)
    descriptions:
      typography: "${example.design.typography}"
      colors: "${example.design.colors}"
      layout: "${example.design.layout}"
      spacing: "${example.design.spacing}"
      motion: "${example.design.motion}"
      details: "${example.design.details}"`;
        }).join('')}`
      : '';

    const enabledSections = Object.entries(config.sections)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key);

    return `name: "${config.name || 'Your Name'}"
email: "${config.email}"
github: "${config.github}"
linkedin: "${config.linkedin}"
twitter: "${config.twitter}"
website: "${config.website}"
cli: "${config.cli}"

sections:
${enabledSections.map(s => `  - ${s}`).join('\n')}

design:
  creativity: ${config.design.creativity}
  simplicity: ${config.design.simplicity}
  playfulness: ${config.design.playfulness}
  animation: ${config.design.animation}
  color_intensity: ${config.design.color_intensity}${inspirationsText}

content:
  tone: "${config.content.tone}"
  length: "${config.content.length}"
  focus: "${config.content.focus}"

ai:
  quality_bar: ${config.ai.quality_bar}
  research_depth: ${config.ai.research_depth}
  copy_creativity: ${config.ai.copy_creativity}

notes: |
${config.notes.split('\n').map((line) => `  ${line}`).join('\n')}
`;
  };

  const downloadConfig = () => {
    const yaml = generateYaml();
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'profile.yaml';
    a.click();
    URL.revokeObjectURL(url);
    setShowDownloadHelp(true);
  };

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 size={32} className="animate-spin mx-auto text-neutral-400" />
          <p className="text-neutral-500">Loading configuration...</p>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'basics' as const, label: 'Basics', description: 'Name & contact info' },
    { id: 'design' as const, label: 'Design', description: 'Style & inspirations' },
    { id: 'review' as const, label: 'Review', description: 'Save & generate' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Check size={32} className="text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Config Saved!</h2>
              <p className="text-neutral-400">
                Your profile has been saved to <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">profile.yaml</code>
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Terminal size={20} className="text-green-500" />
                <span className="font-semibold">Next Step</span>
              </div>
              <p className="text-neutral-400 text-sm mb-4">
                Close this tab and return to your terminal. The AI will automatically start building your portfolio.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors text-sm"
              >
                Keep Editing
              </button>
              <button
                onClick={() => {
                  // Try to close the tab - this works if the page was opened by a script
                  window.close();
                  // If window.close() didn't work (browser security), show a message
                  setShowSuccessModal(false);
                  setConfigSaved(true);
                }}
                className="flex-1 px-4 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                Done
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              {hasExistingConfig && (
                <span className="flex items-center gap-2 text-sm text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                  <Edit3 size={14} />
                  Editing existing config
                </span>
              )}
              <h1 className="text-xl font-bold">Portfolio Config</h1>
            </div>
            <div className="w-20" /> {/* Spacer for balance */}
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === step.id
                      ? 'bg-white text-black'
                      : index < currentStepIndex
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id
                      ? 'bg-black text-white'
                      : index < currentStepIndex
                      ? 'bg-green-600 text-white'
                      : 'bg-neutral-700 text-neutral-400'
                  }`}>
                    {index < currentStepIndex ? <Check size={14} /> : index + 1}
                  </span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{step.label}</div>
                    <div className={`text-xs ${currentStep === step.id ? 'text-neutral-600' : 'text-neutral-500'}`}>
                      {step.description}
                    </div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight size={20} className="mx-2 text-neutral-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Persistent success banner */}
      {configSaved && (
        <div className="bg-green-600 text-white py-4 px-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check size={20} />
              <span className="font-medium">Config saved!</span>
              <span className="text-green-100">Return to your terminal and press <kbd className="bg-green-700 px-2 py-0.5 rounded text-xs font-mono">Ctrl+C</kbd> to continue.</span>
            </div>
            <button
              onClick={() => setConfigSaved(false)}
              className="text-green-100 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Step 1: Basics */}
        {currentStep === 'basics' && (
          <>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
              <div className="flex gap-3">
                <Sparkles size={24} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-lg mb-2">Let&apos;s start with the basics</h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Only your <span className="text-white font-medium">name</span> is required.
                    The AI will research and fill in everything else.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Column 1: Basic Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Basic Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    Email
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={config.github}
                    onChange={(e) => setConfig({ ...config, github: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-neutral-400">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={config.linkedin}
                    onChange={(e) => setConfig({ ...config, linkedin: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AI CLI Tool <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={config.cli}
                    onChange={(e) => setConfig({ ...config, cli: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  >
                    <option value="claude-code">Claude Code</option>
                    <option value="codex">GitHub Codex</option>
                    <option value="gemini">Google Gemini CLI</option>
                    <option value="aider">Aider</option>
                    <option value="cursor">Cursor AI</option>
                    <option value="other">Other / Custom</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-1.5">Which AI coding assistant will build your portfolio?</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Sections
              </h2>
              <p className="text-neutral-400 text-sm mb-4">
                Choose what to include on your portfolio.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'hero', label: 'Hero', desc: 'Main intro banner' },
                  { key: 'about', label: 'About', desc: 'Bio & background' },
                  { key: 'experience', label: 'Experience', desc: 'Work history' },
                  { key: 'projects', label: 'Projects', desc: 'Portfolio pieces' },
                  { key: 'skills', label: 'Skills', desc: 'Tech & abilities' },
                  { key: 'education', label: 'Education', desc: 'Schools & certs' },
                  { key: 'contact', label: 'Contact', desc: 'Get in touch' },
                  { key: 'blog', label: 'Blog', desc: 'Articles & posts' },
                  { key: 'testimonials', label: 'Testimonials', desc: 'Recommendations' },
                ].map(({ key, label, desc }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setConfig({
                      ...config,
                      sections: { ...config.sections, [key]: !config.sections[key as keyof typeof config.sections] }
                    })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      config.sections[key as keyof typeof config.sections]
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-xs opacity-60">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tone</label>
                  <select
                    value={config.content.tone}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: { ...config.content, tone: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="professional">Professional</option>
                    <option value="conversational">Conversational</option>
                    <option value="technical">Technical</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Focus</label>
                  <select
                    value={config.content.focus}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        content: { ...config.content, focus: e.target.value },
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="projects">Projects</option>
                    <option value="experience">Experience</option>
                    <option value="skills">Skills</option>
                    <option value="personality">Personality</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Personal Notes</label>
              <textarea
                value={config.notes}
                onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 h-32 resize-none text-sm"
                placeholder="Tell the AI about yourself, your goals, design inspirations..."
              />
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
                Materials
              </h2>
              <p className="text-neutral-400 text-sm mb-4">
                Upload resumes, headshots, or other files for the AI to use.
              </p>

              <div className="space-y-3">
                {/* Documents upload */}
                <label className="flex items-center gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer hover:border-neutral-600 transition-colors">
                  <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Upload Documents</div>
                    <div className="text-xs text-neutral-500">PDF, TXT, MD (resume, cover letter, etc.)</div>
                  </div>
                  <Upload size={16} className="text-neutral-500" />
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.md,.doc,.docx"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'documents')}
                  />
                </label>

                {/* Images upload */}
                <label className="flex items-center gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer hover:border-neutral-600 transition-colors">
                  <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                    <Image size={20} className="text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Upload Images</div>
                    <div className="text-xs text-neutral-500">JPG, PNG, WebP (headshot, projects, etc.)</div>
                  </div>
                  <Upload size={16} className="text-neutral-500" />
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp,.gif,.svg"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'images')}
                  />
                </label>
              </div>

              {/* Upload status */}
              {isUploading && (
                <div className="mt-3 text-sm text-neutral-400 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
                  Uploading...
                </div>
              )}

              {/* Uploaded files list */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Uploaded</div>
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.path}
                      className="flex items-center gap-2 p-2 bg-neutral-900/50 rounded-md text-sm"
                    >
                      <Check size={14} className="text-green-500" />
                      <span className="flex-1 truncate text-neutral-300">{file.name}</span>
                      <span className="text-xs text-neutral-600">{file.folder}</span>
                      <button
                        onClick={() => removeUploadedFile(file.path)}
                        className="p-1 hover:bg-neutral-800 rounded transition-colors"
                      >
                        <X size={14} className="text-neutral-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setCurrentStep('design')}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
              >
                Next: Design
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* Step 2: Design */}
        {currentStep === 'design' && (
          <>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
              <div className="flex gap-3">
                <Sparkles size={24} className="text-neutral-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-lg mb-2">Choose your design direction</h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Select websites that inspire you. The AI will synthesize their styles into something unique for you.
                  </p>
                </div>
              </div>
            </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Design Inspirations
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              Click websites whose design you admire. The AI will draw inspiration from their specific attributes (typography, spacing, color, layout).
            </p>

            {selectedExamples.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <p className="text-blue-400 font-medium mb-2">
                  ✓ {selectedExamples.length} design inspiration{selectedExamples.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedExamples.map((url) => {
                    const example = ARCHETYPE_EXAMPLES.flatMap(a => a.examples).find(e => e.url === url);
                    return (
                      <span key={url} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {example?.name || url}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-8">
              {ARCHETYPE_EXAMPLES.map((archetype) => (
                <div key={archetype.id} className="border-b border-neutral-800 pb-8 last:border-0">
                  <h3 className="font-bold text-lg mb-1">{archetype.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{archetype.description}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {archetype.examples.map((example) => (
                      <button
                        key={example.url}
                        onClick={() => toggleExample(example.url)}
                        className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedExamples.includes(example.url)
                            ? 'border-white ring-2 ring-white/20'
                            : 'border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={example.screenshot}
                          alt={example.name}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to gradient if screenshot fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add('bg-gradient-to-br');
                              // Add each class from archetype.color separately
                              archetype.color.split(' ').forEach(cls => parent.classList.add(cls));
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{example.name}</span>
                        </div>
                        {selectedExamples.includes(example.url) && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-800 pt-8 mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-6">
                Design Preferences
              </h2>
              <div className="space-y-6">
                {[
                  { key: 'creativity', label: 'Creativity', desc: 'Conservative → Experimental' },
                  { key: 'simplicity', label: 'Simplicity', desc: 'Dense → Minimal' },
                  { key: 'playfulness', label: 'Playfulness', desc: 'Professional → Playful' },
                  { key: 'animation', label: 'Animation', desc: 'Static → Motion-rich' },
                  { key: 'color_intensity', label: 'Color', desc: 'Monochrome → Vibrant' },
                ].map(({ key, label, desc }) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium text-sm">{label}</div>
                        <div className="text-xs text-neutral-500">{desc}</div>
                      </div>
                      <div className="text-2xl font-bold tabular-nums w-12 text-right">
                        {config.design[key as keyof typeof config.design]}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={config.design[key as keyof typeof config.design]}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            design: {
                              ...config.design,
                              [key]: parseInt(e.target.value),
                            },
                          })
                        }
                        className="w-full h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5
                          [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:bg-white
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-transform
                          [&::-webkit-slider-thumb]:hover:scale-110
                          [&::-moz-range-thumb]:w-5
                          [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:bg-white
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-neutral-600 mt-2">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep('basics')}
                className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Back: Basics
              </button>
              <button
                onClick={() => setCurrentStep('review')}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors"
              >
                Next: Review & Save
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {currentStep === 'review' && (
          <>
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
              <div className="flex gap-3">
                <Check size={24} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-bold text-lg mb-2">Review & Save</h2>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {hasExistingConfig
                      ? 'Review your changes and save to update your config.'
                      : 'Review your choices and save to generate your portfolio.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Basic Info</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Name</dt>
                    <dd>{config.name || <span className="text-neutral-600">Not set</span>}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Email</dt>
                    <dd>{config.email || <span className="text-neutral-600">Not set</span>}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">GitHub</dt>
                    <dd>{config.github || <span className="text-neutral-600">Not set</span>}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">AI Tool</dt>
                    <dd>{config.cli}</dd>
                  </div>
                </dl>
                <button
                  onClick={() => setCurrentStep('basics')}
                  className="mt-4 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Edit basics →
                </button>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Design</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Inspirations</dt>
                    <dd>{selectedExamples.length} selected</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Creativity</dt>
                    <dd>{config.design.creativity}/10</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Simplicity</dt>
                    <dd>{config.design.simplicity}/10</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Animation</dt>
                    <dd>{config.design.animation}/10</dd>
                  </div>
                </dl>
                <button
                  onClick={() => setCurrentStep('design')}
                  className="mt-4 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Edit design →
                </button>
              </div>
            </div>

            {/* Save Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-2">
                {hasExistingConfig ? 'Save Changes' : 'Ready to build?'}
              </h3>
              <p className="text-neutral-400 mb-6">
                {hasExistingConfig
                  ? 'Your changes will be saved to profile.yaml'
                  : 'Save your config and the AI will start building your portfolio'}
              </p>

          {/* Primary action - Save to Project */}
          <button
            onClick={async () => {
              const yaml = generateYaml();
              try {
                const res = await fetch('/api/save-config', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ yaml })
                });
                if (res.ok) {
                  setShowSuccessModal(true);
                } else {
                  alert('Failed to save. Try Download instead.');
                }
              } catch {
                alert('Failed to save. Try Download instead.');
              }
            }}
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center gap-3 mx-auto"
          >
            <Check size={24} />
            Save to Project
          </button>
          <p className="text-neutral-500 text-sm mt-3">
            This saves directly to your project folder
          </p>

          {/* Secondary action - Download */}
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <button
              onClick={downloadConfig}
              className="text-neutral-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              <Download size={16} />
              Or download file manually
            </button>
          </div>

              {showDownloadHelp && (
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-left">
                  <p className="text-amber-400 font-medium mb-2">Downloaded! Here&apos;s what to do next:</p>
                  <ol className="text-sm text-amber-200/80 space-y-1 list-decimal list-inside">
                    <li>Move <code className="bg-amber-500/20 px-1 rounded">profile.yaml</code> to your Persona project folder</li>
                    <li>Run <code className="bg-amber-500/20 px-1 rounded">./setup.sh</code> in that folder</li>
                    <li>It will automatically detect and use your downloaded config</li>
                  </ol>
                </div>
              )}

            </div>

            {/* Back Button */}
            <div className="flex justify-start mt-8">
              <button
                onClick={() => setCurrentStep('design')}
                className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Back: Design
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
