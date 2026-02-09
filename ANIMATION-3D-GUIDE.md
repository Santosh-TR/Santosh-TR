# 🎨 Advanced Animation & 3D Libraries Guide

## ✅ Installed

| Library | Version | Purpose | Bundle Size |
|---------|---------|---------|-------------|
| **lottie-react** | Latest | JSON animations | ~40KB |
| **framer-motion** | Latest | React animations | ~60KB |
| **three** | Latest | 3D graphics (WebGL) | ~600KB |
| **@react-three/fiber** | Latest | Three.js for React | ~90KB |
| **@react-three/drei** | Latest | Three.js helpers | ~100KB |

**Total**: ~890KB (lazy load to reduce impact!)

---

## 1️⃣ Lottie Animations

### What It Is
JSON-based animations from After Effects. Lightweight, scalable, no GIFs!

### Quick Example
```tsx
import Lottie from 'lottie-react';
import animationData from './animation.json';

export default function LoadingSpinner() {
  return (
    <Lottie
      animationData={animationData}
      loop
      style={{ width: 200, height: 200 }}
    />
  );
}
```

### Where to Use
- ✅ Loading states
- ✅ Button hover effects
- ✅ Success/error messages
- ✅ Icon animations

### Get Animations
- [LottieFiles](https://lottiefiles.com/) - Free library
- After Effects → Bodymovin plugin

---

## 2️⃣ Framer Motion

### What It Is
Production-ready animation library for React. Better than GSAP for React!

### Quick Example
```tsx
import { motion } from 'framer-motion';

export default function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="card"
    >
      Hover me!
    </motion.div>
  );
}
```

### Features
- ✅ Declarative animations
- ✅ Scroll animations
- ✅ Gesture detection
- ✅ Layout animations
- ✅ Variants (reusable)

### Use Cases
- Page transitions
- Scroll-triggered animations
- Hover/click effects
- Stagger animations

---

## 3️⃣ Three.js (WebGL)

### What It Is
JavaScript 3D library using WebGL. Create stunning 3D graphics!

### Quick Example (React Three Fiber)
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#D1F840" />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas className="h-screen">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}
```

### Use Cases
- ✅ 3D skill constellation
- ✅ Interactive product showcases
- ✅ Particle systems
- ✅ Custom shaders
- ✅ AR/VR experiences

---

## 4️⃣ WebGL Shaders

### What It Is
Custom GPU programs for visual effects. Works with Three.js!

### Quick Shader Example
```tsx
import { shaderMaterial } from '@react-three/drei';

const WaveShader = shaderMaterial(
  { uTime: 0 },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec3 color = vec3(0.82, 0.97, 0.25); // Acid green
      gl_FragColor = vec4(color, 1.0);
    }
  `
);
```

### Use Cases
- Custom visual effects
- Glow effects
- Distortion
- Particle effects
- Advanced materials

---

## 💡 Performance Tips

### Lazy Loading
```tsx
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => <div>Loading 3D...</div>
});
```

### Optimize Three.js
- Use `useFrame` for animations
- Dispose geometries/materials
- Use instancing for many objects
- Enable shadows sparingly

### Reduce Bundle
- Don't import entire libraries
- Tree-shake unused code
- Use dynamic imports

---

## 🎯 Recommended Usage for YOUR Portfolio

| Feature | Library | Priority |
|---------|---------|----------|
| Loading states | Lottie | ⭐⭐⭐ High |
| Scroll animations | Framer Motion | ⭐⭐⭐ High |
| Hover effects | Framer Motion | ⭐⭐ Medium |
| 3D skills | Three.js | ⭐ Low (heavy) |
| Background | WebGL Shader | ⭐ Low (advanced) |

---

## 📦 Example Components Created

I'll create these for you:
1. `components/animations/LottieLoader.tsx`
2. `components/animations/MotionCard.tsx`
3. `components/3d/SkillSphere.tsx`
4. `components/3d/ParticleField.tsx`

**Ready to create these?** 🚀
