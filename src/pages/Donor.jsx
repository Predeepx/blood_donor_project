import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Donor.css";

export default function Donor() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.bloodGroup || !form.phone || !form.city) {
      alert("Please fill all fields");
      return;
    }

    alert("Thank you for becoming a lifesaver 🩸");
  };

  return (
    <>
      <Navbar />

      {/* FORM SECTION */}
      <section className="donor-section">
        <div className="donor-card" data-aos="fade-up">
          <h2>Register as Donor</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <select name="bloodGroup" onChange={handleChange}>
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City / Location"
              onChange={handleChange}
            />

            <button type="submit">Register Now</button>
          </form>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="trust">
        <h2 data-aos="fade-up">Why Donate With QuickDonor?</h2>

        <div className="trust-grid">
          <div className="trust-item" data-aos="fade-up">
            <h3>✔ Verified Requests</h3>
            <p>We ensure genuine blood requests only.</p>
          </div>

          <div className="trust-item" data-aos="fade-up" data-aos-delay="200">
            <h3>✔ Instant SMS Alerts</h3>
            <p>Get notified when someone nearby needs help.</p>
          </div>

          <div className="trust-item" data-aos="fade-up" data-aos-delay="400">
            <h3>✔ Data Privacy</h3>
            <p>Your personal information is securely stored.</p>
          </div>
        </div>
      </section>
    </>
  );
}
