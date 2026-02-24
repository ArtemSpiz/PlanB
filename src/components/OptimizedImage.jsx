import { useState, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  fit = 'cover',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    const loadImage = async () => {
      try {
        const baseUrl = import.meta.env.VITE_DIRECTUS_URL;
        if (!baseUrl) throw new Error('Directus URL not configured');

        const numericWidth =
          typeof width === 'number'
            ? width
            : width.includes('%')
              ? Math.floor((window.innerWidth * parseInt(width)) / 100)
              : parseInt(width) || 800;

        const placeholderUrl = new URL(`${baseUrl}/assets/${src}`);
        placeholderUrl.searchParams.set(
          'width',
          Math.min(numericWidth, 20).toString()
        );
        placeholderUrl.searchParams.set('quality', '10');
        setCurrentSrc(placeholderUrl.toString());

        // Load high quality image
        const imageUrl = new URL(`${baseUrl}/assets/${src}`);
        imageUrl.searchParams.set('width', numericWidth.toString());
        if (height !== 'auto')
          imageUrl.searchParams.set('height', height.toString());
        imageUrl.searchParams.set('fit', fit);
        imageUrl.searchParams.set('quality', quality.toString());

        const img = new Image();
        img.src = imageUrl.toString();

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setCurrentSrc(imageUrl.toString());
        setLoading(false);
      } catch (err) {
        console.error('Failed to load image:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadImage();
  }, [src, width, height, quality, fit]);

  if (error) {
    return (
      <div
        className={`relative overflow-hidden bg-gray-200 ${className}`}
        style={{ width, height: height === 'auto' ? 'auto' : height }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Failed to load image
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height: height === 'auto' ? 'auto' : height }}
    >
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${
          loading ? 'blur-sm scale-105' : 'blur-0 scale-100'
        }`}
        sizes={sizes}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
