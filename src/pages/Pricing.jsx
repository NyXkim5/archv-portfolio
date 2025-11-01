export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Sandbox, 1 workspace, community support",
    },
    {
      name: "Team",
      price: "$49",
      desc: "Everything in Starter + 10 seats, audit log, SSO",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "SLA, on-prem/virtual private gateway, DLP",
    },
  ];
  return (
    <main className="min-h-screen bg-[#0b1220] text-zinc-100 p-8">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-xl border border-white/10 p-6">
            <div className="text-teal-300 font-semibold">{t.name}</div>
            <div className="text-3xl mt-2">
              {t.price}
              <span className="text-base text-zinc-400">
                {t.price === "Custom" ? "" : "/mo"}
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-300">{t.desc}</p>
            <button className="mt-6 w-full h-10 rounded-lg border border-teal-400/40 text-teal-200 hover:bg-teal-300/10">
              Get started
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
