# 📦 How to Use Your Local Fonts

## Step 1: Place Font Files

**Copy your font files here:**
```
public/fonts/
├── YourFont-Regular.woff2
├── YourFont-Bold.woff2
├── YourFont-Light.woff2
└── (any other font files)
```

**Supported formats** (in order of preference):
- `.woff2` (best - modern, compressed)
- `.woff` (good - widely supported)
- `.ttf` (okay - larger file size)
- `.otf` (okay - larger file size)

---

## Step 2: Update globals.css

**Add this to the TOP of** `app/globals.css` (before `@import "tailwindcss";`):

```css
/* Custom Local Fonts */
@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFont-Regular.woff2') format('woff2'),
       url('/fonts/YourFont-Regular.woff') format('woff'),
       url('/fonts/YourFont-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFont-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@import "tailwindcss";
```

---

## Step 3: Use the Font

**In the `@theme` section**, change:

```css
@theme {
  --font-oswald: 'YourFontName', sans-serif;  /* Your local font */
}
```

---

## 🎯 Complete Example

**If your font is called "MyCustomFont"**:

1. **Files in** `public/fonts/`:
   ```
   MyCustomFont-Regular.woff2
   MyCustomFont-Bold.woff2
   ```

2. **Add to** `globals.css` (line 1):
   ```css
   @font-face {
     font-family: 'MyCustomFont';
     src: url('/fonts/MyCustomFont-Regular.woff2') format('woff2');
     font-weight: 400;
     font-style: normal;
     font-display: swap;
   }

   @font-face {
     font-family: 'MyCustomFont';
     src: url('/fonts/MyCustomFont-Bold.woff2') format('woff2');
     font-weight: 700;
     font-style: normal;
     font-display: swap;
   }
   ```

3. **Use it** (in `@theme` section):
   ```css
   --font-oswald: 'MyCustomFont', sans-serif;
   ```

---

## ✅ After Pasting Fonts

1. Place files in `public/fonts/`
2. Tell me the **exact font file names**
3. I'll write the `@font-face` code for you!

**Ready when you are!** 🚀
