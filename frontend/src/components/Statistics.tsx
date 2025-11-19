import { TrendingUp, Users, Globe, Award } from "lucide-react"

export function Statistics() {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Active Voters",
      description: "Registered users participating in elections"
    },
    {
      icon: Vote,
      value: "200+",
      label: "Elections Held",
      description: "Successfully completed voting events"
    },
    {
      icon: Globe,
      value: "45+",
      label: "Countries",
      description: "Global reach across continents"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Uptime",
      description: "Reliable and always available"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-(--purple-deep) to-(--purple-primary) text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-xl text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lead text-(--purple-bg) max-w-3xl mx-auto">
            Join thousands of users who trust QuickVote for secure and transparent elections.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all group-hover:scale-110">
                <stat.icon className="w-10 h-10 text-white" />
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-5xl font-bold text-white block mb-1">
                  {stat.value}
                </span>
                <span className="text-xl font-semibold text-(--purple-bg)">
                  {stat.label}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-(--purple-lighter)">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-(--purple-bg)" />
            <span className="text-(--purple-bg) font-medium">
              Growing every day with your trust
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Vote({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}