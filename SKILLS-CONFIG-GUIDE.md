# 🎨 Skills Section - Quick Edit Guide

## 📁 Configuration File
**Location**: `config/skills-config.ts`

This file contains **all customizable parameters** for the Skills Constellation.

---

## ⚡ Quick Edits

### Change Section Title
```typescript
sectionTitle: 'MY TECH STACK',  // Your custom title
sectionSubtitle: 'Click to learn more',
```

### Adjust Node Sizes
```typescript
nodes: {
  minSize: 60,   // Smallest skill node
  maxSize: 100,  // Largest skill node (100% proficiency)
}
```

### Change Colors
```typescript
nodes: {
  backgroundColor: '#1A1A1A',  // Dark node background
  activeBorder: '#D1F840',     // Acid green highlight
}
```

### Disable Animations
```typescript
animations: {
  floating: {
    enabled: false,  // Turn off floating
  }
}
```

### Adjust Layout
```typescript
layout: {
  circularRadius: 35,  // Increase for wider spread (0-50%)
  maxWidth: '1200px',  // Container width
}
```

---

## 🎯 Common Changes

| What to Change | Config Property | Example |
|---|---|---|
| Title text | `sectionTitle` | `'MY SKILLS'` |
| Node spacing | `layout.circularRadius` | `40` (wider) |
| Hover scale | `animations.hover.scale` | `1.3` (bigger) |
| Primary color | `nodes.activeBorder` | `'#FF00FF'` (pink) |
| Connection lines | `connections.strokeColor` | `'rgba(255,0,255,0.3)'` |
| Mobile node size | `responsive.mobile.nodeMaxSize` | `70` |

---

## 🔧 How to Apply Changes

1. Edit `config/skills-config.ts`
2. Import in component:
   ```tsx
   import SKILLS_CONFIG from '@/config/skills-config';
   ```
3. Use the values:
   ```tsx
   <h2>{SKILLS_CONFIG.sectionTitle}</h2>
   ```
4. Save - hot reload applies changes!

---

## 📝 Next Steps

**To connect config to component**:
1. Open `components/skills/SkillConstellation.tsx`
2. Import: `import SKILLS_CONFIG from '@/config/skills-config'`
3. Replace hard-coded values with config values
4. Test changes

**Want me to connect the config file to the component now?**
