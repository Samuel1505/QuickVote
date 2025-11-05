import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Vision } from "@/components/Vision"
import { Mission } from "@/components/Mission"
import { Team } from "@/components/Team"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Vision />
      <Mission />
      <Team />
    </div>
  )
}