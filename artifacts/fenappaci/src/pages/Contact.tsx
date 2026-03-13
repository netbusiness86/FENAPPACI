import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for generic contact form
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* hero office business contact */}
      <PageHero 
        title="Contact Us"
        subtitle="Get in touch with our team in Abidjan for any inquiries regarding products, partnerships, or investments."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
      />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">Head Office</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Location</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Abidjan Cocody Angré Château<br />
                    Immeuble BATIM – 2nd Floor – Door 216<br />
                    Côte d'Ivoire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Phone / WhatsApp</h4>
                  <div className="flex flex-col text-muted-foreground gap-1">
                    <a href="tel:+2250749012725" className="hover:text-primary transition-colors">+225 07 49 01 27 25</a>
                    <a href="tel:+2250545079715" className="hover:text-primary transition-colors">+225 05 45 07 97 15</a>
                    <a href="tel:+2250507329884" className="hover:text-primary transition-colors">+225 05 07 32 98 84</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Email</h4>
                  <a href="mailto:info@fenappaci.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@fenappaci.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Business Hours</h4>
                  <p className="text-muted-foreground">
                    Monday - Friday: 8:00 AM - 5:00 PM (GMT)<br />
                    Saturday: 9:00 AM - 1:00 PM (GMT)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input required className="bg-gray-50 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input required className="bg-gray-50 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" required className="bg-gray-50 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input required className="bg-gray-50 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea required className="bg-gray-50 min-h-[150px]" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white h-14" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

        </div>

        {/* Map */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-lg h-[400px] border border-border/50">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1852922115684!2d-3.993077685244588!3d5.396347396085526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1935c1cdcf4f5%3A0x631eb092c22ec2db!2sAngr%C3%A9%20Ch%C3%A2teau!5e0!3m2!1sen!2sus!4v1655000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="FENAPPACI Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
