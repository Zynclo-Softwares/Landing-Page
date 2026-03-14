export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms & Conditions</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Acceptance of Terms</h2>
            <p>By downloading, installing, or using PledgeProof ("the App"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Use of the App</h2>
            <p>PledgeProof is an AI-powered accountability app designed to help users build habits and stay disciplined. You agree to use the App only for lawful purposes and in accordance with these Terms.</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>You must be at least 13 years old to use the App.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree not to misuse, reverse-engineer, or exploit any feature of the App.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Subscriptions & Billing</h2>
            <p>PledgeProof may offer free and paid subscription tiers. By subscribing to a paid plan:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>You authorize us to charge your payment method on a recurring basis.</li>
              <li>Subscriptions auto-renew unless cancelled at least 24 hours before the renewal date.</li>
              <li>Refunds are handled in accordance with the App Store or Google Play policies.</li>
              <li>We reserve the right to change pricing with reasonable notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. AI Features & Accuracy</h2>
            <p>PledgeProof uses AI and LLM-based technology to verify images and evaluate pledges. These features are provided as-is. We do not guarantee 100% accuracy of AI judgments and are not liable for any decisions made based on AI outputs.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Intellectual Property</h2>
            <p>All content, branding, and technology in the App are owned by Zynclo. The patent-pending lock-and-schedule system is proprietary. You may not copy, distribute, or create derivative works without our written consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Zynclo shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App. Our total liability shall not exceed the amount you paid us in the last 12 months.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Termination</h2>
            <p>We reserve the right to suspend or terminate your account if you violate these Terms. You may also delete your account at any time as described in our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the App after changes constitutes your acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Contact</h2>
            <p>If you have questions about these Terms, please contact us through our website at <a href="https://zynclo.com" className="text-indigo-600 hover:underline">zynclo.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}