import { useState, useEffect } from "react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const activities = [
    { title: "Updated inventory counts after receiving supplier shipment", meta: "Inventory · Warehouse · 2026-04-29" },
    { title: "Uploaded packing list for INV-24031", meta: "Documents · Invoices · 2026-04-15" },
    { title: "Created invoice INV-24042 for Harborline Supplies Co.", meta: "Invoices · Sales · 2026-04-14" },
    { title: "Logged expense: Port handling & local transport", meta: "Payments · Expenses · 2026-04-10" },
    { title: "Marked invoice INV-24018 as paid", meta: "Payments · Invoices · 2026-04-03" },
  ];

  const quickActions = [
    { title: "Open buyers list", sub: "Click a row to view buyer profile + transactions", badge: "Buyers" },
    { title: "Review invoices", sub: "Paid / Unpaid status badges + detail view", badge: "Invoices" },
    { title: "Payments workspace", sub: "Mark invoices paid + add expenses (UI only)", badge: "Payments" },
    { title: "Inventory snapshot", sub: "Items, quantity, price with clean table layout", badge: "Inventory" },
  ];

  const stats = [
    { label: "Total Money In", sub: "This month (paid invoices)", badge: "Healthy", badgeClass: "green", value: "$8,985", note: "Based on marked-paid invoices in 2026-04." },
    { label: "Total Money Out", sub: "This month (expenses)", badge: "Tracked", badgeClass: "gray", value: "$600", note: "Includes port handling, fuel, and ops costs." },
    { label: "Pending Invoices", sub: "Awaiting payment", badge: "Attention", badgeClass: "orange", value: "3", note: "Click Invoices to review statuses." },
    { label: "Role", sub: "Simulated access level", badge: "Staff", badgeClass: "gray", value: "Staff", note: "Finance actions are limited in Payments.", large: true },
  ];

  const navItems = ["Overview", "Buyers", "Workers", "Inventory", "Invoices", "Payments", "Documents"];

  return (
    <>
      <style>{`
        /* ── Global reset for dashboard ── */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0d47a1 0%, #1565c0 30%, #1976d2 60%, #1e88e5 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        /* ── Background blobs ── */
        .dash-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.18;
          pointer-events: none;
          animation: dashBlob 10s ease-in-out infinite;
          z-index: 0;
        }
        .dash-blob-1 { width: 500px; height: 500px; background: #42a5f5; top: -120px; left: -100px; animation-delay: 0s; }
        .dash-blob-2 { width: 600px; height: 600px; background: #1a237e; bottom: -150px; right: -120px; animation-delay: -4s; }
        .dash-blob-3 { width: 350px; height: 350px; background: #64b5f6; bottom: 20%; left: 20%; animation-delay: -7s; }
        .dash-blob-4 { width: 280px; height: 280px; background: #0d47a1; top: 40%; right: 25%; animation-delay: -2s; }

        @keyframes dashBlob {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(20px,-25px) scale(1.04); }
          66%  { transform: translate(-15px,15px) scale(0.97); }
          100% { transform: translate(0,0) scale(1); }
        }

        /* ── Sidebar ── */
        .dash-sidebar {
          width: 220px;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255,255,255,0.18);
          transform: translateX(-30px);
          opacity: 0;
          transition: transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease;
        }
        .dash-sidebar.visible {
          transform: translateX(0);
          opacity: 1;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 16px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .brand-icon {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.3);
          flex-shrink: 0;
        }
        .brand-name {
          font-size: 12px;
          font-weight: 600;
          color: white;
          line-height: 1.3;
        }
        .brand-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.55);
        }

        .sidebar-section-label {
          padding: 14px 16px 6px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
        }

        .sidebar-nav { flex: 1; padding: 4px 10px; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 2px;
          color: rgba(255,255,255,0.65);
          transition: background 0.2s, color 0.2s;
          border: 1px solid transparent;
        }
        .nav-item:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .nav-item.active {
          background: rgba(255,255,255,0.18);
          color: white;
          font-weight: 600;
          border-color: rgba(255,255,255,0.2);
        }

        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .user-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          margin-bottom: 8px;
        }
        .user-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          flex-shrink: 0;
        }
        .user-name { font-size: 12px; font-weight: 600; color: white; }
        .user-role { font-size: 10px; color: rgba(255,255,255,0.5); }
        .footer-btns { display: flex; gap: 6px; }
        .footer-btn {
          flex: 1;
          font-size: 11px;
          padding: 6px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .footer-btn:hover { background: rgba(255,255,255,0.18); color: white; }

        /* ── Main ── */
        .dash-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: auto;
          position: relative;
          z-index: 10;
        }

        /* ── Topbar ── */
        .dash-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.15);
          transform: translateY(-20px);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s, opacity 0.6s ease 0.1s;
        }
        .dash-topbar.visible { transform: translateY(0); opacity: 1; }

        .topbar-title { font-size: 15px; font-weight: 700; color: white; }
        .topbar-sub { font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 1px; }

        .topbar-right { display: flex; align-items: center; gap: 10px; }
        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          min-width: 220px;
        }
        .role-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          font-size: 12px;
          color: rgba(255,255,255,0.8);
        }
        .role-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }

        /* ── Content area ── */
        .dash-content { padding: 20px 24px; }

        /* ── Stat cards ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          padding: 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s;
        }
        .stat-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          transform: translateY(-2px) !important;
          border-color: rgba(255,255,255,0.35);
        }
        .stat-card.visible { opacity: 1; transform: translateY(0); }
        .stat-card.d1 { transition-delay: 0.2s; }
        .stat-card.d2 { transition-delay: 0.28s; }
        .stat-card.d3 { transition-delay: 0.36s; }
        .stat-card.d4 { transition-delay: 0.44s; }

        .stat-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
        .stat-label { font-size: 12px; font-weight: 600; color: white; }
        .stat-sub { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 2px; }

        .stat-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
          font-weight: 600;
        }
        .badge-green { background: rgba(134,239,172,0.2); color: #86efac; border: 1px solid rgba(134,239,172,0.3); }
        .badge-gray  { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.15); }
        .badge-orange{ background: rgba(253,186,116,0.2); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }

        .badge-dot { width: 6px; height: 6px; border-radius: 50%; }
        .dot-green  { background: #86efac; }
        .dot-gray   { background: rgba(255,255,255,0.45); }
        .dot-orange { background: #fbbf24; }

        .stat-value { font-size: 26px; font-weight: 700; color: white; margin: 4px 0; }
        .stat-value.large { font-size: 30px; }
        .stat-note { font-size: 10px; color: rgba(255,255,255,0.45); }

        /* ── Bottom grid ── */
        .bottom-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr 340px;
        }

        .glass-panel {
          border-radius: 16px;
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.18);
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .glass-panel.visible { opacity: 1; transform: translateY(0); }
        .glass-panel.d5 { transition-delay: 0.52s; }
        .glass-panel.d6 { transition-delay: 0.6s; }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .panel-title { font-size: 13px; font-weight: 700; color: white; }
        .panel-sub { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }

        .panel-btn {
          font-size: 11px;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .panel-btn:hover { background: rgba(255,255,255,0.2); color: white; }

        .panel-demo-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.08);
        }

        .activity-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .activity-row:last-child { border-bottom: none; }
        .activity-row:hover { background: rgba(255,255,255,0.06); }
        .activity-title { font-size: 12px; font-weight: 500; color: white; margin-bottom: 2px; }
        .activity-meta { font-size: 11px; color: rgba(255,255,255,0.45); }
        .logged-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          margin-left: 10px;
        }
        .logged-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); }

        .action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          transition: background 0.2s;
        }
        .action-row:last-child { border-bottom: none; }
        .action-row:hover { background: rgba(255,255,255,0.08); }
        .action-title { font-size: 12px; font-weight: 600; color: white; margin-bottom: 2px; }
        .action-sub { font-size: 11px; color: rgba(255,255,255,0.45); }
        .action-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
          margin-left: 10px;
          background: rgba(255,255,255,0.08);
        }

        /* ── Pulse dot on active nav ── */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          animation: pulse 2s ease-in-out infinite;
          margin-left: auto;
        }

        /* ── Number count-up shimmer on stat values ── */
        @keyframes shimmer {
          0% { opacity: 0.5; }
          60% { opacity: 1; }
          100% { opacity: 1; }
        }
        .stat-value { animation: shimmer 0.8s ease forwards; }
      `}</style>

      <div className="dash-root">
        {/* Background blobs */}
        <div className="dash-blob dash-blob-1" />
        <div className="dash-blob dash-blob-2" />
        <div className="dash-blob dash-blob-3" />
        <div className="dash-blob dash-blob-4" />

        {/* ── SIDEBAR ── */}
        <aside className={`dash-sidebar ${mounted ? "visible" : ""}`}>
          <div className="sidebar-brand">
            <div className="brand-icon" />
            <div>
              <p className="brand-name">AllOfTech Export</p>
              <p className="brand-sub">Management Dashboard</p>
            </div>
          </div>

          <p className="sidebar-section-label">Workspace</p>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item}
                className={`nav-item ${activeNav === item ? "active" : ""}`}
                onClick={() => setActiveNav(item)}
              >
                {item}
                {activeNav === item && <span className="pulse-dot" />}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar" />
              <div>
                <p className="user-name">Staff Account</p>
                <p className="user-role">owner@alloftech.demo</p>
              </div>
            </div>
            <div className="footer-btns">
              <button className="footer-btn">Sign out</button>
              <button className="footer-btn">Reset</button>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="dash-main">
          {/* Topbar */}
          <div className={`dash-topbar ${mounted ? "visible" : ""}`}>
            <div>
              <p className="topbar-title">Dashboard</p>
              <p className="topbar-sub">Overview · This month</p>
            </div>
            <div className="topbar-right">
              <div className="search-bar">
                🔍 Search buyers, invoices, documents...
              </div>
              <div className="role-pill">
                <span className="role-dot" /> Staff
              </div>
            </div>
          </div>

          <div className="dash-content">
            {/* Stat Cards */}
            <div className="stats-grid">
              {stats.map((s, i) => {
                const delay = ["d1","d2","d3","d4"][i];
                const badgeMap = { green: "badge-green", gray: "badge-gray", orange: "badge-orange" };
                const dotMap = { green: "dot-green", gray: "dot-gray", orange: "dot-orange" };
                return (
                  <div key={s.label} className={`stat-card ${delay} ${mounted ? "visible" : ""}`}>
                    <div className="stat-card-top">
                      <div>
                        <p className="stat-label">{s.label}</p>
                        <p className="stat-sub">{s.sub}</p>
                      </div>
                      <span className={`stat-badge ${badgeMap[s.badgeClass]}`}>
                        <span className={`badge-dot ${dotMap[s.badgeClass]}`} />
                        {s.badge}
                      </span>
                    </div>
                    <p className={`stat-value ${s.large ? "large" : ""}`}>{s.value}</p>
                    <p className="stat-note">{s.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Grid */}
            <div className="bottom-grid">
              {/* Recent Activity */}
              <div className={`glass-panel d5 ${mounted ? "visible" : ""}`}>
                <div className="panel-header">
                  <div>
                    <p className="panel-title">Recent activity</p>
                    <p className="panel-sub">Last actions recorded in the demo workspace</p>
                  </div>
                  <button className="panel-btn">View documents</button>
                </div>
                {activities.map((a, i) => (
                  <div key={i} className="activity-row">
                    <div>
                      <p className="activity-title">{a.title}</p>
                      <p className="activity-meta">{a.meta}</p>
                    </div>
                    <span className="logged-badge">
                      <span className="logged-dot" /> Logged
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className={`glass-panel d6 ${mounted ? "visible" : ""}`}>
                <div className="panel-header">
                  <div>
                    <p className="panel-title">Quick actions</p>
                    <p className="panel-sub">Fast navigation for client walkthrough</p>
                  </div>
                  <span className="panel-demo-badge">
                    <span className="logged-dot" /> Demo
                  </span>
                </div>
                {quickActions.map((q, i) => (
                  <div key={i} className="action-row">
                    <div>
                      <p className="action-title">{q.title}</p>
                      <p className="action-sub">{q.sub}</p>
                    </div>
                    <span className="action-badge">
                      <span className="logged-dot" /> {q.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}