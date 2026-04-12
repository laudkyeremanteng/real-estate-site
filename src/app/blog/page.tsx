import Header from '@/components/Header'
import BlogGrid from '@/components/BlogGrid'
import BlogSidebar from '@/components/BlogSidebar'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Real Estate <span className="text-gold">Insights</span>
            </h1>
            <p className="text-xl font-body text-gray-300 max-w-2xl mx-auto">
              Expert advice, market trends, and luxury property insights from Ghana's leading real estate professionals
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogGrid />
            </div>
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
