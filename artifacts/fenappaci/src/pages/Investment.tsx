import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, Factory, ShieldCheck, Zap } from "lucide-react";

export default function Investment() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* hero investment finance agriculture */}
      <PageHero 
        title="Agricultural Investment"
        subtitle="Discover high-yield investment opportunities in Ivory Coast's booming agricultural sector."
        backgroundImage="https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Why Invest in Ivory Coast?</h2>
            <p className="text-lg text-muted-foreground">
              As the world's leading producer of cocoa and a major exporter of cashew nuts, coffee, and palm oil, Ivory Coast offers unparalleled opportunities for agricultural investors looking for sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "High Growth Potential", desc: "Rapidly expanding markets for raw and processed agricultural goods.", icon: BarChart3 },
              { title: "Government Support", desc: "Favorable tax incentives and policies for foreign direct investment.", icon: ShieldCheck },
              { title: "Agro-Processing", desc: "Massive potential in the value-added processing sector locally.", icon: Factory },
              { title: "Infrastructure", desc: "Modernizing ports and transport networks facilitating global export.", icon: Zap },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Key Investment Sectors</h2>
              <div className="space-y-8 mt-10">
                {[
                  { title: "Cacao Value Chain", desc: "Investment in local chocolate production, processing facilities, and sustainable farming tech." },
                  { title: "Cashew Processing", desc: "High demand for localized processing plants to transform raw nuts before export." },
                  { title: "Modern Farming Tech", desc: "Irrigation systems, mechanization, and smart farming solutions for local cooperatives." }
                ].map((sector, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 bg-secondary rounded-full shrink-0"></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{sector.title}</h4>
                      <p className="text-gray-400">{sector.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* factory processing agriculture */}
              <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop" alt="Processing Facility" className="rounded-2xl shadow-2xl" />
              <div className="absolute inset-0 bg-primary/20 rounded-2xl mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Explore Opportunities?</h2>
          <p className="text-lg text-muted-foreground mb-8">Contact our investment advisory team to get detailed market reports and discuss potential projects.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full">
              Contact Investment Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
