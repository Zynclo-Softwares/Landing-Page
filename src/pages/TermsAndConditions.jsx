import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    number: "1",
    title: "Eligibility",
    content: (
      <p>
        You must be at least <strong>13 years of age</strong> to use PledgeProof. By using the app, you confirm that you meet this requirement. If you are between 13 and 18, you confirm that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.
      </p>
    ),
  },
  {
    number: "2",
    title: "Description of Service",
    content: (
      <>
        <p className="mb-4">PledgeProof is a personal accountability app designed to help users commit to goals through verifiable locks and schedules. Core features include:</p>
        <ul className="space-y-3">
          {[
            ["Image Lock", "Upload sample images to set a goal. The app verifies completion through image matching."],
            ["Proof Lock", "Describe your intended work and submit documents or photos as proof. The app reviews your submission."],
            ["Schedules", "Create recurring time windows that define when your locks are active."],
            ["Analytics", "Track streaks, completion rates, and weekly performance."],
            ["3D Mascot", "A gamified character that levels up as you complete locks, with visual progression across 50 levels."],
            ["Coins", "An in-app currency used for app features, purchasable or earnable through rewarded ads."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
              <span><strong className="text-slate-800">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-slate-500 italic text-sm">PledgeProof is for personal use only. The app does not facilitate communication, messaging, or content sharing between users.</p>
      </>
    ),
  },
  {
    number: "3",
    title: "Account Registration",
    content: (
      <>
        <p className="mb-4">To use PledgeProof, you must create an account using one of the following methods:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Email & Password", "Google Sign-In", "Apple Sign-In"].map((m) => (
            <span key={m} className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700">{m}</span>
          ))}
        </div>
        <ul className="space-y-2 text-slate-600">
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> You are responsible for keeping your login credentials secure.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> You must not share your account with others.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Each person is limited to one account.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> If you suspect unauthorized access, contact us immediately.</li>
        </ul>
      </>
    ),
  },
  {
    number: "4",
    title: "Subscriptions & Payments",
    content: (
      <>
        <p className="mb-4">PledgeProof offers a <strong>free tier</strong> allowing up to 5 active locks. For expanded access, we offer paid subscription plans:</p>
        <div className="flex gap-3 mb-5 flex-wrap">
          {["Monthly Plan", "Yearly Plan"].map((plan) => (
            <div key={plan} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 text-sm font-semibold text-indigo-700">{plan}</div>
          ))}
        </div>
        <ul className="space-y-2 text-slate-600">
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> All subscriptions are billed through the Apple App Store or Google Play Store.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Subscriptions automatically renew unless cancelled at least 24 hours before the billing period ends.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> To cancel, use your App Store or Play Store account settings — not within PledgeProof itself.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> A free trial may be offered to new users. When the trial ends, your account reverts to the free tier unless you subscribe.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> PledgeProof does not process refunds directly. All refund requests must be submitted through Apple or Google.</li>
        </ul>
      </>
    ),
  },
  {
    number: "5",
    title: "In-App Purchases (Coins)",
    content: (
      <>
        <p className="mb-4">PledgeProof offers an in-app currency called <strong>"Coins"</strong>, obtainable by:</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["Starter Pack", "Standard Pack", "Premium Pack", "Rewarded Ads (free)"].map((p) => (
            <span key={p} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">{p}</span>
          ))}
        </div>
        <ul className="space-y-2 text-slate-600">
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Coins are used exclusively within PledgeProof for in-app features.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Coins are non-transferable and non-refundable.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Coins hold no real-world monetary value and cannot be exchanged for cash.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> Unused Coins will be forfeited if your account is deleted.</li>
        </ul>
      </>
    ),
  },
  {
    number: "6",
    title: "Advertisements",
    content: (
      <p>
        PledgeProof includes <strong>optional rewarded advertisements</strong> provided by Google Mobile Ads. You may choose to watch ads to earn free Coins. You are never required to watch ads — all ad interactions are voluntary.
        <br /><br />
        On iOS, we will request your permission for ad tracking through Apple's App Tracking Transparency framework. You may decline this request without affecting your ability to use the app.
      </p>
    ),
  },
  {
    number: "7",
    title: "User Content & Verification",
    content: (
      <>
        <p className="mb-4">When using Image Locks and Proof Locks, you may upload images, documents, or photos for verification purposes.</p>
        <ul className="space-y-2 text-slate-600">
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> You retain full ownership of any content you upload.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> PledgeProof processes uploaded content solely to verify lock completion.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> We do not share, publish, or distribute your uploaded content to third parties.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> You must not upload content that is illegal, harmful, offensive, or inappropriate.</li>
          <li className="flex gap-2"><span className="text-indigo-400 mt-1">→</span> PledgeProof reserves the right to remove content that violates these Terms.</li>
        </ul>
      </>
    ),
  },
  {
    number: "8",
    title: "Prohibited Use",
    content: (
      <>
        <p className="mb-4">You agree <strong>not to</strong>:</p>
        <ul className="space-y-2 text-slate-600">
          {[
            "Reverse-engineer, decompile, disassemble, or tamper with PledgeProof or its systems.",
            "Use the app for any unlawful purpose.",
            "Create multiple or fake accounts.",
            "Exploit, manipulate, or abuse the coin system, ad reward system, or any other app feature.",
            "Interfere with the operation of the app or its servers.",
            "Attempt to bypass lock or schedule restrictions through unauthorized means.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-red-400 mt-1 shrink-0">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "9",
    title: "Intellectual Property",
    content: (
      <p>
        All content within PledgeProof — including the app design, user interface, 3D models, illustrations, branding, logos, and source code — is the <strong>exclusive property of Zynclo</strong> and is protected by copyright and intellectual property laws.
        <br /><br />
        You are granted a limited, personal, non-exclusive, non-transferable, revocable license to use PledgeProof for its intended purpose. This license does not grant you any rights to reproduce, distribute, modify, or create derivative works from any part of the app.
      </p>
    ),
  },
  {
    number: "10",
    title: "Limitation of Liability",
    content: (
      <>
        <p className="mb-4">PledgeProof is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind. To the fullest extent permitted by law, Zynclo shall not be liable for damages arising from:</p>
        <ul className="space-y-2 text-slate-600">
          {[
            "Data loss or corruption",
            "Missed deadlines or commitments",
            "Device restrictions caused by Screen Time controls",
            "Interruptions in service or app availability",
            "Changes to third-party APIs or platform behavior",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-slate-400 mt-1">–</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "11",
    title: "Termination",
    content: (
      <p>
        PledgeProof reserves the right to suspend or permanently terminate your account if you violate these Terms or engage in behavior harmful to the app or its users.
        <br /><br />
        You may delete your account at any time by contacting support. Upon deletion, all associated data will be removed in accordance with our <Link to="/pledgeproof/privacy" className="text-indigo-600 hover:underline font-medium">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    number: "12",
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms from time to time. When we make significant changes, we will notify users through the app or via email. Your continued use of PledgeProof after changes are posted constitutes your acceptance of the revised Terms.
        <br /><br />
        We encourage you to review these Terms periodically.
      </p>
    ),
  },
  {
    number: "13",
    title: "Governing Law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of the <strong>Province of Ontario</strong> and the federal laws of Canada. Any disputes arising from these Terms or your use of PledgeProof shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada.
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 backdrop-blur-xl bg-white/80">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 active:text-slate-800 transition-colors px-2 py-1 -mx-2 rounded touch-target">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <span className="text-slate-200">|</span>
          <span className="text-sm font-medium text-slate-700">Terms & Conditions</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-5">
            PledgeProof · Zynclo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 text-lg font-light">
            Effective Date: <strong className="text-slate-700 font-medium">March 2026</strong>
          </p>
          <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 text-slate-600 leading-relaxed text-sm">
            These Terms & Conditions ("Terms") govern your use of <strong>PledgeProof</strong>, a mobile application developed and operated by <strong>Zynclo</strong>. PledgeProof is available on iOS (Apple App Store) and Android (Google Play Store).
            <br /><br />
            By downloading, installing, or using PledgeProof, you agree to be bound by these Terms. If you do not agree, do not use the app.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          {sections.map((section, i) => (
            <div
              key={section.number}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-600">{section.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">{section.title}</h2>
                    <div className="text-slate-600 text-sm leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <h2 className="text-xl font-semibold mb-1">Contact Us</h2>
          <p className="text-indigo-200 text-sm mb-5">Have questions about these Terms? We're happy to help.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:support@zynclo.com" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors">
              ✉️ support@zynclo.com
            </a>
            <a href="https://www.zynclo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium transition-colors">
              🌐 www.zynclo.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-10">© 2026 Zynclo. All rights reserved.</p>
      </div>
    </div>
  );
}