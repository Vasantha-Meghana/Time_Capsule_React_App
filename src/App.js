import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [locked, setLocked] = useState(false);
  const [remaining, setRemaining] = useState("");

  const handleLock = () => {
    if (!message || !date) {
      alert("Please write a message and pick a date.");
      return;
    }

    const now = new Date();
    const futureDate = new Date(date);
    const diff = futureDate - now;

    if (diff <= 0) {
      alert("Please pick a future date!");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setRemaining(`${days} day(s) remaining`);
    setLocked(true);

    // For backend: send data to your Flask/Node server
    console.log("📨 Data to send:");
    console.log({ message, date, email, image, audio });
  };

  return (
    <div className="App">
      <h1>📅 Time Capsule</h1>
      <p className="tagline">Send a message to your future self</p>

      {!locked ? (
        <div className="form">
          <textarea
            placeholder="Write your message..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="file-label">
            📸 Attach an Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <label className="file-label">
            🎙️ Attach an Audio Note:
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </label>

          <button onClick={handleLock}>Lock Message 🔒</button>
        </div>
      ) : (
        <div className="locked">
          <h2>⏳ Message Locked!</h2>
          <p>Your message will unlock in:</p>
          <p className="countdown">{remaining}</p>
          <p className="preview">🔐 Message Hidden Until {date}</p>

          {image && (
            <div>
              <p>📎 Attached Image:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="attached"
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </div>
          )}

          {audio && (
            <div style={{ marginTop: "15px" }}>
              <p>🎧 Attached Audio:</p>
              <audio controls src={URL.createObjectURL(audio)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;