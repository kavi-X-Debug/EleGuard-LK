import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/eleguard-logo.png";
import AuthCard from "@/components/AuthCard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EleGuard LK — Login & Register" },
      {
        name: "description",
        content:
          "EleGuard LK — Elephant Detect System. Sign in or register to protect your farm from human-elephant conflict.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative wildlife-themed background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 600px at 85% -10%, oklch(0.72 0.13 145.5 / 0.35), transparent 60%), radial-gradient(900px 500px at -10% 110%, oklch(0.503 0.143 145.5 / 0.30), transparent 60%), linear-gradient(180deg, oklch(0.98 0.01 145), oklch(0.94 0.02 145))",
        }}
      />
      {/* Subtle leaf/grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "var(--primary)",
        }}
      />

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Brand pane */}
          <section className="hidden flex-col items-start gap-6 lg:flex">
            <img src={logo} alt="EleGuard LK logo" className="h-40 w-auto drop-shadow-md" />
            <div>
              <h1 className="text-4xl font-bold leading-tight text-foreground">
                Elephant Detect <span className="text-primary">System</span>
              </h1>
              <p className="mt-3 max-w-md text-base text-muted-foreground">
                Protecting Farmers from Human-Elephant Conflict — early detection, instant alerts, and a safer tomorrow for farmers and wildlife.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Real-time geophone-powered alerts
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Field mapping &amp; sensor monitoring
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Multi-language support — Sinhala, Tamil, English
              </li>
            </ul>
          </section>

          {/* Auth pane */}
          <section className="w-full">
            <div
              className="rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur-xl sm:p-8"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              {/* Mobile header */}
              <div className="mb-6 flex flex-col items-center text-center lg:hidden">
                <img src={logo} alt="EleGuard LK logo" className="h-20 w-auto" />
                <h1 className="mt-2 text-xl font-bold text-foreground">
                  Elephant Detect System
                </h1>
                <p className="text-xs text-muted-foreground">
                  Protecting Farmers from Human-Elephant Conflict
                </p>
              </div>

              <AuthCard />

              <p className="mt-6 text-center text-[11px] text-muted-foreground">
                © {new Date().getFullYear()} EleGuard LK · Protecting Farms, Preserving Wildlife
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
