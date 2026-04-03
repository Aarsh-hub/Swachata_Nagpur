import { Link } from "react-router-dom";
import { ArrowRight, Camera, MapPin, Bell, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const FEATURES = [
  { icon: Camera, title: "Photo-Based Reporting", desc: "Capture and upload visual evidence of civic or animal welfare issues instantly." },
  { icon: MapPin, title: "Location Tagging", desc: "Add the exact address so NGOs can locate and respond to the issue quickly." },
  { icon: Bell, title: "NGO Notifications", desc: "Reports are automatically forwarded to the nearest registered NGO for action." },
  { icon: BarChart3, title: "Status Tracking", desc: "Track your complaint through every stage from Reported to Resolved." },
];

const STEPS = [
  { num: "01", title: "Spot an Issue", desc: "See an injured animal, garbage pile, or damaged road? Open the app." },
  { num: "02", title: "Upload & Describe", desc: "Take a photo, select the category, and add the location address." },
  { num: "03", title: "NGO Takes Action", desc: "Your report reaches the right NGO who dispatches a team to resolve it." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container relative z-10 py-32">
          <div className="max-w-xl space-y-6 animate-fade-up">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground tracking-wide uppercase">
              Community Engagement Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-background leading-[1.1]">
              Report civic & animal welfare issues
            </h1>
            <p className="text-background/80 text-lg max-w-md leading-relaxed">
              Spot a problem in your neighbourhood? Upload a photo, tag the location, and alert the nearest NGO — all in under a minute.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="h-13 px-8 text-base gap-2">
                <Link to="/report">
                  Report an Issue <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 px-8 text-base border-background/30 text-background hover:bg-background/10 hover:text-background">
                <Link to="/track">Track Status</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">Three simple steps to make your community safer and cleaner.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="relative bg-card border border-border rounded-2xl p-8 opacity-0 animate-fade-up hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <span className="text-5xl font-display font-bold text-primary/15">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Built for Impact</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">Every feature designed to connect citizens with the help their community needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-6 opacity-0 animate-fade-up hover:shadow-lg hover:-translate-y-1 transition-all"
                style={{ animationDelay: `${0.2 + i * 0.08}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Be the change your city needs
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every report you submit brings your community one step closer to a cleaner, safer neighbourhood.
            </p>
            <Button asChild size="lg" className="h-13 px-10 text-base gap-2">
              <Link to="/report">
                Submit a Report <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 CivicGreen — Community Engagement Project</p>
          <p>Group 39 · Ramdeobaba University, Nagpur</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
