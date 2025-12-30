import { Link } from "react-router-dom";
import { journalEntries } from "@/data/journalEntries";
import Navigation from "@/components/layout/Navigation";

const Journal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          <p className="font-handwriting text-xl md:text-2xl text-muted-foreground mb-3">
            Field notes & reflections
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            The Journal
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Stories from the road, moments of wonder, and the quiet discoveries 
            that remind us why we wander.
          </p>
        </div>
      </header>

      {/* Journal Entries Stream */}
      <main className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Notebook spine decoration */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden lg:block" 
                 style={{ left: '80px' }} />
            
            {/* Entries */}
            <div className="space-y-16 md:space-y-24">
              {journalEntries.map((entry, index) => (
                <Link
                  to={`/journal/${entry.id}`}
                  key={entry.id}
                  className="group block"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <article className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-6 lg:gap-12">
                    {/* Date Column - Handwritten style */}
                    <div className="lg:text-right">
                      <time className="font-handwriting text-xl md:text-2xl text-muted-foreground block">
                        {entry.date}
                      </time>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-1 block">
                        {entry.country}
                      </span>
                    </div>

                    {/* Entry Content */}
                    <div className="space-y-4">
                      {/* Image */}
                      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm image-lift">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 film-grain"
                          style={{ backgroundImage: `url('${entry.image}')` }}
                        />
                        {/* Subtle color overlay on hover */}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                      </div>

                      {/* Text Content */}
                      <div className="pt-2">
                        {/* Location tag */}
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="inline-block w-4 h-px bg-primary mr-2 align-middle" />
                          {entry.location}
                        </p>

                        {/* Title */}
                        <h2 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                          {entry.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl">
                          {entry.excerpt}
                        </p>

                        {/* Author & Read Time */}
                        <div className="flex items-center gap-4 mt-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={entry.author.avatar}
                              alt={entry.author.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {entry.author.name}
                              </p>
                            </div>
                          </div>
                          <span className="text-muted-foreground/50">·</span>
                          <span className="text-sm text-muted-foreground">
                            {entry.readTime}
                          </span>
                        </div>

                        {/* Read indicator */}
                        <div className="flex items-center gap-2 mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm font-medium">Read entry</span>
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Divider */}
                  {index < journalEntries.length - 1 && (
                    <div className="mt-16 md:mt-24 lg:ml-[112px]">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="font-handwriting text-muted-foreground/40 text-lg">~</span>
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* End of entries */}
          <div className="mt-24 text-center">
            <p className="font-handwriting text-xl text-muted-foreground/60">
              More stories coming soon...
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/10" />
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-serif text-foreground hover:text-primary transition-colors">
            Destination Drifters
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/destinations" className="hover:text-foreground transition-colors">
              Destinations
            </Link>
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Journal;
