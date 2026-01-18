# Implementation Plan - Osmo Supply Clone

## Goal Description
Recreate the website https://www.osmo.supply/ with high visual fidelity and interactive accuracy. This project requires mimicking a Webflow/GSAP heavy site using a modern React stack.

---

## User Review Required
- [x] **Frontend First**: CMS (Sanity) will be implemented *after* the frontend is polished.
- [x] **Container System**: `SectionWrapper` will be a toggleable prop, not enforced globally.
- [ ] **Physics Style**: User needs to select the visual style for Matter.js objects (See below).

> [!IMPORTANT]
> ### The AI Constitution: Strict Rules for Execution
> 
> 1. **Requirement Check Protocol**: Before generating any code, design solutions, or final answers, perform a 'Requirement Check':
>    - **Step 1**: Analyze the request for ambiguity, missing context, or specific constraints (e.g., tech stack, animation style, responsive behavior)
>    - **Step 2**: If any detail is unclear, STOP and ask 3-5 clarifying questions to narrow down the scope
>    - **Step 3**: Only proceed once I have answered these questions or explicitly told you to 'skip'
>    - **Core Principle**: Do not guess my preferences. It is better to ask and get it right than to assume and get it wrong.
> 
> 2. **Stop & Ask**: If complex logic (like the physics engine) loops more than 3 times without working, STOP and ask for user guidance.
> 
> 3. **No Dreaming**: Do not invent content. Use placeholders (Lorem ipsum) only if the actual text cannot be copied, but prefer copying actual copy. Verification of libraries is mandatory before install.
> 
> 4. **The Placeholder Rule**: If an asset (Image/Video) is missing, DO NOT Hallucinate. Create a visible placeholder (Gray Box) with text "IMAGE HERE" or "VIDEO HERE".
> 
> 5. **Modular Construction**: Do not build the entire page in one file. Break down into `components/hero/`, `components/header/`, etc.
> 
> 6. **Aesthetics First**: This is a design-heavy project. If it works but looks ugly, it is a failure. Prioritize CSS/Animation quality.
> 
> 7. **Dynamic By Design**: All content must be editable. Hardcoding text is forbidden.
> 
> 8. **Trust but Verify**: The user is the final design approver.
> 
> 9. **Checkpoints**: After completing the Header and Hero, explicitly ask for User Verification before moving to the Body.

> [!WARNING]
> ### Risk Assessment (Dynamic Architecture)
> - **Animation Continuity**: Dynamic placement disrupts "seamless" transitions between sections. 
>   - *Mitigation*: Self-contained entry/exit animations for each block, or a global layout observer.
> - **Performance Overload**: User may drag too many heavy physics blocks onto one page. 
>   - *Mitigation*: Strict resource cleanup (unmount logic) when components leave the viewport.
> - **Visual Rhythm**: User may place incompatible colors/themes adjacent to each other. 
>   - *Mitigation*: CMS validation or "Auto-Theme" transitions.

---

## Proposed Changes

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Content Backend (CMS)**: Sanity.io (Recommended)
  - *Why?* Provides a real-time "Studio" (backend) where you can drag-and-drop sections to reorder them and edit text fields easily.
- **Styling**: Tailwind CSS (for layout/typography), Custom CSS (for complex effects)
- **Animation**: GSAP (ScrollTrigger, Flip), Lenis (Smooth Scroll)
- **Physics**: Matter.js (for the Hero section falling blocks)

---

### Architecture: The "Box Container" System

To ensure every drag-and-drop section fits perfectly, we will use a **Strict Container Pattern**:

**SectionWrapper.tsx**: The outer "Box". Handles:
- Global Padding (Horizontal/Vertical)
- Max-Width Constraints (The "Container")
- Borders/Separators (The visual "Box" lines)
- Entrance Animations (The "Seams")

**Container Queries**: We will use CSS `@container` so each box adapts to its own size, not just the screen. This makes components truly portable.

---

### Phase 0: Project Setup & CMS Data Modeling

#### [NEW] CMS Configuration
- Setup Sanity Studio (embedded in `/studio` route or separate)
- Schema Definition:
  - `heroParams`: Title, Marquee Text, Physics Config
  - `sectionRegistry`: Array of predefined blocks users can drag/reorder

---

### Phase 1: Header (Configurable)

#### [NEW] Header Component
- Fetch Logo/Links from CMS
- Sticky positioning
- Mix-blend-mode difference
- Center Logo logic

---

### Phase 2: Hero Section (Dynamic)

#### [NEW] Hero Component
- **Canvas Layer**: `MatterScene.tsx` (Physics config editable via CMS)
- **Overlay Layer**: Typography and Marquee (Text editable via CMS)
- Marquee Component

---

### Phase 3: The Physics Hero (Complex Block)

#### [NEW] The Fluid Engine (CSS System)
We will implement the "Mathematical Design" system in `app/globals.css`:
- **Fluid Typography**: Use `clamp()` to scale text smoothly from 992px to 1920px viewports, preventing "tiny buttons on big screens".
- **Animation Personalities**:
  - `--cubic-default`: `cubic-bezier(0.625, 0.05, 0, 1)` for "Premium Slide" (Hover states).
  - `--cubic-bounce`: `linear(...)` (Exact value needed from user) for "Rubber Bounce" (Click/Active states).

#### [NEW] Magnetic Cursor System
- **Global Component**: `<Cursor />` that tracks mouse movement.
- **Magnetic Logic**:
  - Detects elements with `data-cursor` attributes.
  - "Snaps" to element center or transforms shape (e.g., "Previous/Next" arrows).
  
#### [NEW] Physics Slider (Hero Section)
- **Structure**:
  - `HeroBlock.tsx`: The main wrapper.
  - **Slot Machine Icon**: CSS masking trick (`overflow: hidden`) where one icon slides out UP and a new one slides in from BOTTOM.
- **Content**:
  - Project/Product cards as requested.
  - Integration with Sanity CMS for dynamic card data.

####- [ ] **Step 3.4: Matter.js Integration**
  - [ ] Create `components/MatterScene.tsx`
    - [ ] Initialize Engine, Render, World, Runner
    - [ ] Create boundaries (Ground, Walls - Invisible)
    - [ ] Add Objects (Option C: Abstract Shapes)
      - [ ] Acid Green Circles (e.g., 3-4 varied sizes)
      - [ ] White Squares (e.g., 3 mixed sizes)
      - [ ] Black Triangles with White Outline
    - [ ] Add Mouse Constraint for interaction
  - [ ] Integrate into `HeroBlock.tsx` backgrounder to pause simulation when off-screen.

---

### Phase 4: Content Blocks (The Vault & Showcase)

---

## Verification Plan

### Automated Tests
- `npm run build`: Ensure no type errors
- `npm run lint`: Ensure clean code

### Manual Verification
**Visual Check**: Compare `localhost:3000` vs `osmo.supply` side-by-side.

**Interaction Check**:
- Do the physics blocks fall and collide?
- Does the mouse push them away?
- Does the header sticky state work correctly?
- Are the animations smooth (60fps)?
