import { PageHero } from "@/components/layout/PageHero";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Handshake, Globe2, Briefcase, ChevronRight } from "lucide-react";

export default function Partnership() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* hero partnership handshake business */}
      <PageHero 
        title="Partner With Us"
        subtitle="Build strong, mutually beneficial relationships with Ivory Coast's leading agricultural network."
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Types of Partnerships</h2>
            <p className="text-lg text-muted-foreground">
              We offer flexible partnership models designed to suit different business objectives, from direct trade to strategic long-term investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: "Trade Partner",
                desc: "For international importers, wholesalers, and distributors looking for reliable, high-quality agricultural supply.",
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              {
                icon: Briefcase,
                title: "Investment Partner",
                desc: "For entities looking to invest in farm mechanization, processing plants, or agricultural technology.",
                color: "bg-green-50 text-green-600 border-green-100"
              },
              {
                icon: Handshake,
                title: "Strategic/NGO Partner",
                desc: "For organizations focused on sustainable farming, fair trade, and rural community development.",
                color: "bg-orange-50 text-orange-600 border-orange-100"
              }
            ].map((type, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${type.color} card-hover-effect`}>
                <type.icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">{type.title}</h3>
                <p className="text-foreground/70 mb-8">{type.desc}</p>
                <Link href="/contact" className="inline-flex items-center font-semibold hover:underline">
                  Discuss Partnership <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g3377e8f4728da7b6d5c1b1a04502b6b574422d19b7eccaf6bb3118bdf1c7344f9f67c423d0091ddfa06500b8333433b5815956e6fdb8cbf8f2fda854f4c7ab0c_1280.jpg')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">The Partnership Process</h2>
          
          <div className="space-y-6 text-left max-w-2xl mx-auto">
            {[
              "Submit an initial inquiry outlining your business objectives.",
              "Consultation call with our trade/investment specialists.",
              "Due diligence and site visits (optional but recommended).",
              "Signing of Memorandum of Understanding (MoU) or Trade Contracts.",
              "Implementation and ongoing relationship management."
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/request">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 h-14 px-8 rounded-full text-lg shadow-xl">
                Start the Process
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
