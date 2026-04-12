// =================================================================
// AGENTS PAGE - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Team showcase with agent profiles and expertise
// Contains: Agent grid with filtering, specialization options
// Route: /agents
// Note: Currently hidden from navigation, can be re-enabled later
// =================================================================

import Header from '@/components/Header'
import AgentGrid from '@/components/AgentGrid'
import Footer from '@/components/Footer'

// Agents page component - team showcase
export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />                    {/* Navigation header */}
      
      {/* Page header section with title and description */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Meet Our <span className="text-gold">Expert Agents</span>
            </h1>
            <p className="text-xl font-body text-gray-300 max-w-2xl mx-auto">
              Our team of experienced real estate professionals is dedicated to helping you find your perfect luxury property in Ghana
            </p>
          </div>
        </div>
      </section>

      {/* Main content area with agent profiles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AgentGrid />                {/* Agent profiles grid with filtering */}
        </div>
      </section>

      <Footer />                    {/* Footer with links and information */}
    </main>
  )
}
