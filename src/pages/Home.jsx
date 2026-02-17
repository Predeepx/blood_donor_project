import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="animated-bg"></div>

        {/* Floating Blood Particles */}
        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Saving Lives with QuickDonor
            <span className="pulse-heart"> 🩸</span>
          </h1>

          <p className="hero-subtitle">
            Connecting blood donors with patients instantly.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/donor")}>
              Become a Donor
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/find-blood")}
            >
              Find Blood
            </button>
          </div>

          {/* ECG */}
          <div className="heartbeat-container">
            <svg
              className="heartbeat"
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <path d="M0,50 L50,50 L70,20 L90,80 L110,50 L200,50 L220,30 L240,70 L260,50 L500,50" />
            </svg>
          </div>
        </div>
      </section>

      
      {/* STORY SECTION */}
      <section className="story">
        <div className="story-content">
          <h2>Why QuickDonor Exists</h2>
          <p>
            Every 2 seconds, someone somewhere needs blood. In critical moments,
            minutes decide survival. QuickDonor was built to eliminate delay —
            connecting verified donors with patients instantly.
          </p>

          <p>
            We believe no family should struggle to find blood in emergencies.
            Technology can bridge that gap — and we are building that bridge.
          </p>
        </div>
      </section>
      {/* STATS SECTION */}
      <section className="stats">
        <div className="stat-card" data-aos="fade-up">
          <h2>1,250+</h2>
          <p>Total Donors</p>
        </div>

        <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
          <h2>980</h2>
          <p>Active Donors</p>
        </div>

        <div className="stat-card" data-aos="fade-up" data-aos-delay="400">
          <h2>340</h2>
          <p>Blood Requests</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Register</h3>
            <p>Donors securely create a verified profile.</p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Request</h3>
            <p>Patients submit blood requests in seconds.</p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Instant Alert</h3>
            <p>Nearby donors receive SMS notifications instantly.</p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Save Lives</h3>
            <p>Faster connections mean faster life-saving action.</p>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="impact">
        <div className="impact-content">
          <h2>Real Impact</h2>
          <p>
            Since launch, QuickDonor has reduced emergency blood search time by
            over 60%. Hospitals and volunteers trust our platform to deliver
            accurate, verified donor data.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Trusted by Families & Donors</h2>

        <div className="testimonial-cards">
          <div className="testimonial">
            <p>
              "QuickDonor helped us find O-negative blood within 20 minutes. It
              saved my father's life."
            </p>
            <span>— Priya K.</span>
          </div>

          <div className="testimonial">
            <p>
              "The fastest and most organized blood donation platform I've
              seen."
            </p>
            <span>— City Hospital</span>
          </div>

          <div className="testimonial">
            <p>
              "Being able to donate when someone truly needs it feels powerful."
            </p>
            <span>— Verified Donor</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>Be Part of the Lifesaving Network</h2>
        <button className="primary-btn" onClick={() => navigate("/donor")}>
          Join as a Donor
        </button>
      </section>
    </>
  );
}
