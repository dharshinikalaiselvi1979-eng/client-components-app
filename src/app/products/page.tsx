// ✅ SERVER COMPONENT — No 'use client' directive
// This page is entirely server-rendered.
// It accepts dynamic URL search parameters from Next.js server routing,
// filters the products list on the server, and passes data to ProductCards.

import ProductCard from '../../components/ProductCard';
import ProductSearch from '../../components/ProductSearch';

const products = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻', category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699, emoji: '📱', category: 'Electronics' },
  { id: 3, name: 'Tablet', price: 399, emoji: '📟', category: 'Electronics' },
  { id: 4, name: 'Headphones', price: 249, emoji: '🎧', category: 'Audio' },
  { id: 5, name: 'Smartwatch', price: 349, emoji: '⌚', category: 'Wearables' },
  { id: 6, name: 'Camera', price: 799, emoji: '📷', category: 'Photography' },
];

interface SearchParams {
  q?: string;
  category?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  // Await searchParams to support Next.js 15+ asynchronously, or resolve immediately if already sync
  const resolvedParams = await searchParams;
  const q = (resolvedParams.q || '').toLowerCase();
  const category = resolvedParams.category || 'All';

  // Filter products on the server side
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(q);
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

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
          directive. Only the interactive button inside each card and the search input are Client Components.
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
          { label: 'ProductsPage (Server Page)', type: 'Server-rendered', color: '#6366f1', icon: '🖥️' },
          { label: 'ProductSearch (Client Input)', type: 'Client Component (use client)', color: '#f59e0b', icon: '⚡' },
          { label: 'ProductCard (Server Container)', type: 'Server-rendered', color: '#6366f1', icon: '🖥️' },
          { label: 'AddToCartButton (Client Interaction)', type: 'Client Component (use client)', color: '#f59e0b', icon: '⚡' },
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

      {/* Product Search & Filter UI (Client Component) */}
      <ProductSearch />

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>🔍</span>
          <p style={{ fontSize: '16px', fontWeight: 600 }}>No products found matching your criteria.</p>
          <a
            href="/products"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              color: 'var(--accent-2)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Reset Filters
          </a>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
