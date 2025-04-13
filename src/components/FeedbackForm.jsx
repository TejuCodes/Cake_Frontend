import React, { useState } from "react";

const FeedbackForm = () => {
  // State for form fields and submission status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare feedback data
    const feedbackData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      // Send feedback data to the server
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error("HTTP error! Status: " + response.status);
      }

      // Parse the response
      const result = await response.json();

      // Handle success or error from the server
      if (result.success) {
        setSubmitted(true); // Mark as submitted
        setName(""); // Clear form fields
        setEmail("");
        setMessage("");
      } else {
        alert("Failed to submit feedback: " + result.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedbackmain">
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  </div>
  );
};

export default FeedbackForm;