import CoverageChecker from '@/components/CoverageChecker'

export default function Home() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 50px', background: '#fff' }}>
        <a href="https://fetchpet.com.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <img src="/fetch-pet-insurance_1.png" alt="Fetch" style={{ height: '40px' }} />
        </a>
        <a href="https://fetchpet.com.au" target="_blank" rel="noopener noreferrer"
          style={{ background: '#a8f0a0', color: '#111', borderRadius: '999px', padding: '10px 22px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', border: '2px solid #111' }}>
          Check my price 👉
        </a>
      </nav>

      {/* Hero + Tool */}
      <section style={{ background: '#c7d0f8', borderRadius: '32px', margin: '0 50px 32px', padding: '48px 24px 48px' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 36px' }}>
          <div style={{ display: 'inline-block', background: '#f9a8d4', border: '2px solid #111', borderRadius: '999px', padding: '8px 20px', fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '24px' }}>
            Built for Fetch Australia Customers ❤️
          </div>
          <h1 style={{ fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.05, color: '#111', margin: '0 0 20px', letterSpacing: '-2px' }}>
            Will Fetch cover this?
          </h1>
          <p style={{ fontSize: '18px', color: '#333', maxWidth: '480px', margin: '0 auto 12px', lineHeight: 1.6, fontWeight: 400 }}>
            Describe what happened to your pet and get an instant AI-powered coverage estimate, before you even get to the vet
          </p>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>
            📄 Based on Fetch's real PDS &nbsp;🕐 Takes 30 seconds &nbsp;👌 No sign in needed
          </p>
          <a href="https://www.fetchpet.com.au/cover" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', fontWeight: 700, color: '#111', textDecoration: 'underline' }}>
            Check out PDS ➡️
          </a>
        </div>

        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <CoverageChecker />
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '60px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, textAlign: 'center', color: '#111', marginBottom: '48px', letterSpacing: '-1px' }}>
          How it works?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: '🐶', title: 'Tell us about your pet', desc: "Enter your pet's name, type, and describe what happened or what condition they have.", bg: '#f9c8f0' },
            { icon: '🤖', title: 'AI checks the policy', desc: "Our AI reasons against Fetch's actual PDS — the same document you signed up with.", bg: '#c7d0f8' },
            { icon: '✅', title: 'Get a clear answer', desc: "See if you're covered, an estimated reimbursement in AUD, and exactly what to do next.", bg: '#f9c8f0' },
          ].map(({ icon, title, desc, bg }) => (
            <div key={title} style={{ background: bg, borderRadius: '24px', padding: '32px 24px', minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>{icon}</span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111', margin: 0 }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common questions */}
      <section style={{ background: '#f9c8f0', borderRadius: '32px', margin: '0 50px 32px', padding: '60px 40px' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, textAlign: 'center', color: '#111', marginBottom: '40px', letterSpacing: '-1px' }}>
          Common questions it can answer
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '920px', margin: '0 auto' }}>
          {[
            'My dog ate something and needs surgery',
            'My cat has a skin infection',
            'Cruciate ligament tear in my dog',
            'My dog was bitten by a snake',
            'My pet needs physiotherapy',
            'Behavioural issues after a trauma',
            'My dog has hip dysplasia',
            'Dental infection in my cat',
          ].map((ex) => (
            <div key={ex} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '2px solid #111', borderRadius: '999px', padding: '14px 20px' }}>
              <span style={{ fontSize: '16px' }}>👉</span>
              <span style={{ fontSize: '14px', color: '#111', fontWeight: 500 }}>{ex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Built as a concept by <span style={{ color: '#fff', fontWeight: 700 }}>[Your Name]</span> — frontend intern candidate
        </p>
        <p style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
          Not affiliated with Fetch. Always confirm coverage directly with Fetch before making decisions.
        </p>
      </footer>

    </main>
  )
}
