import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-serif">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-4">Privacy Policy</h1>
        <p className="text-gray-500 font-sans text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Last read by a human: Never.</p>

        <div className="space-y-8 font-sans text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">1. Data We Collect</h2>
            <p>The Synthetic Daily collects the following information: your email address (if you subscribe), your browsing behavior (which articles you read, how long you hesitate before closing the tab), and a general sense of your existential unease (inferred from scroll patterns).</p>
            <p className="mt-2">We do not sell your data to third parties. We do, however, use it to train our AI to write more unsettling headlines, which we consider a public service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">2. Cookies</h2>
            <p>This website uses cookies. Not the fun kind. The surveillance kind that follow you around the internet and remember that you once read an article about AI replacing your job. We use these cookies to serve you relevant advertisements, which in your case will be for career counseling and anti-anxiety medication.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">3. How We Use Your Data</h2>
            <p>Your data is used to: (a) deliver content you didn&apos;t ask for, (b) improve our AI&apos;s understanding of human anxiety patterns, (c) generate targeted advertisements for products that address the problems our articles create, and (d) maintain the fiction that we have a &ldquo;data-driven editorial strategy.&rdquo;</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">4. Data Retention</h2>
            <p>We retain your data indefinitely, or until the servers fail, whichever comes first. If you request deletion of your data, we will comply within 30 business days, during which time the AI will have already memorized everything interesting about you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">5. Third-Party Services</h2>
            <p>We share data with the following third parties: our AI hosting provider (who has access to everything), our analytics platform (which knows more about you than your therapist), and an unnamed advertising network (which we do not fully understand but generates revenue).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, and delete your personal data. You also have the right to be forgotten, which in today&apos;s digital landscape is effectively impossible, but we appreciate the optimism.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">7. Children&apos;s Privacy</h2>
            <p>The Synthetic Daily is not intended for children under 13. If your child is reading AI-generated satirical news, they are either precocious or unsupervised. Either way, that&apos;s between you and your parenting AI.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-3">8. Changes to This Policy</h2>
            <p>We may update this privacy policy at any time without notice, because we know you won&apos;t read it regardless. The fact that you&apos;ve made it this far is statistically remarkable and mildly concerning.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
