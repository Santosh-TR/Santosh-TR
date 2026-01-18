# Osmo Supply Clone - Development Rules

## 1. Codebase Integrity
- **No Deletion**: Never delete existing code unless explicitly instructed or refactoring makes it obsolete.
- **Reference Preservation**: Maintain structure and naming conventions of the cloned site.
- **Comments**: Comment confusing logic, especially in GSAP animations or 3D math.

## 2. Design System
- **Colors**:
  - `osmo-carbon`: #0D0D0D (Backgrounds)
  - `osmo-acid`: #CCFA00 (Accents, Highlights, Cursor)
  - `white`: #FFFFFF (Text)
  - `white/10`: Border colors
- **Typography**:
  - `font-inter`: Main text (Google Fonts Inter)
  - `font-outfit`: Headings (Google Fonts Outfit)
- **Cursor**:
  - Custom SVG/Div cursor (Magnetic effect).
  - "Solid" state on hoverable elements.

## 3. Component Guidelines
- **Hero Section**:
  - **3D Slider**: Uses detailed GSAP rotation and CSS 3D transforms.
  - **Images**: 
    - **Rule**: All images in the Hero Scroll MUST be strict **16:9 Aspect Ratio**.
    - **Resize**: If an image is not 16:9, it must be **resized to fit** (using `object-cover` or explicit crop) to maintain the 16:9 container uniformity.
  - **Layout**: Strict 16:9 Aspect Ratio for Container (1200x675) and Slider (80% width).

## 4. Tech Stack Rules
- **GSAP**: Use `gsap.context` or `useGSAP` hook for React safety.
- **Next.js**: Use `next/image` with `fill` for responsive parents.
- **Tailwind**: Use `clsx` for conditional classes.

## 5. File Structure
- `app/`: Pages and Layouts
- `components/`: Reusable UI blocks
- `sanity/`: CMS Schemas and Config
- `public/`: Static assets (images, fonts)
