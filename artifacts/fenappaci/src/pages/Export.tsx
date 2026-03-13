import { PageHero } from "@/components/layout/PageHero";
import { Ship, FileText, CheckSquare, PackageCheck } from "lucide-react";

export default function Export() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* hero cargo ship export port */}
      <PageHero 
        title="Export Process"
        subtitle="Seamless, transparent, and globally compliant export logistics from the Port of Abidjan to your destination."
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">How We Export</h2>
            <p className="text-lg text-muted-foreground">
              FENAPPACI handles the complexities of international trade so you don't have to. Our streamlined process ensures your goods arrive on time and in perfect condition.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "1. Order & Documentation", desc: "Contract signing, LC issuance, and preparation of proforma invoices." },
              { icon: CheckSquare, title: "2. Quality Inspection", desc: "SGS or independent quality verification before loading." },
              { icon: PackageCheck, title: "3. Packaging & Stuffing", desc: "Secure packaging according to international standards." },
              { icon: Ship, title: "4. Shipping & Logistics", desc: "FOB or CIF shipping via the autonomous port of Abidjan." },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-border/50 relative mt-8 md:mt-0">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center absolute -top-8 left-8 shadow-lg shadow-primary/30 border-4 border-white">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mt-8 mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-10 text-center">Required Documentation</h2>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
            <ul className="grid md:grid-cols-2 gap-6">
              {[
                "Commercial Invoice",
                "Bill of Lading (B/L)",
                "Certificate of Origin",
                "Phytosanitary Certificate",
                "Fumigation Certificate",
                "Quality & Weight Certificate (SGS)",
                "Packing List",
                "Export Declaration"
              ].map((doc, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span className="font-medium text-foreground">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-24 bg-foreground text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Global Reach</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
            We currently export our premium agricultural products to over 30 countries across Europe, Asia, and the Americas.
          </p>
          <div className="relative w-full max-w-4xl mx-auto h-[400px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
            {/* Using a high quality abstract network/map image instead of raw SVG for better visual impact */}
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&h=500&fit=crop" 
              alt="Global Network" 
              className="w-full h-full object-cover rounded-3xl opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white drop-shadow-xl bg-black/40 px-8 py-4 rounded-full backdrop-blur-md">Connecting CI to the World</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
