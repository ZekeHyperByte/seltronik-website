/**
 * Image optimization utilities for Next.js
 */

// Common responsive image sizes
export const imageSizes = {
  // Product/Project cards
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  
  // Hero/banner images
  hero: '100vw',
  
  // Certificate grid
  certificate: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw',
  
  // Modal/detail images
  modal: '(max-width: 1024px) 100vw, 50vw',
  
  // Thumbnail images
  thumbnail: '(max-width: 640px) 25vw, 150px',
  
  // Logo/brand images
  logo: '(max-width: 640px) 120px, 150px',
} as const;

// Image quality settings based on use case
export const imageQuality = {
  thumbnail: 70,
  card: 80,
  hero: 90,
  certificate: 80,
  modal: 85,
  logo: 95,
} as const;

// Generate blur data URL for placeholder
export const generateBlurDataURL = (width = 8, height = 6): string => {
  // Simple base64 encoded minimal JPEG for blur placeholder
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
};

// Check if image URL is external
export const isExternalImage = (src: string): boolean => {
  return src.startsWith('http') || src.startsWith('//');
};

// Get optimized image props based on context
export const getImageProps = (context: keyof typeof imageSizes) => ({
  sizes: imageSizes[context],
  quality: imageQuality[context] || imageQuality.card,
  placeholder: 'blur' as const,
  blurDataURL: generateBlurDataURL(),
});

// Preload critical images
export const preloadImage = (src: string, sizes?: string) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (sizes) {
    link.setAttribute('imagesizes', sizes);
  }
  document.head.appendChild(link);
};

// Lazy load images with Intersection Observer
export const createImageObserver = (
  callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options?: IntersectionObserverInit
) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};

// Image format detection and optimization
export const getOptimalImageFormat = (): 'webp' | 'avif' | 'jpeg' => {
  if (typeof window === 'undefined') return 'jpeg';
  
  // Check for AVIF support
  const avifSupported = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  })();
  
  if (avifSupported) return 'avif';
  
  // Check for WebP support
  const webpSupported = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();
  
  if (webpSupported) return 'webp';
  
  return 'jpeg';
};

// Performance monitoring for images
export const trackImagePerformance = (src: string, loadTime: number) => {
  if (typeof window === 'undefined') return;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Image loaded: ${src} in ${loadTime}ms`);
  }
  
  // TODO: Send to analytics service
  // Example: analytics.track('image_load', { src, loadTime });
};

// Image loading error handling
export const handleImageError = (src: string, error: Event) => {
  console.error(`Failed to load image: ${src}`, error);
  
  // TODO: Send to error reporting service
  // Example: Sentry.captureException(new Error(`Image load failed: ${src}`));
};

// Responsive breakpoints for image sizing
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Calculate responsive sizes string
export const createResponsiveSizes = (
  sizes: Record<keyof typeof breakpoints | 'default', string>
): string => {
  const sizeArray: string[] = [];
  
  Object.entries(breakpoints).forEach(([key, value]) => {
    if (sizes[key as keyof typeof breakpoints]) {
      sizeArray.push(`(max-width: ${value}px) ${sizes[key as keyof typeof breakpoints]}`);
    }
  });
  
  if (sizes.default) {
    sizeArray.push(sizes.default);
  }
  
  return sizeArray.join(', ');
};