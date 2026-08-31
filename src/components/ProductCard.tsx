// ✅ SERVER COMPONENT — No 'use client' directive
// ProductCard renders static product data on the server.
// It *imports* AddToCartButton (a Client Component) — this is valid!
// The Server Component tree stops at the <AddToCartButton /> boundary.

import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    emoji: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow)',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      {/* Emoji Icon */}
      <div style={{ fontSize: '40px', lineHeight: 1 }}>{product.emoji}</div>

      {/* Category Badge */}
      <span
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          padding: '3px 10px',
          borderRadius: '20px',
          background: 'var(--accent-glow)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--accent-2)',
          letterSpacing: '0.04em',
        }}
      >
        {product.category}
      </span>

      {/* Product Name */}
      <h2 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em' }}>
        {product.name}
      </h2>

      {/* Price */}
      <p
        style={{
          fontSize: '28px',
          fontWeight: 800,
          color: 'var(--accent-2)',
          letterSpacing: '-0.02em',
        }}
      >
        ${product.price}
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* 
        ✅ A Server Component CAN use a Client Component as a child.
        Props (productId, productName) are passed from Server → Client.
        Only this button ships as JavaScript to the browser.
      */}
      <AddToCartButton productId={product.id} productName={product.name} />
    </div>
  );
}
