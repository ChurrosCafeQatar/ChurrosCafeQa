import Image from 'next/image';

// Keep original approved assets; Next.js produces responsive WebP variants.
export default function SiteImage({ src, alt = '', width = 800, height = 800, ...props }) {
  const sizes = src.includes('churros_logo') ? '181px'
    : src.includes('/menu/') ? '(max-width: 760px) 50vw, 33vw'
    : '(max-width: 760px) 100vw, 50vw';
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} {...props} />;
}
