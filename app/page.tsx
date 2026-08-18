import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ClientWork from '@/components/ClientWork'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ClientWork />
      <Experience />
      <Education />
      <CTA />
      <Footer />
    </main>
  )
}
