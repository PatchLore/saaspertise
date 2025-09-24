import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Privacy Policy</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">We value your privacy. This policy explains what personal data we collect, how we use it, and your rights.</p>
          </section>

        <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Account information such as name, email, and profile details.</li>
              <li>Usage data such as pages viewed, actions taken, and device information.</li>
              <li>Communications you send to us, including support requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How We Use Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To provide and improve the Consultants Directory service.</li>
              <li>To facilitate connections between businesses and consultants.</li>
              <li>To maintain safety, prevent fraud, and comply with legal obligations.</li>
              <li>To communicate important updates and relevant service information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed">We do not sell personal data. We may share information with service providers that help us operate the platform, and when required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">We retain personal data only as long as necessary for the purposes described in this policy, unless a longer retention period is required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Rights</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access, correct, or delete your personal information.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Request data portability where applicable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">Questions about this policy? Contact us via the <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}


