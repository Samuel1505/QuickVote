export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg) pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="heading-hero text-(--purple-deep)">
            Engage, Vote, Proceed.
          </h1>
          
          {/* Subheading */}
          <p className="text-lead text-gray-700 max-w-2xl mx-auto">
            Make voting accessible anytime, everywhere.
          </p>
          
          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-(--purple-primary) to-transparent rounded-full"></div>
            <div className="w-3 h-3 bg-(--purple-primary) rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-(--purple-primary) to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-(--purple-light) rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-(--purple-medium) rounded-full opacity-10 blur-3xl"></div>
      </div>
    </section>
  )
}