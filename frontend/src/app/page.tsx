import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Vision } from "@/components/Vision"
import { Mission } from "@/components/Mission"
import { HowItWorks } from "@/components/HowItWorks"
import { Statistics } from "@/components/Statistics"
import { Team } from "@/components/Team"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Vision />
      <Mission />
      <HowItWorks />
      <Statistics />
      <Team />
      <FAQ />
      <Footer />
    </div>
  )
}