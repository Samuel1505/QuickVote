import { Target, Users, Zap, Lock } from "lucide-react"

export function Mission() {
  const missionPoints = [
    {
      icon: Target,
      title: "Democratize Voting",
      description: "Make voting accessible to everyone, regardless of location or physical ability."
    },
    {
      icon: Lock,
      title: "Ensure Security",
      description: "Leverage blockchain technology to create an unhackable and tamper-proof voting system."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Provide real-time vote counting and immediate election results with complete accuracy."
    },
    {
      icon: Users,
      title: "Empower Citizens",
      description: "Give every citizen a voice and the confidence that their vote truly counts."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-xl text-(--purple-deep) mb-4">
            Our Mission
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize the voting process by making it 
            secure, transparent, and accessible to all.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {missionPoints.map((point, index) => (
            <div 
              key={index}
              className="flex gap-6 p-6 rounded-xl bg-white border border-gray-200 hover:border-(--purple-primary)/40 transition-all duration-300 hover:shadow-lg group"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center group-hover:scale-110 transition-transform">
                  <point.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-(--purple-deep) mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-(--purple-primary) to-(--purple-light) text-white">
            <p className="text-xl font-semibold mb-2">
              Join us in building the future of democracy
            </p>
            <p className="text-(--purple-bg) text-lg">
              Every vote matters. Every voice counts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}