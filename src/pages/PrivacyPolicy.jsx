import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Sticky Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 active:text-slate-800 transition-colors px-2 py-1 -mx-2 rounded touch-target">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <span className="text-slate-200">|</span>
          <span className="text-sm font-medium text-slate-700">Privacy & Data Deletion</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-5">
            PledgeProof · Zynclo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Privacy & Data Deletion
          </h1>
          <p className="text-slate-500 text-lg font-light">
            Effective Date: <strong className="text-slate-700 font-medium">March 2026</strong>
          </p>
          <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 text-slate-600 leading-relaxed text-sm">
            This policy explains what data <strong>PledgeProof</strong> collects, how it's used, and how you can control your data. PledgeProof is developed and operated by <strong>Zynclo</strong>, available on iOS and Android for users aged 13 and older.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-3">

          {/* 1. Data We Collect */}
          <SectionCard number="1" title="Data We Collect">
            <SubHeading>Personal Information</SubHeading>
            <DataList items={[
              ["Email address", "Required for account creation"],
              ["Full name", "Provided during signup"],
              ["Authentication data", "Managed by Amazon Cognito — includes tokens and sign-in method (email/password, Google, or Apple)"],
            ]} />

            <SubHeading className="mt-5">Device Information</SubHeading>
            <DataList items={[
              ["Device type, model & OS", "Used for compatibility and diagnostics"],
              ["Push notification token", "For schedule alerts and reminders"],
              ["Timezone information", "To schedule notifications accurately"],
            ]} />

            <SubHeading className="mt-5">Usage Data</SubHeading>
            <ul className="space-y-1.5 text-slate-600 text-sm">
              {[
                "Lock creation and completion history (Image Locks and Proof Locks)",
                "Schedule data (start/end times, active days)",
                "Analytics data (streaks, completion rates, lock statistics)",
                "Coin balance and transaction history",
                "Subscription status and plan type",
                "Ad interaction data (rewarded ad completions)",
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>{item}</li>
              ))}
            </ul>

            <SubHeading className="mt-5">User-Uploaded Content</SubHeading>
            <ul className="space-y-1.5 text-slate-600 text-sm">
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>Verification images uploaded for Image Locks (sample images and verification attempts)</li>
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>Documents and photos uploaded for Proof Locks</li>
              <li className="flex gap-2"><span className="text-slate-400 shrink-0 mt-0.5 italic">ℹ</span><span className="italic text-slate-500">Used solely for lock verification and stored securely</span></li>
            </ul>
          </SectionCard>

          {/* 2. How We Use Your Data */}
          <SectionCard number="2" title="How We Use Your Data">
            <ul className="space-y-2 text-slate-600 text-sm">
              {[
                "To provide and maintain the PledgeProof service",
                "To manage your account and authentication",
                "To process subscriptions and coin purchases (via RevenueCat and App Store/Play Store)",
                "To send push notifications for schedule alerts and reminders",
                "To display relevant rewarded ads (via Google Mobile Ads)",
                "To track app usage analytics for improving the service",
                "To verify lock completions using uploaded images and documents",
                "To provide customer support",
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>{item}</li>
              ))}
            </ul>
          </SectionCard>

          {/* 3. Data Sharing */}
          <SectionCard number="3" title="Data Sharing">
            <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-green-800 text-sm font-medium">
              ✅ We do <strong>NOT</strong> sell your personal data to third parties.
            </div>
            <p className="text-slate-600 text-sm mb-4">Data is shared with these service providers only as necessary:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ["Amazon Cognito", "Authentication"],
                ["RevenueCat", "Subscription management"],
                ["Google Mobile Ads", "Rewarded advertisements"],
                ["Expo", "Push notifications"],
                ["Apple / Google", "App store billing"],
                ["AWS (S3, DynamoDB)", "Secure cloud infrastructure"],
              ].map(([name, role]) => (
                <div key={name} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">Verification images and documents are processed by our servers and are never shared with third parties.</p>
          </SectionCard>

          {/* 4. Data Storage & Security */}
          <SectionCard number="4" title="Data Storage & Security">
            <ul className="space-y-2 text-slate-600 text-sm">
              {[
                "All data is transmitted over HTTPS (encrypted in transit).",
                "Data is stored on secure AWS infrastructure (DynamoDB, S3).",
                "Authentication tokens are stored securely on the user's device.",
                "We retain user data only as long as the account is active.",
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>{item}</li>
              ))}
            </ul>
          </SectionCard>

          {/* 5. Ad Tracking */}
          <SectionCard number="5" title="Ad Tracking">
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>On iOS, we request App Tracking Transparency permission before enabling ad personalization.</li>
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>Users can decline tracking — the app still functions fully without it.</li>
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>On Android, standard Google ad identifiers may be used.</li>
            </ul>
          </SectionCard>

          {/* 6. Children's Privacy */}
          <SectionCard number="6" title="Children's Privacy">
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>PledgeProof is intended for users aged <strong>13 and older</strong>.</li>
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>We do not knowingly collect data from children under 13.</li>
              <li className="flex gap-2"><span className="text-indigo-400 shrink-0 mt-0.5">→</span>If we discover a user is under 13, we will immediately delete their account and data.</li>
            </ul>
          </SectionCard>

          {/* 7. Your Rights */}
          <SectionCard number="7" title="Your Rights">
            <div className="flex flex-wrap gap-2">
              {[
                "Access your personal data",
                "Correct inaccurate data",
                "Delete your account & data",
                "Opt out of ad tracking",
                "Cancel your subscription anytime",
              ].map((right) => (
                <span key={right} className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-medium text-indigo-700">{right}</span>
              ))}
            </div>
          </SectionCard>

        </div>

        {/* DELETE ACCOUNT — prominent section */}
        <div id="delete-account" className="mt-6 rounded-2xl overflow-hidden border-2 border-red-200 shadow-lg shadow-red-500/5">
          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-8 py-6">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🗑️</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Delete Your Account</h2>
            </div>
            <p className="text-red-100 text-sm">This action is permanent and cannot be undone.</p>
          </div>

          <div className="bg-white p-8 space-y-7">
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3">To request account deletion:</h3>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <p className="text-slate-600 text-sm pt-1">Send a message using the <strong>Support form</strong> on our website or email us directly at <a href="mailto:support@zynclo.com" className="text-indigo-600 hover:underline font-medium">support@zynclo.com</a> with the subject line <strong>"Account Deletion Request"</strong>.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                  <span className="text-red-500">✕</span> What gets deleted
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {[
                    "Account and profile information",
                    "All locks, schedules & analytics",
                    "Uploaded verification images & documents",
                    "Coin balance and purchase history",
                    "Push notification token",
                    "All personal data on our servers",
                  ].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-red-400 shrink-0">✕</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                  <span className="text-amber-500">ℹ</span> What may be retained
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {[
                    "Anonymized, aggregated analytics (non-identifiable)",
                    "Billing records up to 90 days (legal & tax compliance)",
                    "App Store/Play Store purchase records (managed by Apple/Google)",
                  ].map((item) => (
                    <li key={item} className="flex gap-2"><span className="text-amber-400 shrink-0">–</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">⏱</span>
                <span><strong>Timeline:</strong> Account data is permanently deleted within <strong>30 days</strong> of your request. You'll receive an email confirmation when deletion is complete.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Changes & Contact */}
        <div className="mt-3 space-y-3">
          <SectionCard number="8" title="Changes to This Policy">
            <p className="text-slate-600 text-sm leading-relaxed">
              We may update this policy from time to time. Users will be notified of significant changes via the app or email. Continued use of PledgeProof after changes constitutes your acceptance of the revised policy.
            </p>
          </SectionCard>
        </div>

        {/* Contact */}
        <div className="mt-6 p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <h2 className="text-xl font-semibold mb-1">Contact Us</h2>
          <p className="text-indigo-200 text-sm mb-5">Questions about your privacy or data? We're here to help.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:support@zynclo.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors">
              ✉️ support@zynclo.com
            </a>
            <a href="https://zynclo-softwares.base44.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors">
              🌐 zynclo-softwares.base44.app
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-10">© 2026 Zynclo. All rights reserved.</p>
      </div>
    </div>
  );
}

function SectionCard({ number, title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center">
            <span className="text-xs font-bold text-indigo-600">{number}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubHeading({ children, className = "" }) {
  return <h3 className={`text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 ${className}`}>{children}</h3>;
}

function DataList({ items }) {
  return (
    <div className="space-y-2">
      {items.map(([label, desc]) => (
        <div key={label} className="flex gap-3 text-sm">
          <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
          <span><strong className="text-slate-800">{label}</strong> — <span className="text-slate-500">{desc}</span></span>
        </div>
      ))}
    </div>
  );
}