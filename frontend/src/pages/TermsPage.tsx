import React from 'react';

const TermsPage: React.FC = () => {
  const lastUpdated = 'September 13, 2025';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our Learning Management System.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8 text-center">
            <p className="text-gray-600">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to our Learning Management System ("LMS"). These Terms of Service ("Terms") govern your use of our platform, including all content, services, and products available at our website and mobile applications. By accessing or using our LMS, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree to all the terms and conditions of this agreement, you may not access or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our LMS provides an online platform for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access to educational courses and learning materials</li>
                <li>Interactive learning tools and assessments</li>
                <li>Progress tracking and certification</li>
                <li>Communication tools for instructors and students</li>
                <li>Administrative tools for course management</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to modify or discontinue any service at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our LMS, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time for violations of these Terms or for other reasons we deem necessary to protect our platform and community.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use our LMS responsibly and in compliance with applicable laws. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violating intellectual property rights</li>
                <li>Posting harmful, offensive, or inappropriate content</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with other users' learning experience</li>
                <li>Sharing account credentials with others</li>
                <li>Using the platform for commercial purposes without permission</li>
                <li>Uploading viruses or malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Our Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on our LMS, including text, graphics, logos, images, audio, video, software, and course materials, is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 User Content</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By posting content on our platform, you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and distribute your content in connection with our services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Course Materials</h3>
              <p className="text-gray-700 leading-relaxed">
                Course materials are provided for your personal, non-commercial use only. You may not reproduce, distribute, or create derivative works without explicit permission from the content owner.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment and Refunds</h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Fees</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some courses and services may require payment. All fees are clearly displayed before purchase and are non-refundable except as expressly stated in our refund policy.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Refund Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We offer a 30-day money-back guarantee on course purchases. Refunds will be processed within 5-10 business days of approval. Certain promotional or discounted courses may have different refund terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our LMS, you consent to the collection and use of your information as outlined in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our LMS is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Accuracy or completeness of content</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security of data transmission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our LMS. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from your use of our LMS, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to our LMS immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our LMS will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our platform and updating the "Last updated" date. Your continued use of our LMS after such changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@lms.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Learning Street, Education City, EC 12345, United States</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Entire Agreement</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding the use of our LMS and supersede all prior agreements or understandings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;