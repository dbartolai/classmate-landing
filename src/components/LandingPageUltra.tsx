import { useEffect, useState } from 'react';
import '../styles/landingUltra.css';
import WaitlistForm from '../Form';

const LandingPageUltra = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsLoaded(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`landing-ultra ${isLoaded ? 'is-loaded' : ''}`}>
      <section className="hero-ultra">
        <div className="hero-bg" aria-hidden="true">
          <span className="bg-orb orb-a" />
          <span className="bg-orb orb-b" />
          <span className="bg-orb orb-c" />
          <span className="bg-shimmer" />
        </div>

        <div className="hero-wrapper">
          <div className="hero-copy">
            <img src="/classmate.png" alt="ClassMate logo" width="200px"/>
            <h1 className="hero-headline">
              ClassMate  <span className="headline-emphasis">Study Less <br/> Learn More</span>
            </h1>
            <p className="hero-subheadline">
              Join the waitlist to see how we are defining education in an AI-driven world.
            </p>
            <WaitlistForm/>
            
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-card primary-card">
              <span className="visual-label">Up next</span>
              <strong className="visual-value">Ohm's Law Homework</strong>
              <span className="visual-time">Due tomorrow · 10:00 AM</span>
            </div>

            <div className="visual-card secondary-card">
              <span className="visual-label">Proviciency Level</span>
              <strong className="visual-value">Stoichiometry: 8.34/10</strong>
              <span className="visual-pill">22% Increase</span>
            </div>

            <div className="visual-card tertiary-card">
              <span className="visual-label">Made for you</span>
              <strong className="visual-value">Calc 2: Chain Rule </strong>
              <span className="visual-time">Smart Quiz</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageUltra;
