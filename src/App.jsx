import Features from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Highlight } from "./components/Highlight";
import { HowItWork } from "./components/HowItWork";
import { Model } from "./components/Model";
import { Navbar } from "./components/Navbar";
import * as Sentry from '@sentry/react'

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlight />
      <Model />
      <Features />
      <HowItWork />
      <Footer />
    </main>
  )
}

export default Sentry.withProfiler(App)