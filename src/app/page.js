import Home from './components/Home';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Hackathon from './components/Hackathon';
// import ContactUs from './components/ContactUs';

export default function HomePage() {
  return (
    <main>
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="hackathon">
        <Hackathon />
      </section>
      
      <section id="events">
        <Events />
      </section>
      
      {/* <section id="contact-us">
        <ContactUs />
      </section> */}
    </main>
  );
}
