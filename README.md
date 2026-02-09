# 🚀 Osmo Portfolio Clone

Modern developer portfolio with **3D interactions**, **Sanity CMS**, and **futuristic design**.

![Hero Preview](https://via.placeholder.com/1200x600/0D0D0D/D1F840?text=3D+Hero+Slider)

---

## ✨ Features

- 🎨 **3D Hero Slider** - GSAP-powered with Sanity images
- 📦 **Headless CMS** - Fully managed via Sanity Studio
- ⚡ **Blazing Fast** - Next.js 15 with optimized AVIF images
- 🎯 **Interactive UI** - Constellation skills, hover effects
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Dark Theme** - Acid green (#D1F840) accents

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP
- **Language**: TypeScript
- **Fonts**: Oswald, Inter (Google Fonts)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd osmo-clone

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

### Sanity Studio

Access at [http://localhost:3001/studio](http://localhost:3001/studio)

---

## 📂 Project Structure

```
osmo-clone/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles & theme
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── HeroBlock.tsx     # 3D hero slider
│   └── PageBuilder.tsx   # Dynamic sections
├── sanity/               # Sanity configuration
│   ├── schemaTypes/      # Content schemas
│   └── lib/              # Queries & utilities
├── config/               # App configuration
│   └── theme.ts          # Design tokens
├── scripts/              # Utility scripts
│   └── daily-log.js      # Git-based logger
└── public/               # Static assets
    ├── images/           # Optimized images
    └── fonts/            # Custom fonts
```

---

## 🎨 Customization

### Theme Colors

Edit `app/globals.css`:

```css
--color-osmo-acid: #D1F840;    /* Primary green */
--color-osmo-carbon: #0D0D0D;  /* Background */
--color-osmo-paper: #F2F2F2;   /* Text */
```

See [THEME-GUIDE.md](./THEME-GUIDE.md) for full customization options.

### Adding Content

All content is managed via Sanity Studio:

1. Go to `/studio`
2. Create/edit content
3. Publish changes
4. Frontend auto-updates (ISR)

---

## 📜 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Utility scripts
node scripts/daily-log.js           # Generate daily log
node scripts/convert-images.js      # Convert images to AVIF
```

---

## 🎯 Features Roadmap

- [x] Hero block with Sanity integration
- [x] Image optimization system
- [x] Theme configuration
- [ ] Skills section (Constellation)
- [ ] Projects showcase
- [ ] About section
- [ ] Contact form
- [ ] Footer
- [ ] SEO optimization
- [ ] Analytics integration

---

## 📚 Documentation

- [THEME-GUIDE.md](./THEME-GUIDE.md) - Theme customization
- [LOCAL-FONTS-GUIDE.md](./LOCAL-FONTS-GUIDE.md) - Custom fonts setup
- [PROJECT-CONTEXT.md](./PROJECT-CONTEXT.md) - Development context
- [SESSION-HANDOFF.md](./SESSION-HANDOFF.md) - Latest session notes

---

## 🤝 Development Notes

### Adding New Sections

1. Create component in `components/`
2. Add Sanity schema in `sanity/schemaTypes/`
3. Update `PageBuilder.tsx` registry
4. Test with sample content
5. Deploy!

### Image Optimization

Use the converter for best performance:

```bash
node scripts/convert-images.js
# Follow prompts to convert PNG → AVIF
```

### Daily Logs

Track your progress:

```bash
# Manual
node scripts/daily-log.js

# Or double-click
./Daily Log.bat
```

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Dev server auto-uses 3001 if 3000 is busy
# Or manually kill the process
```

**Sanity images not loading?**
- Check `next.config.ts` has `cdn.sanity.io` configured
- Verify environment variables
- Check Sanity Studio has published content

**Fonts not applying?**
- See [LOCAL-FONTS-GUIDE.md](./LOCAL-FONTS-GUIDE.md)
- Verify font files in `public/fonts/`

---

## 📄 License

MIT License - feel free to use for your own portfolio!

---

## 🌟 Credits

Built with ❤️ using modern web technologies.

**Inspired by**: Osmo's premium design aesthetic  
**Powered by**: Next.js, Sanity, GSAP  
**Created by**: Santosh TR
