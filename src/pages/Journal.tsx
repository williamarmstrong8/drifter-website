import { useState } from "react";
import { Link } from "react-router-dom";
import { journalEntries, JournalTag } from "@/data/journalEntries";
import Navigation from "@/components/layout/Navigation";
import { X } from "lucide-react";

const Journal = () => {
  const [selectedTags, setSelectedTags] = useState<JournalTag[]>([]);

  const allTags: JournalTag[] = ["Study Abroad", "Europe Guides", "Travel Tips", "Accommodation Reviews"];

  const toggleTag = (tag: JournalTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  const filteredEntries = (selectedTags.length === 0
    ? journalEntries
    : journalEntries.filter((entry) =>
        selectedTags.some((tag) => entry.tags.includes(tag))
      )
  ).sort((a, b) => {
    // Sort by datePosted in descending order (most recent first)
    const dateA = new Date(a.datePosted);
    const dateB = new Date(b.datePosted);
    return dateB.getTime() - dateA.getTime();
  });

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

      {/* Journal Catalog */}
      <main className="px-6 md:px-12 lg:px-20 pb-24">
        {/* Filter Section */}
        <div className="mb-12 -mt-8 md:-mt-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-card"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-primary/50 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
          {selectedTags.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Showing {filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"}
            </p>
          )}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" style={{ gridAutoFlow: 'dense' }}>
          {filteredEntries.map((entry, index) => {
            // Smart pattern: every 4th card (starting from index 0) is double-width
            // Only apply double-width if there are enough remaining entries to fill the gap
            const totalEntries = filteredEntries.length;
            const remainingEntries = totalEntries - index - 1;
            // Only make double-width if:
            // 1. It's every 4th card (index % 4 === 0)
            // 2. There are at least 2 more entries after this one (to fill potential gaps)
            // OR it's the first card and we have at least 3 total entries
            const isDoubleWidth = index % 4 === 0 && 
              (remainingEntries >= 2 || (index === 0 && totalEntries >= 3));
            
            return (
            <Link
              to={`/journal/${entry.id}`}
              key={entry.id}
              className={`group block ${isDoubleWidth ? 'md:col-span-2 lg:col-span-2' : ''}`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <article className="h-full bg-card rounded-sm border border-border/50 overflow-hidden hover:border-border transition-all duration-300 image-lift group-hover:shadow-lg">
                {/* Image */}
                <div className={`relative ${isDoubleWidth ? 'aspect-[16/10]' : 'aspect-[4/5]'} overflow-hidden`}>
                  <div
                    className={`absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-105 film-grain bg-center`}
                    style={{ backgroundImage: `url('${entry.image}')` }}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className={`p-6 space-y-3 ${isDoubleWidth ? 'flex flex-col justify-between min-h-[140px]' : ''}`}>
                  {/* Date & Location */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider">
                    <span className="font-handwriting">{entry.date}</span>
                    <span>{entry.country}</span>
                  </div>

                  {/* Location pin */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-px bg-primary" />
                    <span className="text-sm text-muted-foreground">{entry.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {entry.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
                    {entry.excerpt}
                  </p>

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-sm border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <img
                        src={entry.author.avatar}
                        alt={entry.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">{entry.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-medium">Read</span>
                      <span className="transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
            );
          })}
        </div>

        {/* End of catalog */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card rounded-full border border-border/50">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="font-handwriting text-muted-foreground">
              More entries being written...
            </p>
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
