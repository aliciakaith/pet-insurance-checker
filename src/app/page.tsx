import CoverageChecker from '@/components/CoverageChecker'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-gray-800 text-lg">Fetch Coverage Checker</span>
        </div>
        <span className="text-sm text-gray-400">Powered by AI</span>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-12 pb-16 max-w-3xl mx-auto">
        <div className="inline-block bg-teal-100 text-teal-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
          Built for Fetch Australia members
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          Will Fetch cover
          <span className="text-teal-500"> this?</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-xl mx-auto mb-4">
          Describe your pet's condition and get an instant AI-powered estimate — before you even get to the vet.
        </p>
        <p className="text-sm text-gray-400">
          Based on Fetch's real PDS. Takes 30 seconds.
        </p>
      </section>

      {/* Tool */}
      <section className="px-6 pb-20 max-w-2xl mx-auto">
        <CoverageChecker />
      </section>

      {/* How It Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            How it works
          </h2>
          <p className="text-center text-gray-400 mb-14">
            No sign in. No waiting. Just answers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                icon: '🐶',
                title: 'Tell us about your pet',
                desc: "Enter your pet's name, type, and what happened or what condition they have.",
              },
              {
                step: '2',
                icon: '🤖',
                title: 'AI checks the policy',
                desc: "Our AI reasons against Fetch's actual PDS — the same document you agreed to when you signed up.",
              },
              {
                step: '3',
                icon: '✅',
                title: 'Get a clear answer',
                desc: 'See if you\'re covered, an estimated reimbursement in AUD, and exactly what to do next.',
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it covers callout */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
          Common questions it can answer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'My dog ate something and needs surgery',
            'My cat has a skin infection',
            'Cruciate ligament tear in my dog',
            'My dog was bitten by a snake',
            'My pet needs physiotherapy',
            'Behavioural issues after a trauma',
            'My dog has hip dysplasia',
            'Dental infection in my cat',
          ].map((example) => (
            <div
              key={example}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm"
            >
              <span className="text-teal-400 text-lg">→</span>
              <span className="text-gray-600 text-sm">{example}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-6 text-center">
        <p className="text-sm text-gray-400">
          Built as a concept by{' '}
          <span className="font-semibold text-gray-600">[Your Name]</span>
          {' '}— frontend intern candidate
        </p>
        <p className="text-xs text-gray-300 mt-2">
          Not affiliated with Fetch. Always confirm coverage directly with Fetch before making decisions.
        </p>
      </footer>

    </main>
  )
}
