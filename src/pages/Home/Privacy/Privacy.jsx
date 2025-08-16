import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const SectionCard = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6 md:p-8"
  >
    <h3 className="text-xl md:text-2xl font-semibold text-[#03466e] mb-4">{title}</h3>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
    <span className="pointer-events-none absolute inset-x-6 -bottom-1 h-2 rounded-full bg-[radial-gradient(60%_8px_at_50%_100%,rgba(243,78,58,0.20),transparent)]" />
  </motion.section>
);

const Privacy = () => {
  const updatedOn = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-[#f34e3a]">Privacy</span> Policy
          </h1>
          <p className="text-gray-600 mt-3">Last updated: {updatedOn}</p>
          <div className="mx-auto mt-6 h-1 w-40 rounded-full bg-gradient-to-r from-[#BE1C20] via-[#f34e3a] to-[#03466e]" />
        </motion.div>

        {/* Quick Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-8"
        >
          <div className="rounded-xl bg-orange-50 p-5 ring-1 ring-orange-100">
            <h4 className="font-semibold text-[#03466e] mb-3">Quick navigation</h4>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              {[
                ["overview", "Overview"],
                ["info-we-collect", "Information we collect"],
                ["how-we-use", "How we use information"],
                ["cookies", "Cookies & tracking"],
                ["sharing", "Sharing & third parties"],
                ["security", "Security"],
                ["retention", "Data retention"],
                ["your-rights", "Your rights & choices"],
                ["children", "Children’s privacy"],
                ["changes", "Changes to this policy"],
                ["contact", "Contact us"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={`#${href}`} className="text-[#f34e3a] hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>

        <div className="space-y-8">
          {/* Overview */}
          <SectionCard id="overview" title="Overview">
            <p>
              FitPath (“we”, “our”, “us”) is a fitness tracker platform that helps you track
              workouts, set goals, book certified trainers, and engage with the community.
              This policy explains what data we collect, how we use it, and the choices you have.
              By using FitPath, you agree to this policy.
            </p>
          </SectionCard>

          {/* Information we collect */}
          <SectionCard id="info-we-collect" title="Information we collect">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Account information:</span> name, email, profile photo
                (via Firebase Authentication). We do <span className="font-semibold">not</span> store your password.
              </li>
              <li>
                <span className="font-medium">Booking & profile data:</span> class/trainer bookings, trainer profiles,
                available slots, and community forum content you post.
              </li>
              <li>
                <span className="font-medium">Payment information:</span> processed by <span className="font-semibold">Stripe</span>.
                Card details never touch our servers. We may store non-sensitive payment metadata (amount, status, timestamps).
              </li>
              <li>
                <span className="font-medium">Usage & device data:</span> app interactions, basic device/browser info,
                and logs to keep our services secure and reliable.
              </li>
              <li>
                <span className="font-medium">Communication:</span> newsletter subscriptions, support requests,
                and notification preferences.
              </li>
            </ul>
          </SectionCard>

          {/* How we use */}
          <SectionCard id="how-we-use" title="How we use information">
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide core features: authentication, bookings, payments, dashboards.</li>
              <li>Maintain community forum and show featured classes based on bookings.</li>
              <li>Secure the platform (fraud prevention, abuse detection, troubleshooting).</li>
              <li>Improve features and user experience (performance and reliability).</li>
              <li>Send essential service communications (receipts, booking updates).</li>
              <li>Send optional newsletters/marketing if you opt in—you can unsubscribe anytime.</li>
            </ul>
          </SectionCard>

          {/* Cookies */}
          <SectionCard id="cookies" title="Cookies & tracking">
            <p>
              We use essential cookies to keep you signed in and operate core functions.
              Stripe may set cookies to process payments securely. We do not use advertising cookies.
              You can control cookies via your browser—disabling essential cookies may impact features.
            </p>
          </SectionCard>

          {/* Sharing */}
          <SectionCard id="sharing" title="Sharing & third parties">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Stripe (Payments):</span> handles card processing; we receive non-sensitive payment metadata only.
              </li>
              <li>
                <span className="font-medium">Firebase Authentication:</span> manages login/signup (email/password and social).
                Passwords are not accessible to us.
              </li>
              <li>
                <span className="font-medium">Backend & Database:</span> our Node/Express API and MongoDB store platform data
                (bookings, profiles, forum posts, etc.).
              </li>
              <li>
                Service providers (hosting, email) that help run FitPath, under agreements requiring appropriate security and confidentiality.
              </li>
            </ul>
            <p className="mt-2">
              We do <span className="font-semibold">not sell</span> personal information.
              We may disclose information if required by law or to protect rights, safety, and the integrity of our services.
            </p>
          </SectionCard>

          {/* Security */}
          <SectionCard id="security" title="Security">
            <p>
              We use industry-standard measures such as HTTPS/TLS, authentication via Firebase, and server-side protections
              (including JWT-based access control) to safeguard your data. No system is 100% secure; please use a strong, unique
              password and keep your account details safe.
            </p>
          </SectionCard>

          {/* Retention */}
          <SectionCard id="retention" title="Data retention">
            <p>
              We retain information for as long as necessary to provide the service and meet legal, accounting, or reporting obligations.
              You may request deletion of your account and associated data (subject to certain legal/operational limits).
            </p>
          </SectionCard>

          {/* Your rights */}
          <SectionCard id="your-rights" title="Your rights & choices">
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your profile information.</li>
              <li>Manage newsletter preferences or unsubscribe anytime.</li>
              <li>Request a copy of your data or ask us to correct inaccuracies.</li>
              <li>Control cookies via browser settings.</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600">
              If you’re in a region with specific privacy laws (e.g., EEA/UK), you may have additional rights.
            </p>
          </SectionCard>

          {/* Children */}
          <SectionCard id="children" title="Children’s privacy">
            <p>
              FitPath is not directed to children under 13. If we learn that a child under 13 has provided personal information,
              we will take steps to delete such information.
            </p>
          </SectionCard>

          {/* Changes */}
          <SectionCard id="changes" title="Changes to this policy">
            <p>
              We may update this policy to reflect changes in our practices or legal requirements.
              We’ll update the “Last updated” date above and, when appropriate, provide additional notice.
            </p>
          </SectionCard>

          {/* Contact */}
          <SectionCard id="contact" title="Contact us">
            <p>
              Questions about this policy or your data? Reach us at{" "}
              <a
                href="mailto:santuchowdhuryofficial@gmail.com"
                className="text-[#f34e3a] hover:underline"
              >
                santuchowdhuryofficial@gmail.com
              </a>
              .
            </p>
          </SectionCard>

          
        </div>

        {/* CTA / Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
                  to="/"
                  className="group relative inline-flex h-10 items-center justify-center rounded-full 
             bg-[#f34e3a] px-5 pr-12 font-medium text-white 
             shadow-md transition-all duration-300 ease-out 
             hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50 
             select-none overflow-hidden"
                >
                  <span className="z-10 pr-2">Back to Home</span>

                  <div
                    className="absolute right-1 inline-flex h-9 w-9 items-center justify-end rounded-full 
               bg-[#e03a2d] transition-[width] duration-300 ease-out 
               group-hover:w-[calc(100%-8px)]"
                  >
                    <div className="mr-3 flex items-center justify-center">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>

          <Link
            to="/forbidden"
            className="inline-flex items-center justify-center rounded-full border border-[#f34e3a] text-[#f34e3a]
                       h-10 px-5 text-sm font-medium transition-all hover:bg-[#f34e3a]/10"
          >
            Terms of Service
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
