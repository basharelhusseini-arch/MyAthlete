# BackgroundWordmark Component - Usage Examples

## Quick Start

```tsx
import BackgroundWordmark from '@/components/BackgroundWordmark';

// In your page component
<BackgroundWordmark />
```

## Common Use Cases

### 1. Landing Page (Bold Statement)
```tsx
<BackgroundWordmark 
  intensity={0.45}     // Medium-high visibility
  position="center"    // Centered behind hero
/>
```

### 2. Auth Pages (Subtle Background)
```tsx
<BackgroundWordmark 
  intensity={0.35}     // More subtle for focus
  position="center"    // Behind form
/>
```

### 3. Hero Section (Upper Position)
```tsx
<BackgroundWordmark 
  intensity={0.50}     // Bold
  position="upper"     // Top third of page
/>
```

### 4. About Page (Custom Text)
```tsx
<BackgroundWordmark 
  text="OUR STORY"
  intensity={0.40}
  position="center"
/>
```

### 5. Minimal Aesthetic
```tsx
<BackgroundWordmark 
  intensity={0.25}     // Very subtle
  position="lower"     // Bottom area
/>
```

## Intensity Guide

| Value | Use Case | Visibility |
|-------|----------|------------|
| 0.25  | Minimal, very subtle | Barely there |
| 0.35  | Auth pages, forms | Subtle |
| 0.45  | Landing pages, hero | Balanced ✓ |
| 0.55  | Bold statements | High |
| 0.65  | Maximum (not recommended) | Very high |

**Recommended range**: 0.35 - 0.50

## Position Guide

### Center (Default)
Best for: Most pages, balanced layouts
```tsx
position="center"  // Vertically centered
```

### Upper
Best for: Pages with content at bottom, hero-heavy designs
```tsx
position="upper"   // Top third
```

### Lower
Best for: Pages with top navigation, header-heavy layouts
```tsx
position="lower"   // Bottom two-thirds
```

## Layout Integration

### Proper Z-Index Structure
```tsx
<div className="page-container">
  {/* Background gradients (z-index: 0) */}
  <div style={{ zIndex: 0 }}>
    <div className="gradient-blob" />
  </div>

  {/* BackgroundWordmark (z-index: 5) */}
  <BackgroundWordmark intensity={0.45} />

  {/* Navigation (z-index: 50) */}
  <nav className="relative z-50">
    {/* Nav content */}
  </nav>

  {/* Main content (z-index: 10) */}
  <main className="relative z-10">
    {/* Page content */}
  </main>
</div>
```

## Responsive Behavior

### Desktop (>768px)
- Font size: 72px - 160px
- Letter spacing: 0.25em
- Single line display

### Tablet (481px - 768px)
- Font size: 48px - 96px
- Letter spacing: 0.15em
- May wrap on smaller tablets

### Mobile (≤480px)
- Font size: 40px - 72px
- Letter spacing: 0.1em
- Wraps naturally
- Centered alignment

## Styling Customization

### Add Custom Classes
```tsx
<BackgroundWordmark 
  className="my-custom-styles"
  intensity={0.45}
/>
```

### Override Positioning
```tsx
<BackgroundWordmark 
  className="top-20"  // Custom top offset
  intensity={0.45}
/>
```

## Common Patterns

### Pattern 1: Hero with Wordmark
```tsx
<div className="hero-section">
  <BackgroundWordmark intensity={0.45} position="center" />
  
  <div className="hero-content relative z-10">
    <h1>Welcome to Thrivv</h1>
    <button>Get Started</button>
  </div>
</div>
```

### Pattern 2: Full-Page with Fixed Background
```tsx
<div className="min-h-screen">
  <div className="fixed inset-0" style={{ zIndex: 0 }}>
    {/* Background effects */}
  </div>
  
  <BackgroundWordmark intensity={0.40} />
  
  <div className="relative z-10">
    {/* Page content */}
  </div>
</div>
```

### Pattern 3: Section Background
```tsx
<section className="relative py-20">
  <BackgroundWordmark 
    text="OUR MISSION"
    intensity={0.30}
    position="center"
  />
  
  <div className="container relative z-10">
    {/* Section content */}
  </div>
</section>
```

## Accessibility Notes

✅ **Built-in Accessibility**
- `aria-hidden="true"` - Hidden from screen readers
- `pointer-events: none` - Doesn't block clicks
- Decorative only - no semantic meaning
- No impact on keyboard navigation

## Performance Tips

1. **Reuse the component** - Don't create multiple wordmarks on same page
2. **Use appropriate intensity** - Lower values = better performance
3. **Avoid nesting** - One wordmark per viewport is enough
4. **Static props** - Don't animate intensity or position props

## Troubleshooting

### Wordmark not visible?
1. Check z-index layering (should be 5)
2. Ensure parent has `position: relative` or proper stacking context
3. Verify intensity is not too low (<0.25)
4. Check if content is covering it (content should be z-10+)

### Text is cut off on mobile?
1. Component handles this automatically with text wrapping
2. If still an issue, reduce intensity or use position="lower"

### Colors don't match brand?
1. Edit the component's `rgba(251, 191, 36, ...)` values
2. Or use CSS filters on the component wrapper

## Advanced Customization

### Change Colors
Edit `BackgroundWordmark.tsx`:
```tsx
// Find these lines and adjust RGB values
color: `rgba(251, 191, 36, ${fillOpacity})`,
WebkitTextStroke: `1px rgba(251, 191, 36, ${strokeOpacity})`,
```

### Adjust Animation Speed
Edit the shimmer animation:
```css
animation: shimmer 10s linear infinite;
         // ^^^ Change duration (default: 10s)
```

### Change Font Weight
```tsx
fontWeight: 900,  // Current: Ultra-bold
         // Try: 800 (bold), 700 (semi-bold)
```

## Examples in Production

### Current Implementation

| Page | Intensity | Position | Notes |
|------|-----------|----------|-------|
| Landing (`app/page.tsx`) | 0.45 | center | Bold statement |
| Login (`app/member/login/page.tsx`) | 0.35 | center | Subtle, focused |
| Signup (`app/member/signup/page.tsx`) | 0.35 | center | Subtle, focused |

---

**Component Location**: `/components/BackgroundWordmark.tsx`  
**Documentation**: `WORDMARK_REDESIGN.md`  
**Last Updated**: January 15, 2026
