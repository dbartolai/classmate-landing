// src/components/WaitlistForm.tsx
import React, { useState } from "react";
import "./Form.css";

const WaitlistForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="waitlist-form">

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="form-container"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your school email"
            required
            className="form-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="form-submit"
            disabled={isLoading}
          >
            {isLoading ? "Joining..." : "Join Waitlist"}
          </button>
          {error && <p className="form-error" style={{ color: '#ff4444', fontSize: '14px', marginTop: '8px' }}>{error}</p>}
        </form>
      ) : (
        <div className="form-success">
          <p className="success-message">
            Thanks for joining the waitlist!
          </p>
          <p className="success-note">
            We'll notify you when ClassMate is ready.
          </p>
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
