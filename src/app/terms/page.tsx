import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Terms of Service</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">Please read these terms carefully before using Consultants Directory.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">By accessing or using the platform, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Accounts and Profiles</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You are responsible for the accuracy of the information you provide.</li>
              <li>You are responsible for maintaining the confidentiality of your account.</li>
              <li>We reserve the right to suspend or terminate accounts for violations of these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Platform Use</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Businesses and consultants are solely responsible for engagements formed through the platform.</li>
              <li>No guarantees are made regarding outcomes, performance, or suitability.</li>
              <li>Users agree not to misuse the platform or infringe upon others&apos; rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Fees and Payments</h2>
            <p className="text-gray-700 leading-relaxed">Any fees, if applicable, will be disclosed prior to purchase. By subscribing or purchasing, you authorize us and our payment processors to charge your payment method.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. We disclaim all implied warranties to the fullest extent permitted by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">We may update these terms from time to time. Continued use of the platform after changes signifies your acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact</h2>
            <p className="text-gray-700 leading-relaxed">Questions about these terms? Contact us via the <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}


