// =================================================================
// CONTACT SECTION COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Direct contact methods and information for lead generation
// Contains: Phone, WhatsApp, Email contact options and company info
// Used by: Homepage, Contact page
// =================================================================

'use client'

export default function ContactSection() {
  // Contact information - updated with Ghana phone numbers
  const phoneNumber = "+233533827771"
  const whatsappNumber = "+233533827771"
  const email = "info@deltahomesgh.com"

  // Phone call handler
  const handlePhoneCall = () => {
    window.open(`tel:${phoneNumber}`)
  }

  // WhatsApp message handler with pre-filled text
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in a luxury property from Delta Homes Ghana.")
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  // Email handler with pre-filled subject
  const handleEmail = () => {
    window.open(`mailto:${email}?subject=Property Inquiry - Delta Homes Ghana`)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Start Your <span className="text-gold">Journey</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Connect with us directly for immediate assistance with your luxury property needs
            </p>
          </div>

          {/* Contact information grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Contact information */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              
              {/* Contact details list */}
              <div className="space-y-4 mb-8">
                {/* Phone contact */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-400">0533827771</p>
                  </div>
                </div>

                {/* Email contact */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">info@deltahomesgh.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Direct contact actions */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Us Directly</h3>
              
              {/* Action buttons */}
              <div className="space-y-6">
                {/* Call button */}
                <button
                  onClick={handlePhoneCall}
                  className="w-full bg-gold text-black py-4 px-6 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Us Now</span>
                </button>

                {/* WhatsApp button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 text-white py-4 px-6 font-body font-semibold hover:bg-green-700 transition-colors rounded-lg flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </button>

                {/* Email button */}
                <button
                  onClick={handleEmail}
                  className="w-full border-2 border-gold text-gold py-4 px-6 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg flex items-center justify-center space-x-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
