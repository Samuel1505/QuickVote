import { Wallet, UserCheck, Vote, CheckCircle2 } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Link your digital wallet to verify your identity securely. We support all major wallet providers."
    },
    {
      number: "02",
      icon: UserCheck,
      title: "Verify Your Identity",
      description: "Complete a one-time identity verification to ensure you're eligible to vote. Your privacy is protected."
    },
    {
      number: "03",
      icon: Vote,
      title: "Cast Your Vote",
      description: "Browse active elections and cast your vote with a single click. Your vote is encrypted and recorded on the blockchain."
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Track & Verify",
      description: "Verify your vote was counted and watch real-time results. Full transparency, complete security."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-(--purple-bg) via-white to-(--purple-bg)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
            <span className="text-sm font-semibold text-(--purple-primary)">HOW IT WORKS</span>
          </div>
          <h2 className="heading-xl text-(--purple-deep) mb-4">
            Voting Made Simple
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            Four easy steps to participate in secure, transparent elections from anywhere in the world.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-(--purple-light)/20 via-(--purple-primary)/40 to-(--purple-light)/20"></div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative"
              >
                {/* Card */}
                <div className="relative p-8 rounded-2xl bg-white border-2 border-(--purple-lighter)/20 hover:border-(--purple-primary)/40 transition-all duration-300 hover:shadow-xl group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-(--purple-primary) to-(--purple-light) flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 pt-4">
                    <div className="inline-flex p-4 rounded-xl bg-(--purple-bg) group-hover:bg-gradient-to-br group-hover:from-(--purple-primary)/10 group-hover:to-(--purple-light)/10 transition-all">
                      <step.icon className="w-8 h-8 text-(--purple-primary)" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-(--purple-deep) mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 text-(--purple-primary)/40">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to experience the future of voting?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-(--purple-primary) to-(--purple-light) text-white font-semibold rounded-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}