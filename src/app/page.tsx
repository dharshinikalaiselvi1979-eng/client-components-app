// ✅ SERVER COMPONENT — No 'use client'
// The root page is server-rendered static content.

export default function HomePage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '20px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            fontSize: '13px',
            fontWeight: 600,
            color: '#818cf8',
            marginBottom: '28px',
          }}
        >
          Next.js App Router · Lesson 2.18
        </div>

        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #f0f0f5 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Client Component
          <br />
          Marking with{' '}
          <span style={{ fontFamily: 'monospace', fontSize: '48px' }}>&apos;use client&apos;</span>
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 36px',
          }}
        >
          Server Components are the default. Only opt in to Client Components
          when you need interactivity — hooks, event handlers, or browser APIs.
        </p>

        <a
          href="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '15px',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            transition: 'transform 0.2s',
          }}
        >
          View Products Demo →
        </a>
      </div>

      {/* Rules Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        {[
          {
            icon: '🖥️',
            title: 'Server Components (Default)',
            color: '#6366f1',
            borderColor: 'rgba(99,102,241,0.3)',
            bg: 'rgba(99,102,241,0.08)',
            points: [
              'No "use client" directive needed',
              'Rendered on the server — zero JS sent',
              'Use for: static content, data fetching, layouts',
              'Can import and use Client Components',
            ],
          },
          {
            icon: '⚡',
            title: "Client Components ('use client')",
            color: '#f59e0b',
            borderColor: 'rgba(245,158,11,0.3)',
            bg: 'rgba(245,158,11,0.08)',
            points: [
              "'use client' must be first line of file",
              'Ships as JavaScript to the browser',
              'Use for: useState, useEffect, onClick, forms',
              'Keep them small and focused',
            ],
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: card.bg,
              border: `1px solid ${card.borderColor}`,
              borderRadius: 'var(--radius)',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>{card.icon}</span>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: card.color }}>{card.title}</h2>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {card.points.map((point) => (
                <li key={point} style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
                  <span style={{ color: card.color, fontWeight: 700 }}>›</span> {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Code snippet callout */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '28px',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          ⚠️ BUNDLE SIZE COST — Why overuse is dangerous
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div style={{ background: '#1a0a0a', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '8px' }}>❌ BAD — Entire app as Client</div>
            <code style={{ color: '#fca5a5', whiteSpace: 'pre', fontFamily: 'monospace', display: 'block', lineHeight: 1.8 }}>
              {`// layout.tsx\n'use client'; ← marks EVERYTHING\n// Bundle: ~1.5 MB\n// Every page = slow JS parse`}
            </code>
          </div>
          <div style={{ background: '#0a1a0a', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '8px' }}>✅ GOOD — Only interactive parts</div>
            <code style={{ color: '#86efac', whiteSpace: 'pre', fontFamily: 'monospace', display: 'block', lineHeight: 1.8 }}>
              {`// AddToCartButton.tsx\n'use client'; ← small boundary\n// Bundle: ~12 KB\n// Pages load instantly`}
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
