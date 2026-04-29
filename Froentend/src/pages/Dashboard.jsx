export default function Dashboard() {
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

  const badgeStyle = {
    green: "bg-green-100 text-green-800 border border-green-200",
    gray: "bg-gray-100 text-gray-600 border border-borderColor",
    orange: "bg-orange-100 text-orange-800 border border-orange-200",
  };

  const dotColor = {
    green: "bg-green-500",
    gray: "bg-gray-400",
    orange: "bg-orange-500",
  };

  return (
    <div className="flex min-h-screen bg-bgLight">

      {/* SIDEBAR */}
      <aside className="w-56 min-w-[220px] bg-card border-r border-borderColor flex flex-col">
        <div className="flex items-center gap-2.5 p-4 pb-3">
          <div className="w-9 h-9 bg-textMain rounded-lg" />
          <div>
            <p className="text-sm font-medium">AllOfTech Export Shipping</p>
            <span className="text-xs text-gray-400">Management Dashboard</span>
          </div>
        </div>

        <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-gray-400 font-medium">Workspace</p>

        <nav className="flex-1 px-2">
          {["Overview","Buyers","Workers","Inventory","Invoices","Payments","Documents"].map((item) => (
            <div key={item} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer mb-0.5 ${item === "Overview" ? "bg-bgLight text-textMain font-medium" : "text-gray-500 hover:bg-bgLight"}`}>
              {item}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-borderColor">
          <div className="flex items-center gap-2.5 p-2 rounded-xl border border-borderColor mb-2">
            <div className="w-8 h-8 rounded-full bg-bgLight border border-borderColor" />
            <div>
              <p className="text-xs font-medium">Staff Account</p>
              <span className="text-[11px] text-gray-400">Staff · owner@alloftech.demo</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button className="flex-1 text-xs py-1.5 rounded-lg border border-borderColor text-gray-500 hover:bg-bgLight">Sign out</button>
            <button className="flex-1 text-xs py-1.5 rounded-lg border border-borderColor text-gray-500 hover:bg-bgLight">Reset</button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderColor bg-card">
          <div>
            <p className="text-base font-medium">Dashboard</p>
            <span className="text-xs text-gray-400">Overview / This month</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-borderColor bg-bgLight text-xs text-gray-400 min-w-[220px]">
              🔍 Search buyers, invoices, documents...
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-borderColor text-xs">
              <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /> Staff
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {stats.map((s) => (
              <div key={s.label} className="bg-card border border-borderColor rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium">{s.label}</p>
                    <p className="text-[11px] text-gray-400">{s.sub}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full ${badgeStyle[s.badgeClass]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${dotColor[s.badgeClass]}`} />
                    {s.badge}
                  </span>
                </div>
                <p className={`font-medium my-1 ${s.large ? "text-3xl" : "text-2xl"}`}>{s.value}</p>
                <p className="text-[11px] text-gray-400">{s.note}</p>
              </div>
            ))}
          </div>

          {/* Bottom Grid */}
          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 360px" }}>
            {/* Recent Activity */}
            <div className="bg-card border border-borderColor rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-borderColor">
                <div>
                  <p className="text-sm font-medium">Recent activity</p>
                  <span className="text-xs text-gray-400">Last actions recorded in the demo workspace</span>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-borderColor hover:bg-bgLight">View documents</button>
              </div>
              {activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-borderColor last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-gray-400">{a.meta}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-borderColor text-gray-500 whitespace-nowrap ml-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" /> Logged
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-borderColor rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-borderColor">
                <div>
                  <p className="text-sm font-medium">Quick actions</p>
                  <span className="text-xs text-gray-400">Fast navigation for client walkthrough</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-borderColor text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" /> Demo
                </span>
              </div>
              {quickActions.map((q, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-borderColor last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{q.title}</p>
                    <p className="text-xs text-gray-400">{q.sub}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-borderColor text-gray-500 whitespace-nowrap ml-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" /> {q.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}