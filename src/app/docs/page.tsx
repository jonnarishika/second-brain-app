'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('architecture');

  const sections = [
    { id: 'architecture', label: 'Portable Architecture', icon: '' },
    { id: 'ux', label: 'UX Principles', icon: '' },
    { id: 'agent', label: 'Agent Thinking', icon: '' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="border-b border-[#E5E1D8] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-[20px] font-normal text-[#1A1A1A]">
            Second Brain
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Home
            </Link>
            <Link href="/dashboards" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Dashboard
            </Link>
            <Link href="/developer" className="text-[15px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Developer API
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Title Section */}
        <div className="mb-16">
          <div className="inline-block px-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-[13px] text-[#6B6B6B] font-light mb-6">
            Technical Documentation
          </div>
          <h1 className="text-[56px] font-normal text-[#1A1A1A] mb-4">
            Architecture & Design
          </h1>
          <p className="text-[17px] text-[#6B6B6B] font-light max-w-3xl">
            A deep dive into the architectural principles, design philosophy, and infrastructure decisions that power Second Brain.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E1D8] rounded-[20px] p-6 sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-[12px] text-[15px] transition-all ${
                      activeSection === section.id
                        ? 'bg-[#1A1A1A] text-[#FDFCFA]'
                        : 'text-[#6B6B6B] hover:bg-[#F5F3EF]'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* SECTION 1: PORTABLE ARCHITECTURE */}
            {activeSection === 'architecture' && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h2 className="text-[36px] font-normal text-[#1A1A1A] mb-6">
                     Portable Architecture
                  </h2>
                  <p className="text-[17px] text-[#6B6B6B] font-light mb-8 leading-relaxed">
                    Second Brain is built with a clean separation of concerns, making it easy to swap out any component without affecting the rest of the system. Every layer is independent, testable, and replaceable.
                  </p>

                  {/* Layer Breakdown */}
                  <div className="space-y-6">
                    <div className="border-l-4 border-[#1A1A1A] pl-6">
                      <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-2">
                        1. Presentation Layer
                      </h3>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Technology:</strong> Next.js 14 with App Router, React, Tailwind CSS, Framer Motion
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Portability:</strong> Pure React components with zero business logic. Could be replaced with Vue, Svelte, or vanilla JS without touching the API layer.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4 mt-3">
                        <code className="text-[13px] font-mono text-[#1A1A1A]">
                          /app/page.tsx → Landing page<br/>
                          /app/dashboards/page.tsx → Dashboard<br/>
                          /app/add/page.tsx → Knowledge capture form
                        </code>
                      </div>
                    </div>

                    <div className="border-l-4 border-[#1A1A1A] pl-6">
                      <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-2">
                        2. API Layer
                      </h3>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Technology:</strong> Next.js API Routes (serverless functions)
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Portability:</strong> RESTful endpoints that could be migrated to Express, FastAPI, or any backend framework. All business logic lives here, not in components.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4 mt-3">
                        <code className="text-[13px] font-mono text-[#1A1A1A]">
                          /api/items/route.ts → CRUD operations<br/>
                          /api/ai/summarize/route.ts → AI summarization<br/>
                          /api/ai/tags/route.ts → Auto-tagging<br/>
                          /api/public/brain/query/route.ts → Public API
                        </code>
                      </div>
                    </div>

                    <div className="border-l-4 border-[#1A1A1A] pl-6">
                      <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-2">
                        3. Service Layer
                      </h3>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Technology:</strong> Modular service functions in /lib
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Portability:</strong> Pure TypeScript functions with no framework dependencies. Can be imported anywhere or extracted to microservices.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4 mt-3">
                        <code className="text-[13px] font-mono text-[#1A1A1A]">
                          /lib/ai.ts → AI processing logic<br/>
                          /lib/db.ts → Database client<br/>
                          /lib/prisma.ts → ORM configuration
                        </code>
                      </div>
                    </div>

                    <div className="border-l-4 border-[#1A1A1A] pl-6">
                      <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-2">
                        4. Data Layer
                      </h3>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Technology:</strong> PostgreSQL via Prisma ORM
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Portability:</strong> Prisma schema can target PostgreSQL, MySQL, MongoDB, or SQLite. Migration takes minutes, not days.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4 mt-3">
                        <code className="text-[13px] font-mono text-[#1A1A1A]">
                          /prisma/schema.prisma → Data model<br/>
                          Database: Neon PostgreSQL (serverless)<br/>
                          Can swap to: Supabase, Railway, PlanetScale
                        </code>
                      </div>
                    </div>

                    <div className="border-l-4 border-[#1A1A1A] pl-6">
                      <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-2">
                        5. AI Provider Layer
                      </h3>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Technology:</strong> Hugging Face Inference API
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-3">
                        <strong>Portability:</strong> Abstracted behind service functions. Swappable with OpenAI, Anthropic, or Google Gemini by changing one config file.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4 mt-3">
                        <code className="text-[13px] font-mono text-[#1A1A1A]">
                          Current: Hugging Face (facebook/bart-large-cnn)<br/>
                          Easy swap to: OpenAI GPT-4, Claude 3, Gemini<br/>
                          Interface: /lib/ai.ts exports async functions
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Architecture Diagram */}
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-6">
                    System Architecture Diagram
                  </h3>
                  <div className="bg-[#F5F3EF] rounded-[16px] p-8 font-mono text-[13px] text-[#1A1A1A]">
                    <pre className="whitespace-pre">
{`┌─────────────────────────────────────────────────┐
│           PRESENTATION LAYER                    │
│  Next.js + React + Tailwind + Framer Motion     │
│  (/app/*, components, hooks)                    │
└─────────────────┬───────────────────────────────┘
                  │
                  │ HTTP/JSON
                  ▼
┌─────────────────────────────────────────────────┐
│              API LAYER                          │
│        Next.js API Routes                       │
│  /api/items, /api/ai/*, /api/public/*          │
└─────────────────┬───────────────────────────────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
┌──────────────────┐  ┌──────────────────┐
│  SERVICE LAYER   │  │   AI PROVIDER    │
│   /lib/*.ts      │  │  Hugging Face    │
│  Business Logic  │  │  (Swappable)     │
└────────┬─────────┘  └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│              DATA LAYER                         │
│         PostgreSQL (Neon)                       │
│         Prisma ORM                              │
└─────────────────────────────────────────────────┘`}
                    </pre>
                  </div>
                </div>

                {/* Why This Matters */}
                <div className="bg-[#1A1A1A] text-[#FDFCFA] rounded-[24px] p-10">
                  <h3 className="text-[24px] font-normal mb-4">
                     Why Portable Architecture Matters
                  </h3>
                  <ul className="space-y-3 text-[15px] font-light">
                    <li>• <strong>Future-proof:</strong> Technology changes, but good architecture doesn't</li>
                    <li>• <strong>Testable:</strong> Each layer can be tested independently</li>
                    <li>• <strong>Scalable:</strong> Swap PostgreSQL for MongoDB without rewriting frontend</li>
                    <li>• <strong>Team-friendly:</strong> Frontend, backend, and data teams work independently</li>
                    <li>• <strong>Cost-effective:</strong> Move to cheaper providers without rebuilding</li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION 2: UX PRINCIPLES */}
            {activeSection === 'ux' && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h2 className="text-[36px] font-normal text-[#1A1A1A] mb-6">
                     Principles-Based UX Design
                  </h2>
                  <p className="text-[17px] text-[#6B6B6B] font-light mb-8 leading-relaxed">
                    Second Brain's interface follows five core design principles that guide every interaction, animation, and visual decision. These aren't arbitrary—they're the foundation of a calm, intelligent user experience.
                  </p>

                  {/* Principle 1 */}
                  <div className="mb-12">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          1. Calm Technology
                        </h3>
                        <p className="text-[15px] text-[#6B6B6B] font-light italic mb-3">
                          "The best technology is invisible until you need it"
                        </p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-3">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Philosophy:</strong> AI processing happens silently in the background. No loading spinners, no "AI is thinking" messages—just instant results when you need them.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Implementation:</strong> Summarization and auto-tagging run server-side during save. Users see results immediately, not progress bars.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4">
                        <p className="text-[14px] text-[#1A1A1A] mb-2"><strong>Example:</strong></p>
                        <p className="text-[13px] text-[#6B6B6B]">
                          When you save a note, AI summary and tags appear instantly—no "Generating..." states. The work happened, you just don't see it happening.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Principle 2 */}
                  <div className="mb-12">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          2. Progressive Disclosure
                        </h3>
                        <p className="text-[15px] text-[#6B6B6B] font-light italic mb-3">
                          "Show what's needed, hide what's not"
                        </p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-3">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Philosophy:</strong> Complex features reveal themselves progressively. New users see simple interfaces; power users discover advanced capabilities over time.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Implementation:</strong> Dashboard starts with basic search. Filters slide in when needed. Tags appear on hover. API documentation is a separate page, not cluttering the main interface.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4">
                        <p className="text-[14px] text-[#1A1A1A] mb-2"><strong>Example:</strong></p>
                        <p className="text-[13px] text-[#6B6B6B]">
                          Dashboard cards show title and type. Hover reveals tags and summary. Click reveals full content. Information unfolds as you need it.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Principle 3 */}
                  <div className="mb-12">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          3. Aesthetic Minimalism
                        </h3>
                        <p className="text-[15px] text-[#6B6B6B] font-light italic mb-3">
                          "Every pixel serves a purpose"
                        </p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-3">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Philosophy:</strong> Inspired by Anthropic's Claude interface—warm colors, generous spacing, subtle animations. Beauty through restraint, not decoration.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Implementation:</strong> Warm beige (#F5F3EF) background, soft borders (#E5E1D8), 20-24px rounded corners. No gradients, no shadows except on hover, no unnecessary ornamentation.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4">
                        <p className="text-[14px] text-[#1A1A1A] mb-2"><strong>Color Palette:</strong></p>
                        <div className="flex gap-2 mt-2">
                          <div className="w-16 h-16 rounded-[8px] bg-[#F5F3EF] border border-[#E5E1D8]"></div>
                          <div className="w-16 h-16 rounded-[8px] bg-[#1A1A1A]"></div>
                          <div className="w-16 h-16 rounded-[8px] bg-white border border-[#E5E1D8]"></div>
                          <div className="w-16 h-16 rounded-[8px] bg-[#6B6B6B]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Principle 4 */}
                  <div className="mb-12">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          4. Intentional Motion
                        </h3>
                        <p className="text-[15px] text-[#6B6B6B] font-light italic mb-3">
                          "Animation guides attention, doesn't distract"
                        </p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-3">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Philosophy:</strong> Every animation has a purpose. Parallax creates depth, hover states provide feedback, transitions guide the eye between states.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Implementation:</strong> Framer Motion powers landing page parallax. Cards lift 8px on hover. Buttons scale to 1.05x. All transitions use cubic-bezier easing for natural feel.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4">
                        <p className="text-[14px] text-[#1A1A1A] mb-2"><strong>Animation Rules:</strong></p>
                        <ul className="text-[13px] text-[#6B6B6B] space-y-1">
                          <li>• Hover states: 0.3s duration</li>
                          <li>• Page transitions: 0.6s with stagger</li>
                          <li>• Micro-interactions: 0.2s for instant feedback</li>
                          <li>• Parallax: Scrolls at 50% speed of viewport</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Principle 5 */}
                  <div className="mb-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          5. Intelligent Defaults
                        </h3>
                        <p className="text-[15px] text-[#6B6B6B] font-light italic mb-3">
                          "Make the right thing the easy thing"
                        </p>
                      </div>
                    </div>
                    <div className="pl-16 space-y-3">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Philosophy:</strong> The system makes smart assumptions so users do less work. AI fills in tags, suggests types, and handles organization automatically.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Implementation:</strong> When adding a URL, type auto-sets to "link". AI generates 3-5 relevant tags automatically. Search ranks by relevance, not recency.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-4">
                        <p className="text-[14px] text-[#1A1A1A] mb-2"><strong>Example:</strong></p>
                        <p className="text-[13px] text-[#6B6B6B]">
                          Paste a recipe → System detects it's food content → Auto-tags: "recipe", "cooking", "food" → User just clicks save. Zero friction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design System */}
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-6">
                    Design System Tokens
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[16px] font-normal text-[#1A1A1A] mb-3">Typography</h4>
                      <div className="space-y-2 text-[14px] text-[#6B6B6B]">
                        <div>Hero: 72px, weight 400</div>
                        <div>H1: 56px, weight 400</div>
                        <div>H2: 36px, weight 400</div>
                        <div>Body: 15-17px, weight 300</div>
                        <div>Caption: 13-14px, weight 300</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-normal text-[#1A1A1A] mb-3">Spacing</h4>
                      <div className="space-y-2 text-[14px] text-[#6B6B6B]">
                        <div>Section padding: 80-120px</div>
                        <div>Card padding: 32-40px</div>
                        <div>Element gap: 16-24px</div>
                        <div>Border radius: 20-24px</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: AGENT THINKING */}
            {activeSection === 'agent' && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h2 className="text-[36px] font-normal text-[#1A1A1A] mb-6">
                     Agent Thinking: Self-Improving Systems
                  </h2>
                  <p className="text-[17px] text-[#6B6B6B] font-light mb-8 leading-relaxed">
                    Second Brain doesn't just store knowledge—it actively works to make itself more useful over time. Every interaction teaches the system something new, every note improves organization automatically.
                  </p>

                  {/* Agent 1: Auto-Tagging */}
                  <div className="mb-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          Agent 1: Intelligent Auto-Tagging
                        </h3>
                      </div>
                    </div>
                    <div className="pl-16 space-y-4">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>How it works:</strong> When you save content, AI analyzes the text and automatically generates 3-5 relevant tags based on topics, themes, and entities it detects.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Why it's "agent thinking":</strong> The system learns patterns from your content and creates organizational structure without manual effort. Over time, consistent tags emerge, making search and filtering more powerful.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-6">
                        <p className="text-[14px] text-[#1A1A1A] font-normal mb-3">Example Flow:</p>
                        <div className="space-y-2 text-[13px] text-[#6B6B6B] font-mono">
                          <div>1. User saves: "How to implement OAuth in Next.js"</div>
                          <div>2. AI detects: authentication, web development, security</div>
                          <div>3. System tags: ["nextjs", "oauth", "authentication", "security"]</div>
                          <div>4. Future searches for "security" surface this note</div>
                        </div>
                      </div>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Maintenance benefit:</strong> As your knowledge base grows, tagging remains consistent. No "authentication" vs "auth" confusion—AI normalizes terminology automatically.
                      </p>
                    </div>
                  </div>

                  {/* Agent 2: Smart Summarization */}
                  <div className="mb-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          Agent 2: Context-Aware Summarization
                        </h3>
                      </div>
                    </div>
                    <div className="pl-16 space-y-4">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>How it works:</strong> AI generates concise 2-3 sentence summaries that capture the essence of your notes. Special handling for recipes, code snippets, and technical content.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Why it's "agent thinking":</strong> Summaries improve discoverability. You can scan 100 notes in seconds instead of reading full content. The system makes your knowledge more accessible without you lifting a finger.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-6">
                        <p className="text-[14px] text-[#1A1A1A] font-normal mb-3">Intelligence in Action:</p>
                        <ul className="space-y-2 text-[13px] text-[#6B6B6B]">
                          <li>• <strong>Recipe detected:</strong> "A recipe for making tacos with filling, toppings, and assembly instructions"</li>
                          <li>• <strong>Technical note:</strong> "Implementation guide for JWT authentication in Express.js with bcrypt hashing"</li>
                          <li>• <strong>Meeting notes:</strong> "Quarterly planning discussion: Q2 priorities, budget allocation, team expansion"</li>
                        </ul>
                      </div>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Maintenance benefit:</strong> Even months later, you'll know what a note contains from the summary. No re-reading 500-word notes to find what you need.
                      </p>
                    </div>
                  </div>

                  {/* Agent 3: Semantic Search */}
                  <div className="mb-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          Agent 3: Relevance-Ranked Search
                        </h3>
                      </div>
                    </div>
                    <div className="pl-16 space-y-4">
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>How it works:</strong> Search doesn't just match keywords—it ranks results by relevance. Matches in titles score higher than matches in content. Multiple keyword matches boost relevance further.
                      </p>
                      <p className="text-[15px] text-[#6B6B6B] font-light">
                        <strong>Why it's "agent thinking":</strong> The system learns what you actually want, not just what you typed. It surfaces the most relevant results first, making your knowledge base feel like it "knows" what you need.
                      </p>
                      <div className="bg-[#F5F3EF] rounded-[12px] p-6">
                        <p className="text-[14px] text-[#1A1A1A] font-normal mb-3">Relevance Scoring:</p>
                        <div className="space-y-2 text-[13px] text-[#6B6B6B] font-mono">
                          <div>Title match: +10 points</div>
                          <div>Summary match: +5 points</div>
                          <div>Tag match: +3 points</div>
                          <div>Content match: +1 point</div>
                          <div className="pt-2 border-t border-[#E5E1D8]">
                            Search "authentication" → "OAuth Guide" (title) ranks above "API Tutorial" (content mention)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Future Agents */}
                  <div className="mb-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[40px]"></div>
                      <div>
                        <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-2">
                          Future Agent Capabilities
                        </h3>
                      </div>
                    </div>
                    <div className="pl-16">
                      <p className="text-[15px] text-[#6B6B6B] font-light mb-4">
                        The architecture supports these agent enhancements without refactoring:
                      </p>
                      <ul className="space-y-3 text-[15px] text-[#6B6B6B] font-light">
                        <li>• <strong>Related Note Suggestions:</strong> "People who found this note useful also referenced..."</li>
                        <li>• <strong>Auto-Linking:</strong> Detect when new notes reference existing concepts and create connections</li>
                        <li>• <strong>Knowledge Gaps:</strong> AI identifies topics you search for but don't have notes about</li>
                        <li>• <strong>Periodic Summaries:</strong> Weekly digest of your most-accessed knowledge areas</li>
                        <li>• <strong>Stale Content Detection:</strong> Flag outdated information based on timestamps and new entries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Agent Philosophy */}
                <div className="bg-[#1A1A1A] text-[#FDFCFA] rounded-[24px] p-10">
                  <h3 className="text-[24px] font-normal mb-4">
                     The Agent Mindset
                  </h3>
                  <p className="text-[15px] font-light mb-4">
                    Traditional apps require constant manual maintenance—tagging, organizing, cleaning up. Second Brain agents work while you sleep:
                  </p>
                  <ul className="space-y-2 text-[15px] font-light">
                    <li>• Your knowledge base becomes <strong>more organized</strong> as it grows</li>
                    <li>• Search gets <strong>smarter</strong> with every query</li>
                    <li>• Connections emerge <strong>automatically</strong> between related concepts</li>
                    <li>• The system <strong>maintains itself</strong>—no weekly cleanup required</li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION 4: INFRASTRUCTURE */}
            {activeSection === 'infrastructure' && (
              <div className="space-y-8">
                <div className="bg-white border border-[#E5E1D8] rounded-[24px] p-10">
                  <h2 className="text-[36px] font-normal text-[#1A1A1A] mb-6">
                    🔌 Infrastructure as a Product
                  </h2>
                  <p className="text-[17px] text-[#6B6B6B] font-light mb-8 leading-relaxed">
                    Second Brain isn't just an app—it's infrastructure. The same intelligence powering the dashboard is exposed through a public API, enabling integration with external systems, automation workflows, and custom interfaces.
                  </p>

                  {/* Public API */}
                  <div className="mb-10">
                    <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-4">
                      Public API Endpoint
                    </h3>
                    <p className="text-[15px] text-[#6B6B6B] font-light mb-4">
                      Anyone can query your knowledge base programmatically via REST API. No authentication required for public queries—knowledge should be accessible.
                    </p>
                    <div className="bg-[#F5F3EF] rounded-[16px] p-6 mb-4">
                      <p className="text-[14px] text-[#1A1A1A] font-normal mb-3">Endpoint:</p>
                      <code className="text-[13px] font-mono text-[#1A1A1A]">
                        GET /api/public/brain/query?q=searchTerm&limit=10&type=note
                      </code>
                    </div>
                    <div className="bg-[#F5F3EF] rounded-[16px] p-6">
                      <p className="text-[14px] text-[#1A1A1A] font-normal mb-3">Response:</p>
                      <pre className="text-[12px] font-mono text-[#6B6B6B] overflow-x-auto">
{`{
  "query": "authentication",
  "answer": "Found 3 relevant items about 'authentication'...",
  "totalResults": 3,
  "results": [
    {
      "id": "uuid",
      "title": "OAuth Implementation Guide",
      "summary": "Step-by-step OAuth 2.0 setup...",
      "tags": ["oauth", "security", "auth"],
      "type": "note",
      "createdAt": "2026-02-08T10:30:00.000Z",
      "relevance": 0.95
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-10">
                    <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-4">
                      Infrastructure Use Cases
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-[#1A1A1A] pl-6">
                        <h4 className="text-[17px] font-normal text-[#1A1A1A] mb-2">
                          1. Slack Bot Integration
                        </h4>
                        <p className="text-[14px] text-[#6B6B6B] font-light">
                          Team members type <code>/brain search authentication</code> in Slack → Bot queries your API → Results appear in channel. Your personal knowledge becomes team infrastructure.
                        </p>
                      </div>

                      <div className="border-l-4 border-[#1A1A1A] pl-6">
                        <h4 className="text-[17px] font-normal text-[#1A1A1A] mb-2">
                          2. Personal Website Widget
                        </h4>
                        <p className="text-[14px] text-[#6B6B6B] font-light">
                          Embed search on your blog: <code>&lt;iframe src="your-brain.com/widget"&gt;&lt;/iframe&gt;</code> → Readers query your knowledge directly from your site.
                        </p>
                      </div>

                      <div className="border-l-4 border-[#1A1A1A] pl-6">
                        <h4 className="text-[17px] font-normal text-[#1A1A1A] mb-2">
                          3. Automation Workflows
                        </h4>
                        <p className="text-[14px] text-[#6B6B6B] font-light">
                          Zapier/Make.com: Trigger → Query brain → Get answer → Post to Discord/Email/Notion. Build custom workflows on top of your knowledge.
                        </p>
                      </div>

                      <div className="border-l-4 border-[#1A1A1A] pl-6">
                        <h4 className="text-[17px] font-normal text-[#1A1A1A] mb-2">
                          4. Mobile Apps
                        </h4>
                        <p className="text-[14px] text-[#6B6B6B] font-light">
                          Build iOS/Android apps that consume your brain's API. Same backend, different interface. True separation of data and presentation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="mb-10">
                    <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-4">
                      Technical Implementation
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-[#F5F3EF] rounded-[16px] p-6">
                        <h4 className="text-[16px] font-normal text-[#1A1A1A] mb-3">
                          API Features
                        </h4>
                        <ul className="space-y-2 text-[14px] text-[#6B6B6B]">
                          <li>• Full-text search across all fields</li>
                          <li>• Type filtering (note/link/insight)</li>
                          <li>• Configurable result limits</li>
                          <li>• Relevance scoring</li>
                          <li>• Natural language answers</li>
                          <li>• JSON response format</li>
                        </ul>
                      </div>

                      <div className="bg-[#F5F3EF] rounded-[16px] p-6">
                        <h4 className="text-[16px] font-normal text-[#1A1A1A] mb-3">
                          Infrastructure Benefits
                        </h4>
                        <ul className="space-y-2 text-[14px] text-[#6B6B6B]">
                          <li>• No authentication needed</li>
                          <li>• CORS-enabled for web apps</li>
                          <li>• Rate-limit ready (future)</li>
                          <li>• Cached responses (future)</li>
                          <li>• Versioned endpoints</li>
                          <li>• Self-documenting (/developer)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Developer Experience */}
                  <div className="mb-0">
                    <h3 className="text-[24px] font-normal text-[#1A1A1A] mb-4">
                      Developer Experience
                    </h3>
                    <p className="text-[15px] text-[#6B6B6B] font-light mb-4">
                      We built an interactive documentation page at <code>/developer</code> where you can:
                    </p>
                    <ul className="space-y-2 text-[15px] text-[#6B6B6B] font-light mb-6">
                      <li>• Test queries in the browser without writing code</li>
                      <li>• See example requests and responses</li>
                      <li>• Copy working code snippets</li>
                      <li>• Understand parameters and response formats</li>
                    </ul>
                    <Link 
                      href="/developer"
                      className="inline-block px-6 py-3 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] rounded-full hover:bg-[#2D2D2D] transition-all"
                    >
                      Try the API →
                    </Link>
                  </div>
                </div>

                {/* Infrastructure Philosophy */}
                <div className="bg-[#1A1A1A] text-[#FDFCFA] rounded-[24px] p-10">
                  <h3 className="text-[24px] font-normal mb-4">
                     Infrastructure Thinking
                  </h3>
                  <p className="text-[15px] font-light mb-4">
                    Great products become platforms. By exposing Second Brain's intelligence through APIs:
                  </p>
                  <ul className="space-y-2 text-[15px] font-light">
                    <li>• <strong>Extensibility:</strong> Others can build on your knowledge without asking permission</li>
                    <li>• <strong>Longevity:</strong> Even if the web UI changes, the API contract persists</li>
                    <li>• <strong>Composability:</strong> Your brain becomes a building block in larger systems</li>
                    <li>• <strong>Value multiplication:</strong> One knowledge base → infinite interfaces</li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block px-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-[13px] text-[#6B6B6B] font-light mb-6">
            Ready to explore?
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboards"
              className="px-8 py-3 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-300"
            >
              View Dashboard
            </Link>
            <Link
              href="/developer"
              className="px-8 py-3 bg-white border border-[#E5E1D8] text-[#1A1A1A] text-[15px] font-normal rounded-full hover:border-[#1A1A1A] transition-all duration-300"
            >
              Try the API
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}