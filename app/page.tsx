import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Works from '@/components/Works';
import Services from '@/components/Services';
import About from '@/components/About';
import Process from '@/components/Process';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
    </>
  );
}
