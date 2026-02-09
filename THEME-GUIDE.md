# 🎨 Complete Theme Parameter Guide

Here is the master list of everything you can change in `config/theme.ts`.

## 1. 🖌️ Colors (`theme.ts` lines 11-41)
| Parameter | Current Value | Description |
|---|---|---|
| `colors.primary` | `#B8FF3C` | **Main Acid Green** accent color. |
| `colors.background.dark` | `#EDEDED` | Main page background. |
| `colors.background.carbon` | `#0a0a0a` | Slightly darker, used for depth. |
| `colors.text.primary` | `#FFFFFF` | Main headings and text. |
| `colors.text.secondary` | `#CCCCCC` | Subtitles and distinct text. |
| `colors.text.muted` | `#999999` | Low-priority text. |
| `colors.border.accent` | `#B8FF3C` | Glowing borders (Acid Green). |

## 2. 🔡 Typography (`theme.ts` lines 46-73)
| Parameter | Current Value | Description |
|---|---|---|
| `fonts.heading` | `Oswald` | Big, bold titles. |
| `fonts.body` | `system-ui` | Regular reading text. |
| `fonts.sizes` | `xs` to `5xl` | Font sizes in pixels. |

## 3. 🖼️ Hero Slider Settings (`theme.ts` lines 78-113)
| Parameter | Current Value | Description |
|---|---|---|
| `slideCount` | `5` | Number of slides to show. |
| `animationDuration` | `0.8` | Speed of the 3D spin (seconds). |
| `perspective` | `3000px` | 3D depth intensity (Lower = More distorted). |
| `angleStep` | `72` | Separation between images (360 / count). |
| `containerHeightRatio` | `0.8` | Height relative to the 80% container. |
| `borderRadius` | `40px` | Roundness of the main slider box. |
| `pagination.activeColor` | `#B8FF3C` | Color of the active dot. |

## 4. ✨ Effects & Features (`theme.ts` lines 118-127)
True/False toggles to turn features on or off.

| Toggle | Default | Effect |
|---|---|---|
| `dynamicGradientBackground` | `false` | Changing background colors? |
| `reflectionEffect` | `true` | Glossy reflection on images. |
| `ambientParticles` | `false` | Floating dust particles (Performance heavy). |
| `edgeVignetteGlow` | `false` | Dark glow around the edges. |
| `hapticFeedback` | `false` | Vibration on mobile spin? |

## 5. 📐 Layout & Spacing (`theme.ts` lines 132-138)
| Parameter | Current Value | Description |
|---|---|---|
| `sectionPaddingTop` | `120px` | Space below the header. |
| `maxContentWidth` | `1920px` | Max width of the site content. |
| `gridGutter` | `24px` | Space between grid columns. |

---

## 🚀 How to Edit
1. Open `config/theme.ts`.
2. Change any value (e.g. `#B8FF3C` to `#FF5733`).
3. Save. The site updates instantly.
