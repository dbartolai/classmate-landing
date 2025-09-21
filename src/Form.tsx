// src/components/WaitlistForm.tsx
import React, { useState } from "react";
import "./Form.css";

const WaitlistForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="waitlist-form">

      {!submitted ? (
        <form
          action="https://tally.so/forms/wvkP80/response"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          className="form-container"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your school email"
            required
            className="form-input"
          />
          <button
            type="submit"
            className="form-submit"
          >
            Join Waitlist
          </button>
        </form>
      ) : (
        <div className="form-success">
          <div className="success-icon">🎉</div>
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
