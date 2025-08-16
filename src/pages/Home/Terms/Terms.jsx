import React from 'react';

const Terms = () => {
  const updatedOn = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="py-14 px-4 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-[#f34e3a]">Terms</span> of Service
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Last updated: {updatedOn}</p>
          <div className="mx-auto mt-5 h-1 w-36 rounded-full bg-gradient-to-r from-[#BE1C20] via-[#f34e3a] to-[#03466e]" />
        </div>

        {/* Compact sections (short & clean) */}
        <div className="space-y-4">
          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">1) Acceptance of Terms</h3>
            <p className="text-gray-700 text-sm">
              By using <span className="font-medium">FitPath</span> you agree to these Terms. If you do not agree, please
              discontinue use of the platform.
            </p>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">2) Accounts & Eligibility</h3>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Provide accurate information and keep credentials secure.</li>
              <li>You are responsible for all activity under your account.</li>
              <li>Not intended for children under 13.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">3) Bookings & Payments</h3>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Payments are processed securely by <span className="font-medium">Stripe</span>. Card data is not stored by us.</li>
              <li>Bookings are confirmed after successful payment; pricing and availability may change.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">4) Cancellations & Rescheduling</h3>
            <p className="text-gray-700 text-sm">
              Windows are set by trainers/admin (typically 12–24h before session). Refunds and changes follow platform policy
              and trainer rules via your dashboard.
            </p>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">5) Community & Content</h3>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Be respectful; no harassment, hate speech, spam, or illegal content.</li>
              <li>You own your posts but grant FitPath a license to display them within the platform.</li>
              <li>We may remove content that violates these Terms or law.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">6) Health & Safety</h3>
            <p className="text-gray-700 text-sm">
              FitPath is not a medical provider. Exercise involves risks. Consult a physician before starting any program.
              You participate at your own risk.
            </p>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">7) Acceptable Use & Termination</h3>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>No reverse engineering, scraping, malware, or unauthorized access.</li>
              <li>We may suspend/terminate accounts for violations or security reasons.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold text-[#03466e] mb-2">8) Liability, Changes & Contact</h3>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>FitPath is not liable for indirect or consequential damages as permitted by law.</li>
              <li>We may update these Terms; continued use means you accept the changes.</li>
              <li>
                Questions? <a href="mailto:santuchowdhuryofficial@gmail.com" className="text-[#f34e3a] hover:underline">santuchowdhuryofficial@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
