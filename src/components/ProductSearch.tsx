'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function ProductSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const currentQuery = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || 'All';

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Search Input */}
      <div style={{ flex: 1, position: 'relative', minWidth: '260px' }}>
        <input
          type="text"
          placeholder="Search products..."
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
        {isPending && (
          <span
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '12px',
              color: 'var(--accent-2)',
            }}
          >
            ⏳
          </span>
        )}
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', 'Electronics', 'Audio', 'Wearables', 'Photography'].map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                background: isActive ? 'var(--accent-glow)' : 'var(--surface)',
                color: isActive ? 'var(--accent-2)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
