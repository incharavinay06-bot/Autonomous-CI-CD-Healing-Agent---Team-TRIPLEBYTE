import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({ repo: "", team: "", leader: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAgent = async () => {
    setLoading(true);
    try {
      const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const res = await fetch(`${API_BASE}/run-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_url: form.repo,
          team_name: form.team,
          leader_name: form.leader
        })
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("Backend Connection Error: Ensure FastAPI is running on port 8000");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={mainHeadingStyle}>CI/CD HEALING AGENT</h1>
        <div style={subHeadingStyle}>Autonomous Agentic System for Real-time Code Repair</div>
      </header>

      {/* 1. INPUT SECTION */}
      <div style={glassCard}>
        <div style={gridStyle}>
          <div style={inputGroup}><label style={labelStyle}>GitHub Repository URL</label>
            <input style={inputStyle} placeholder="https://github.com/..." onChange={e => setForm({...form, repo: e.target.value})} />
          </div>
          <div style={inputGroup}><label style={labelStyle}>Team Name</label>
            <input style={inputStyle} placeholder="RIFT ORGANISERS" onChange={e => setForm({...form, team: e.target.value})} />
          </div>
          <div style={inputGroup}><label style={labelStyle}>Team Leader Name</label>
            <input style={inputStyle} placeholder="Saiyam Kumar" onChange={e => setForm({...form, leader: e.target.value})} />
          </div>
          <button onClick={runAgent} disabled={loading} style={loading ? disabledBtn : activeBtn}>
            {loading ? "AGENT RUNNING..." : "RUN AGENT"}
          </button>
        </div>
      </div>

      {data && (
        <div style={dashboardGrid}>
          {/* 2. RUN SUMMARY CARD */}
          <div style={glassCard}>
            <h3 style={cardTitleStyle}>Run Summary</h3>
            <p style={textStyle}><b>Repository:</b> {form.repo}</p>
            <p style={textStyle}><b>Team:</b> {form.team} | <b>Leader:</b> {form.leader}</p>
            <p style={textStyle}><b>Branch:</b> <span style={{color: '#f472b6'}}>{data.branch}</span></p>
            <p style={textStyle}><b>CI/CD Status:</b> <span style={data.status === "PASSED" ? {color: '#4ade80'} : {color: '#f87171'}}>{data.status}</span></p>
            <p style={textStyle}><b>Total Time:</b> {data.execution_time}</p>
          </div>

          {/* 3. SCORE BREAKDOWN PANEL */}
          <div style={{...glassCard, border: '1px solid #38bdf8', textAlign: 'center'}}>
            <h3 style={cardTitleStyle}>Score Breakdown</h3>
            <div style={{fontSize: '4.5rem', fontWeight: 'bold', color: '#38bdf8', margin: '10px 0'}}>{data.score}</div>
            <div style={progressBarContainer}><div style={{...progressBar, width: '100%'}}></div></div>
            <p style={{fontSize: '0.8rem', color: '#94a3b8'}}>Base: 100 | Speed Bonus: +10 | Efficiency Penalty: -0</p>
          </div>

          {/* 4. FIXES APPLIED TABLE */}
          <div style={{...glassCard, gridColumn: 'span 2'}}>
            <h3 style={cardTitleStyle}>Fixes Applied Table</h3>
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderStyle}>
                  <th>File</th><th>Bug Type</th><th>Line Number</th><th>Commit Message</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.bugs.map((bug, i) => (
                  <tr key={i} style={{borderBottom: '1px solid #1e293b'}}>
                    <td style={tdStyle}>{bug.file}</td>
                    <td style={tdStyle}><span style={badgeStyle}>{bug.type}</span></td>
                    <td style={tdStyle}>{bug.line}</td>
                    <td style={tdStyle}><code style={{fontSize: '0.85rem'}}>{bug.commit_message}</code></td>
                    <td style={{...tdStyle, color: '#4ade80'}}>✓ Fixed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. CI/CD STATUS TIMELINE */}
          <div style={{...glassCard, gridColumn: 'span 2'}}>
            <h3 style={cardTitleStyle}>CI/CD Status Timeline</h3>
            {data.timeline.map((t, i) => (
              <div key={i} style={timelineItem}>
                <span><b>{t.step}</b> ({i+1}/5)<br/><small style={{color: '#64748b'}}>{t.time}</small></span>
                <span style={t.status === "PASSED" ? {color: '#4ade80', fontWeight: 'bold'} : {color: '#38bdf8', fontWeight: 'bold'}}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const containerStyle = { backgroundColor: "#020617", color: "#f8fafc", minHeight: "100vh", padding: "40px", fontFamily: "'Inter', sans-serif" };
const mainHeadingStyle = { fontSize: "3.5rem", fontWeight: "900", color: "#38bdf8", margin: "0" };
const subHeadingStyle = { color: "#94a3b8", fontSize: "1.2rem", marginTop: "5px" };
const glassCard = { background: "#0f172a", border: "1px solid #1e293b", padding: "30px", borderRadius: "16px" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", alignItems: "end" };
const inputGroup = { display: "flex", flexDirection: "column", gap: "8px" };
const labelStyle = { fontSize: "0.75rem", color: "#38bdf8", fontWeight: "bold" };
const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#020617", color: "white" };
const activeBtn = { padding: "14px", borderRadius: "8px", backgroundColor: "#0284c7", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" };
const disabledBtn = { ...activeBtn, backgroundColor: "#475569" };
const dashboardGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginTop: "40px" };
const cardTitleStyle = { color: "#38bdf8", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "20px" };
const textStyle = { marginBottom: "12px" };
const progressBarContainer = { height: "10px", backgroundColor: "#1e293b", borderRadius: "5px", overflow: "hidden" };
const progressBar = { height: "100%", backgroundColor: "#38bdf8" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const tableHeaderStyle = { textAlign: "left", color: "#64748b", fontSize: "0.8rem" };
const tdStyle = { padding: "15px 0" };
const badgeStyle = { backgroundColor: "#1e3a8a", color: "#60a5fa", padding: "4px 8px", borderRadius: "4px", fontSize: "0.7rem" };
const timelineItem = { display: "flex", justifyContent: "space-between", padding: "15px", backgroundColor: "#020617", borderRadius: "8px", marginBottom: "10px" };

export default App;