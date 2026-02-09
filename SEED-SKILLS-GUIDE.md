# 🌱 Skills Seed Script

## Quick Setup

### 1. Get Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project: **osmo-clone**
3. Click **API** → **Tokens**
4. Click **Add API token**
5. Name: `Dev Token`
6. Permissions: **Editor**
7. Copy the token

### 2. Add Token to .env.local

```bash
SANITY_API_TOKEN=your_token_here
```

### 3. Run Seed Script

```bash
node scripts/seed-skills.js
```

---

## What It Creates

**7 Sample Skills**:
- React (Frontend, 95%)
- TypeScript (Frontend, 92%)
- Next.js (Frontend, 90%)
- Node.js (Backend, 85%)
- GSAP (Tools, 80%)
- Tailwind CSS (Design, 88%)
- JavaScript (Frontend, 93%)

**With Connections**:
- React ↔️ TypeScript, Next.js, JavaScript
- TypeScript ↔️ React, Next.js, Node.js
- Next.js ↔️ React, TypeScript, Node.js
- Node.js ↔️ TypeScript, JavaScript
- JavaScript ↔️ React, TypeScript

---

## After Running

1. Check Sanity Studio: http://localhost:3001/studio
2. View skills in "Content" → "Skill"
3. See live constellation: http://localhost:3001
4. Add skills section to home page if not there

---

## Troubleshooting

**"SANITY_API_TOKEN not found"**:
- Make sure you added the token to `.env.local`
- Restart dev server after adding

**"Unauthorized"**:
- Check token has Editor permissions
- Verify project ID matches

**Want to reset**:
1. Delete all skills in Studio
2. Run script again

---

**Ready to populate your skills!** 🚀
