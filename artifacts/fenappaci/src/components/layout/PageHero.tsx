import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, backgroundImage, children }: PageHeroProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden flex items-center justify-center min-h-[40vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
