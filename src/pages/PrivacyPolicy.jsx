export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy & Data Deletion</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Information We Collect</h2>
            <p>When you use PledgeProof, we may collect the following types of information:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Account Information:</strong> Name, email address, and password.</li>
              <li><strong>Usage Data:</strong> App activity, pledge records, streaks, and schedule data.</li>
              <li><strong>Images:</strong> Photos submitted for AI verification as part of the lock system.</li>
              <li><strong>Device Information:</strong> Device type, OS version, and app version for diagnostics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve the App's features.</li>
              <li>To verify pledge images using our AI system.</li>
              <li>To send account-related notifications.</li>
              <li>To analyze usage trends and improve user experience.</li>
              <li>We do <strong>not</strong> sell your personal data to third parties.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Data Sharing</h2>
            <p>We may share your data with:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>AI processing providers to verify images (data is not stored by them).</li>
              <li>Cloud infrastructure providers for data storage and hosting.</li>
              <li>Law enforcement if required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Data Retention</h2>
            <p>We retain your data for as long as your account is active. Upon account deletion, your personal data and content are permanently removed within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us or delete your account directly through the App.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Security</h2>
            <p>We use industry-standard encryption and security practices to protect your data. However, no system is 100% secure and we cannot guarantee absolute security.</p>
          </section>

          {/* DELETE ACCOUNT SECTION - prominently placed for Google Play compliance */}
          <section id="delete-account" className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">🗑️ How to Delete Your Account</h2>
            <p className="text-slate-700 mb-4">You can permanently delete your PledgeProof account and all associated data at any time. This action is <strong>irreversible</strong>.</p>
            <p className="text-slate-700 font-medium mb-2">To delete your account:</p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>Open the PledgeProof app.</li>
              <li>Go to <strong>Settings</strong> (tap your profile icon).</li>
              <li>Scroll down to <strong>Account</strong>.</li>
              <li>Tap <strong>"Delete Account"</strong> and confirm.</li>
            </ol>
            <p className="mt-4 text-slate-500 text-sm">All your data — including account info, images, pledges, and streaks — will be permanently deleted within 30 days. Subscription charges will not be refunded unless required by law.</p>
            <p className="mt-3 text-slate-500 text-sm">If you are unable to access the app, contact us at <a href="mailto:support@zynclo.com" className="text-indigo-600 hover:underline">support@zynclo.com</a> to request manual deletion.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:support@zynclo.com" className="text-indigo-600 hover:underline">support@zynclo.com</a> or through our website at <a href="https://zynclo.com" className="text-indigo-600 hover:underline">zynclo.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}