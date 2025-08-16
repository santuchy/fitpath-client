import React from 'react';

const FAQSection = () => {
    const faqs = [
    {
      q: "What is FitPath and who is it for?",
      a: "FitPath is an all-in-one fitness tracker platform that lets you track workouts, set goals, book certified trainers, and engage with a supportive community. It’s designed for everyone—from beginners to advanced athletes.",
    },
    {
      q: "How do I book a trainer or class?",
      a: "Go to the Classes page, choose a trainer or class, select an available time slot, and pay securely via Stripe. After a successful payment, your booking appears in your dashboard under Booked Trainers.",
    },
    {
      q: "Is my payment and data secure?",
      a: "Yes. Payments are processed by Stripe—your card details never touch our servers. Authentication is handled by Firebase, and we store only non-sensitive booking and profile data. API access is protected with JWT.",
    },
    {
      q: "Can I reschedule or cancel a booking?",
      a: "Reschedule/cancel windows depend on trainer policy, typically 12–24 hours before start time. Manage requests from your dashboard. Refunds follow the trainer/admin policy.",
    },
  ];

    return (
        <section className="py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-11/12 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
          <span className="text-[#f34e3a]">Frequently</span> Asked Questions
        </h2>
        <p className="text-gray-600 text-center mt-3 mb-10">
          Quick answers about booking, payments, and using FitPath.
        </p>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
            >
              <summary className="list-none cursor-pointer flex items-center justify-between gap-4 p-5">
                <span className="text-base md:text-lg font-semibold text-[#03466e]">
                  {q}
                </span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f34e3a]/10 text-[#f34e3a] transition-transform duration-300 group-open:rotate-45">
                  {/* Plus icon (rotates on open) */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11 5h2v14h-2z"></path>
                    <path d="M5 11h14v2H5z"></path>
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 pt-0 text-gray-700 leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
    );
};

export default FAQSection;