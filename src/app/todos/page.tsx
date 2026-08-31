// ✅ SERVER COMPONENT — No 'use client' directive
// This page is async, runs on the server, fetches data from the API directly,
// and passes the serializable JSON data down to the TodoList client component.

import TodoList from '@/components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default async function TodosPage() {
  // Fetch data on the server during request/build time
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    // Next.js caching behaviour
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos from server');
  }
  
  const todos: Todo[] = await response.json();

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
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
            fontSize: '40px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #f0f0f5 0%, #888899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Todos Checklist
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          This page demonstrates the <strong style={{ color: 'var(--text)' }}>Interleaving Pattern</strong>. 
          The todos data is fetched directly on the server (zero client-side requests) and passed to the 
          dynamic interactive <strong style={{ color: 'var(--text)' }}>TodoList (Client Component)</strong> below.
        </p>
      </div>

      {/* Visual Data Flow Diagram */}
      <div
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '13px',
        }}
      >
        <div style={{ fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔄 Data Flow Architecture:
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>1. Server (fetch API)</span>
          <span>➔</span>
          <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>2. Pass as prop (serializable JSON)</span>
          <span>➔</span>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>3. Client (useState & toggle)</span>
        </div>
      </div>

      {/* Render the Client Component with Server data */}
      <TodoList initialTodos={todos} />
    </main>
  );
}
