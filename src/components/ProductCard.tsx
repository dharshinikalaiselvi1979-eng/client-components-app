// ✅ SERVER COMPONENT — No 'use client' directive
// ProductCard renders static product data on the server.
// It *imports* AddToCartButton and ProductModalTrigger (Client Components) — this is valid!
// The Server Component tree stops at these interactive boundaries.

import AddToCartButton from './AddToCartButton';
import ProductModalTrigger from './ProductModalTrigger';

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
        ✅ A Server Component CAN use Client Components as children.
        Props are passed from Server → Client.
        Only these button leaf nodes ship as JavaScript to the browser.
      */}
      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Include ID so our modal trigger can click the cart action */}
          <div id={`cart-btn-${product.id}`} style={{ display: 'none' }}>
            <AddToCartButton productId={product.id} productName={product.name} productPrice={product.price} />
          </div>
          <AddToCartButton productId={product.id} productName={product.name} productPrice={product.price} />
        </div>
        <ProductModalTrigger product={product} />
      </div>
    </div>
  );
}

