import { useState, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  width = '100%',
  height = '100%',
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
      setLoading(false);
      return;
    }

    // For mocks and local assets we just use the provided src directly.
    setCurrentSrc(src);
    setLoading(false);
  }, [src]);

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
