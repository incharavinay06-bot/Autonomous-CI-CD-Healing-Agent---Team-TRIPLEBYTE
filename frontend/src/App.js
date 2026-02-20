import React, { useState } from "react";

const BASE_URL = "https://triplebyte-backend-production.up.railway.app";

const App = () => {
  const [form, setForm] = useState({ repo: "", team: "", leader: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/run-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_url: form.repo,
          team_name: form.team,
          leader_name: form.leader,
        }),
      });

      const text = await res.text();
      console.log("Raw response:", text);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = JSON.parse(text);
      setData(result);
    } catch (err) {
      console.error("Frontend error:", err);
      alert("Backend connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={mainHeadingStyle}>CI/CD HEALING AGENT</h1>
        <div style={subHeadingStyle}>
          Autonomous Agentic System for Real-time Code Repair
        </div>
      </header>

      {/* INPUT SECTION */}
      <div style={glassCard}>
        <div style={gridStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>GitHub Repository URL</label>
            <input
              style={inputStyle}
              placeholder="https://github.com/..."
              onChange={(e) =>
                setForm({ ...form, repo: e.target.value })
              }
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Team Name</label>
            <input
              style={inputStyle}
              placeholder="RIFT ORGANISERS"
              onChange={(e) =>
                setForm({ ...form, team: e.target.value })
              }
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Team Leader Name</label>
            <input
              style={inputStyle}
              placeholder="Saiyam Kumar"
              onChange={(e) =>
                setForm({ ...form, leader: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleRun}
            disabled={loading}
            style={loading ? disabledBtn : activeBtn}
          >
            {loading ? "AGENT RUNNING..." : "RUN AGENT"}
          </button>
        </div>
      </div>

      {data && (
        <div style={dashboardGrid}>
          {/* RUN SUMMARY */}
          <div style={glassCard}>
            <h3 style={cardTitleStyle}>Run Summary</h3>
            <p><b>Repository:</b> {form.repo}</p>
            <p><b>Team:</b> {form.team} | <b>Leader:</b> {form.leader}</p>
            <p><b>Branch:</b> {data.branch}</p>
            <p><b>Status:</b> {data.status}</p>
            <p><b>Total Time:</b> {data.execution_time}</p>
          </div>

          {/* SCORE */}
          <div style={{ ...glassCard, textAlign: "center" }}>
            <h3 style={cardTitleStyle}>Score</h3>
            <div style={{ fontSize: "4rem", fontWeight: "bold" }}>
              {data.score}
            </div>
          </div>

          {/* BUG TABLE */}
          <div style={{ ...glassCard, gridColumn: "span 2" }}>
            <h3 style={cardTitleStyle}>Fixes Applied</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Bug Type</th>
                  <th>Line</th>
                  <th>Commit</th>
                </tr>
              </thead>
              <tbody>
                {data.bugs?.map((bug, i) => (
                  <tr key={i}>
                    <td>{bug.file}</td>
                    <td>{bug.type}</td>
                    <td>{bug.line}</td>
                    <td>{bug.commit_message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- STYLES ---------- */

const containerStyle = {
  backgroundColor: "#020617",
  color: "#f8fafc",
  minHeight: "100vh",
  padding: "40px",
  fontFamily: "Inter, sans-serif",
};

const mainHeadingStyle = {
  fontSize: "3rem",
  fontWeight: "900",
  color: "#38bdf8",
};

const subHeadingStyle = {
  color: "#94a3b8",
  marginTop: "5px",
};

const glassCard = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "0.75rem",
  color: "#38bdf8",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  backgroundColor: "#020617",
  color: "white",
};

const activeBtn = {
  padding: "14px",
  borderRadius: "8px",
  backgroundColor: "#0284c7",
  color: "white",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const disabledBtn = {
  ...activeBtn,
  backgroundColor: "#475569",
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px",
  marginTop: "40px",
};

const cardTitleStyle = {
  color: "#38bdf8",
  fontSize: "0.85rem",
  textTransform: "uppercase",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

export default App;