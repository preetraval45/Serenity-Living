## AI Controller — Serenity Living (Future Integration)

This document outlines a forward-looking plan to integrate AI-powered features into Serenity Living’s website and services.

### Purpose
- **Assistive Services**: Provide a helpful guide for prospective residents and families to navigate care options (Assisted Living, Memory Care, Rehabilitation, etc.).
- **Family Chatbot**: Offer a friendly assistant to answer common questions (availability, visiting hours, pricing guidance, care levels) and triage to staff when needed.
- **Accessibility Support**: Enable voice-first and simplified reading options for senior users and caregivers.

### Capabilities (Planned)
- Conversational Q&A grounded in site content and official documents
- Intake assistance (collect basic info, preferred contact) with human handoff
- Appointment request workflow with calendar integration (staff-facing review)
- Resource recommendations (services, activities, FAQs)

### Memory & Behavior Management
- Maintain a short-term conversation memory per session for continuity
- Store only minimal, necessary data with explicit user consent
- Reset memory on sensitive-topic boundaries (health/financial)
- Provide clear controls: “clear chat,” “export summary,” and consent prompts
- Follow a tone guide: empathetic, clear, and calm; avoid medical diagnosis

### Safety & Compliance
- Do not provide medical advice; instead, offer supportive information and direct to clinicians
- Respect privacy: no PHI storage without explicit consent; purge transient data frequently
- Log only anonymized events for quality improvement; opt-out available

### Data & Tooling (Future)
- Retrieval from approved content: services pages, PDFs, policy docs
- Optional integrations: scheduling API, CRM/Email, analytics with consent
- Observability: redaction filters, audit logs for staff reviews

### Configuration & Keys (Placeholder)
Create a `.env` file (not committed) for API keys and settings:
```
AI_PROVIDER=openai
AI_MODEL=gpt-4o
AI_API_KEY=YOUR_API_KEY
RAG_INDEX_URL=https://example.com/index
``` 
Load and validate at server startup; fail fast if missing. Use per-environment overrides.

### UX Guidelines
- Always show fallback contact paths (phone, email) alongside AI suggestions
- Reduce cognitive load: concise answers, large touch targets, readable font sizes
- Explain limitations transparently and ask permission before using personal data

### Roadmap
1. MVP chatbot with FAQ and contact capture
2. Add retrieval over services and policy docs
3. Scheduling request workflow + staff dashboard triage
4. Accessibility upgrades (voice input/output, larger presets)


### Business Memory (Current)

- Company Name: Serenity Living Of Lexington
- Address: 120 Rice Dr, Gilbert, SC 29054 (Lexington County, South Carolina)
- Email: serenitylivingoflexington@gmail.com
- Phone: (855) 555-1234

### Website UX/Brand Preferences (Current)

- Theme: Single light theme using shades of dark blue for backgrounds; white header and footer.
- Remove theme toggler (no dark-mode switch shown to users).
- Hero: Show a single "COMING SOON" headline, include company mark (logo + “Serenity Living Of Lexington”), larger logo, and confetti overlay background. No 3D models.
- Navigation: Brand at left; page links right-aligned with comfortable spacing.
- About & Services: Richer copy; avoid years-of-experience stats/counters (new business).
- Gallery: Flip-card hover to reveal descriptive captions; responsive 1→2→3→4 column grid.
- Contact: Quick actions (Call, Email, Schedule a Tour); embedded Google Map; fields for name, email, optional phone, inquiry type, message; consent checkbox; inline validation.
- Responsiveness: Fluid typography, clamp-based logo/text sizing, earlier 2-column shifts, back-to-top button, sticky header shadow, active nav highlighting.

### Assistant Behavior Notes (Applied)

- Tone: Empathetic, clear, and calm; do not imply legacy experience metrics.
- Prefer concise guidance and strong a11y (focus rings, large touch targets, readable sizes).
- Always surface real contact paths (call/email) alongside any AI/chat guidance.
