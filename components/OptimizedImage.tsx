import React, { useState } from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL = 
    blurDataURL || 
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  // Determine sizes based on common breakpoints if not provided
  const defaultSizes = sizes || (
    fill 
      ? '100vw' 
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  );

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Error fallback
  if (imageError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <div className="text-center text-gray-400 dark:text-gray-500">
          <FaImage className="mx-auto text-2xl mb-2" />
          <p className="text-xs">Gambar tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    quality,
    priority,
    ...(priority ? {} : { loading }), // Only include loading if priority is false
    sizes: defaultSizes,
    placeholder: placeholder as any,
    blurDataURL: defaultBlurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : `object-${objectFit}`} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    );
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    );
  }

  // Fallback for cases where neither fill nor dimensions are provided
  console.warn('OptimizedImage: Either fill=true or width/height must be provided');
  return (
    <Image
      {...imageProps}
      width={400}
      height={300}
    />
  );
};

// HOC for lazy loading images with intersection observer
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const LazyComponent = React.forwardRef<any, P>((props, ref) => {
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    
    const observerRef = React.useRef<IntersectionObserver>();
    const elementRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const element = elementRef.current;
      if (!element || hasBeenInView) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setHasBeenInView(true);
            observerRef.current?.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      observerRef.current.observe(element);

      return () => {
        observerRef.current?.disconnect();
      };
    }, [hasBeenInView]);

    if (!hasBeenInView) {
      return (
        <div 
          ref={elementRef}
          className="bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ minHeight: '200px' }}
        />
      );
    }

    return <Component {...(props as any)} ref={ref} />;
  });

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  return LazyComponent;
};

export default OptimizedImage;