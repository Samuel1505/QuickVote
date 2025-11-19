import { Eye, Shield, Globe } from "lucide-react"

export function Vision() {
  const visionPoints = [
    {
      icon: Eye,
      title: "Transparent Voting",
      description: "Every vote is recorded on the blockchain, ensuring complete transparency and accountability in the electoral process."
    },
    {
      icon: Shield,
      title: "Secure & Trustworthy",
      description: "Built on blockchain technology to prevent fraud, manipulation, and ensure the integrity of every single vote cast."
    },
    {
      icon: Globe,
      title: "Accessible Everywhere",
      description: "Vote from anywhere in the world, at any time. No more long queues or geographical barriers to participation."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-xl text-(--purple-deep) mb-4">
            Our Vision
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            We envision a world where voting is simple, secure, and accessible to everyone, 
            powered by blockchain technology.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-(--purple-bg) to-white border border-(--purple-lighter)/20 hover:border-(--purple-primary)/40 transition-all duration-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-xl bg-white shadow-md group-hover:shadow-lg transition-shadow">
                <point.icon className="w-8 h-8 text-(--purple-primary)" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-(--purple-deep) mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {point.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-(--purple-light)/10 rounded-bl-full -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}