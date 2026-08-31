// ✅ SERVER COMPONENT — No 'use client' directive
// This page is entirely server-rendered.
// It passes data down to child components as props.

import ProductCard from '@/components/ProductCard';

const products = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻', category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, emoji: '📱', category: 'Electronics' },
  { id: 3, name: 'Tablet', price: 399, emoji: '📟', category: 'Electronics' },
  { id: 4, name: 'Headphones', price: 249, emoji: '🎧', category: 'Audio' },
  { id: 5, name: 'Smartwatch', price: 349, emoji: '⌚', category: 'Wearables' },
  { id: 6, name: 'Camera', price: 799, emoji: '📷', category: 'Photography' },
];

export default function ProductsPage() {
  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'var(--accent-glow)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--accent-2)',
            marginBottom: '20px',
            letterSpacing: '0.05em',
          }}
        >
          <span>🖥️</span> SERVER COMPONENT — No &apos;use client&apos;
        </div>

        <h1
          style={{
            fontSize: '48px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #f0f0f5 0%, #888899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Products
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
          This page is a <strong style={{ color: 'var(--text)' }}>Server Component</strong> — it has no{' '}
          <code
            style={{
              background: 'var(--surface-2)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '13px',
              color: 'var(--accent-2)',
            }}
          >
            &apos;use client&apos;
          </code>{' '}
          directive. Only the interactive button inside each card is a Client Component.
        </p>
      </div>

      {/* Architecture Callout */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '20px 24px',
          marginBottom: '40px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { label: 'ProductsPage', type: 'Server', color: '#6366f1', icon: '🖥️' },
          { label: 'ProductCard', type: 'Server', color: '#6366f1', icon: '🖥️' },
          { label: 'AddToCartButton', type: 'Client ← use client', color: '#f59e0b', icon: '⚡' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '11px', color: item.color, fontWeight: 600 }}>
                {item.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
