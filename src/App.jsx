import { Hero } from "./components/Hero";
import { Highlight } from "./components/Highlight";
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
    </main>
  )
}

export default Sentry.withProfiler(App)