import { Linkedin, Github, Mail } from "lucide-react"
import Image from "next/image"

export function Team() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Blockchain enthusiast with 10+ years in tech innovation and democratic systems.",
      image: "https://i.pravatar.cc/400?img=5",
      linkedin: "#",
      github: "#",
      email: "sarah@quickvote.com"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Expert in distributed systems and cryptography, formerly at leading blockchain companies.",
      image: "https://i.pravatar.cc/400?img=12",
      linkedin: "#",
      github: "#",
      email: "michael@quickvote.com"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Blockchain Developer",
      bio: "Smart contract specialist with a passion for building secure and scalable solutions.",
      image: "https://i.pravatar.cc/400?img=47",
      linkedin: "#",
      github: "#",
      email: "emily@quickvote.com"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      bio: "UX advocate focused on making complex technology simple and accessible for everyone.",
      image: "https://i.pravatar.cc/400?img=33",
      linkedin: "#",
      github: "#",
      email: "david@quickvote.com"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-xl text-(--purple-deep) mb-4">
            Meet Our Team
          </h2>
          <p className="text-lead text-gray-600 max-w-3xl mx-auto">
            A dedicated group of experts committed to revolutionizing the voting experience 
            through blockchain technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-(--purple-bg) to-white border border-(--purple-lighter)/20 hover:border-(--purple-primary)/40 transition-all duration-300 hover:shadow-xl">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-(--purple-deep)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Social Links - Appear on Hover */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={member.linkedin}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5 text-(--purple-primary)" />
                    </a>
                    <a 
                      href={member.github}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-5 h-5 text-(--purple-primary)" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5 text-(--purple-primary)" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-(--purple-deep) mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-(--purple-primary) mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-(--purple-light)/10 rounded-bl-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Want to join our mission?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-(--purple-primary) hover:bg-(--purple-deep) text-white font-semibold rounded-lg transition-colors"
          >
            Get in Touch
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}