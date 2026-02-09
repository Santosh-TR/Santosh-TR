# 🧠 Project Context

> **Last Updated**: 2026-01-19  
> **Project**: Portfolio Website (Osmo Clone)  
> **Tech Stack**: Next.js 15, Sanity CMS, TypeScript, GSAP

---

## 🎯 Project Vision

Modern developer portfolio with **futuristic 3D aesthetics**, fully CMS-driven content, and interactive experiences.

**Key Features**:
- 3D hero slider with Sanity images
- Creative skills display (constellation/grid)
- Project showcase
- Contact form
- Dark theme with acid-green accents

---

## 🎨 Design System

### Colors
```css
Primary (Acid):  #D1F840
Background:      #0D0D0D
Text Light:      #F2F2F2
Text Muted:      #999999
Border:          rgba(255,255,255,0.1)
```

### Typography
- **Headings**: Oswald (bold, uppercase)
- **Body**: Inter (clean, readable)
- **Code**: Monospace

### Style
- Futuristic, tech-inspired
- 3D transforms and depth
- Glassmorphism effects
- Smooth GSAP animations
- Dark mode only

---

## 📁 Architecture

### Component Structure
```
components/
├── HeroBlock.tsx          # 3D image slider
├── PageBuilder.tsx        # Dynamic section renderer
└── skills/                # (planned)
    └── SkillConstellation.tsx
```

### Sanity Integration
- **Studio**: `/studio` route
- **Schemas**: `sanity/schemaTypes/`
- **Queries**: `sanity/lib/queries.ts`
- **Images**: Served via `cdn.sanity.io`

### Configuration
- **Theme**: `config/theme.ts` - All design tokens
- **Next.js**: `next.config.ts` - Image domains, etc.
- **CSS**: `app/globals.css` - Global styles

---

## ✅ Completed Features

- [x] Hero block with 3D slider
- [x] Sanity CMS integration
- [x] Image optimization (AVIF)
- [x] Daily log generator
- [x] Theme configuration system
- [x] Local font support setup

---

## 🚧 In Progress

- [ ] Skills section (design chosen, not built)
- [ ] Sanity schema for skills

---

## 📋 Planned Sections

1. **Skills** (Next) - Constellation design
2. **Projects** - Grid with filters
3. **About** - Bio + photo
4. **Contact** - Form integration
5. **Footer** - Links + credits

---

## 🔧 Development Setup

**Commands**:
```bash
npm run dev          # Dev server (:3001)
npm run build        # Production build
node scripts/daily-log.js   # Generate log
```

**Ports**:
- Frontend: 3001
- Sanity Studio: 3001/studio

**Environment**:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=gs9cvl1d
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## 💡 User Preferences

**Likes**:
- Creative, fun designs
- Token-efficient solutions
- Visual demonstrations
- Clear documentation

**Dislikes**:
- Token-heavy browser sessions (use sparingly)
- Verbose explanations
- Placeholder content

**Communication**:
- Technical, concise
- Show via code/visuals
- Token usage transparency

---

## 📊 Performance Targets

- Lighthouse: > 95
- FPS: 60 (animations)
- First Load: < 2s
- Bundle: Keep minimal

---

## 🎯 Design Decisions

| Feature | Choice | Reason |
|---------|--------|--------|
| CMS | Sanity | Flexible, powerful |
| Animations | GSAP | Smooth, professional |
| Styling | Tailwind v4 | Modern, efficient |
| Image Format | AVIF | Best compression |
| Skills Design | Constellation | Unique, 3D theme match |

---

## ⚠️ Important Notes

- Port 3000 often busy (use 3001)
- Git user configured: Santosh TR
- Custom fonts go in `public/fonts/`
- Hero container bg changed to light (#B8FF3C/20)

---

## 🔄 Session Continuation

**To catch up**:
1. Read this file
2. Read `SESSION-HANDOFF.md`
3. Check `task.md` for current status
4. Review `implementation_plan.md` if in planning

**To contribute**:
1. Update this file with new decisions
2. Keep task.md in sync
3. Document breaking changes
4. Note user preferences learned
