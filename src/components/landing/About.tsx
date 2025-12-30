const About = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="lg:order-1">
            <div className="relative aspect-[5/3] overflow-hidden rounded-sm image-lift">
              <div
                className="absolute inset-0 bg-cover bg-center film-grain"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')`,
                }}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:order-2 space-y-6">
            <div>
              <p className="font-handwriting text-xl text-muted-foreground mb-4">
                Who we are
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
                A community of wanderers
              </h2>
            </div>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                We're a collective of storytellers, adventurers, and dreamers who believe that
                every journey shapes who we are. From hidden mountain trails to bustling city streets,
                we document the moments that matter.
              </p>
              <p>
                Our almanac is more than just travel guides—it's a living record of human connection,
                cultural discovery, and the quiet magic found in the spaces between destinations.
              </p>
              <p>
                Join us as we explore with intention, document with heart, and share the stories
                that make our world a little more beautiful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
