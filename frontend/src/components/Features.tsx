import { Vote, Lock, Zap, Users, BarChart3, CheckCircle } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Vote,
      title: "Blockchain-Powered",
      description: "Every vote is recorded on an immutable blockchain ledger, ensuring complete transparency and preventing any tampering or fraud."
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your vote is encrypted from the moment you cast it until it's counted, protecting your privacy and ensuring ballot secrecy."
    },
    {
      icon: Zap,
      title: "Real-Time Results",
      description: "See election results update instantly as votes are cast, with complete accuracy and no delays in counting."
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Simple, intuitive interface that anyone can use. No technical knowledge required - just connect your wallet and vote."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Access comprehensive voting statistics and analytics in real-time, with full transparency on voter turnout and results."
    },
    {
      icon: CheckCircle,
      title: "Verified Identity",
      description: "Secure identity verification ensures one person, one vote, while maintaining complete voter anonymity."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-(--purple-bg) rounded-full mb-4">
            <span className="text-sm font-semibold text-(--purple-primary)">FEATURES</span>
          </div>
          <h2 className="heading-xl text-(--purple-deep) mb-4">
            Why Choose QuickVote?
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge blockchain technology to deliver the most secure, 
            transparent, and accessible voting experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-(--purple-primary)/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon with Gradient Background */}
              <div className="mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-(--purple-primary) to-(--purple-light) shadow-lg group-hover:shadow-xl transition-shadow">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-(--purple-deep) mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-(--purple-light)/5 to-transparent rounded-bl-full -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}