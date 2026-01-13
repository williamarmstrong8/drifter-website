import { useParams, Link } from "react-router-dom";
import { journalEntries, JournalEntry } from "@/data/journalEntries";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Navigation from "@/components/layout/Navigation";

const JournalEntryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const found = journalEntries.find((e) => e.id === id);
    setEntry(found || null);
  }, [id]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-6 md:px-12 lg:px-20 text-center">
          <h1 className="font-serif text-4xl mb-4">Entry Not Found</h1>
          <Link to="/journal" className="text-primary hover:underline">
            Return to Journal
          </Link>
        </div>
      </div>
    );
  }

  const relatedEntries = journalEntries
    .filter((e) => e.id !== entry.id)
    .slice(0, 3);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 film-grain"
          style={{ backgroundImage: `url('${entry.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Header Section */}
      <header className="px-6 md:px-12 lg:px-20 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{entry.datePosted}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{entry.readTime}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="uppercase tracking-wider">{entry.country}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            {entry.title}
          </h1>

          {/* Location */}
          <p className="text-lg text-muted-foreground mb-8">
            {entry.location}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <img
              src={entry.author.avatar}
              alt={entry.author.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-border"
            />
            <div>
              <p className="font-medium text-foreground">{entry.author.name}</p>
              <p className="text-sm text-muted-foreground">{entry.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Article - Left Side */}
            <article className="lg:col-span-2">
              <Card className="border-border/50">
                <CardContent className="p-8 md:p-12">
                  {entry.content ? (
                    <div className="max-w-none">
                      {entry.content.paragraphs.map((para, index) => {
                        const section = entry.content!.sections.find(
                          (s) => s.id === para.sectionId
                        );
                        const isFirstInSection =
                          index === 0 ||
                          entry.content!.paragraphs[index - 1].sectionId !==
                            para.sectionId;

                        return (
                          <div key={index} className="mb-8">
                            {/* Section Heading */}
                            {isFirstInSection && section && (
                              <h2
                                id={section.id}
                                className="font-serif text-3xl md:text-4xl text-foreground mt-12 mb-6 first:mt-0 scroll-mt-24"
                              >
                                {section.title}
                              </h2>
                            )}

                            {/* Paragraph Content */}
                            <p className="text-foreground/90 text-lg leading-relaxed mb-6 whitespace-pre-line">
                              {para.content}
                            </p>

                            {/* Photos */}
                            {para.photos && para.photos.length > 0 && (
                              <div className="space-y-4 my-8">
                                {para.photos.map((photo, photoIndex) => {
                                  // Determine aspect ratio: use photo.orientation if specified, otherwise use default logic
                                  const isVertical = photo.orientation === "vertical" || 
                                    (photo.orientation === undefined && para.photos && para.photos.length === 1);
                                  const isSquare = photo.orientation === "square";
                                  
                                  let aspectRatio: string;
                                  let containerClass = "my-8";
                                  
                                  if (isSquare) {
                                    aspectRatio = "aspect-square";
                                    containerClass += " max-w-md mx-auto";
                                  } else if (isVertical) {
                                    aspectRatio = "aspect-[4/5]";
                                    containerClass += " max-w-sm mx-auto";
                                  } else {
                                    aspectRatio = "aspect-video";
                                  }
                                  
                                  return (
                                    <figure key={photoIndex} className={containerClass}>
                                      <div className={`relative overflow-hidden rounded-sm image-lift ${aspectRatio}`}>
                                        <img
                                          src={photo.url}
                                          alt={photo.alt || photo.caption || ""}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      {photo.caption && (
                                        <figcaption className="mt-3 text-sm text-muted-foreground italic text-center">
                                          {photo.caption}
                                        </figcaption>
                                      )}
                                    </figure>
                                  );
                                })}
                              </div>
                            )}

                            {/* Quotes */}
                            {para.quotes && para.quotes.length > 0 && (
                              <div className="space-y-4 my-8">
                                {para.quotes.map((quote, quoteIndex) => (
                                  <blockquote
                                    key={quoteIndex}
                                    className="border-l-4 border-primary pl-6 py-4 my-8 bg-card rounded-r-sm"
                                  >
                                    <p className="text-xl font-serif text-foreground/90 italic mb-2">
                                      "{quote.text}"
                                    </p>
                                    {quote.author && (
                                      <cite className="text-sm text-muted-foreground not-italic">
                                        — {quote.author}
                                      </cite>
                                    )}
                                  </blockquote>
                                ))}
                              </div>
                            )}

                            {/* Notes */}
                            {para.notes && para.notes.length > 0 && (
                              <div className="space-y-3 my-6">
                                {para.notes.map((note, noteIndex) => (
                                  <div
                                    key={noteIndex}
                                    className={`p-4 rounded-sm border ${
                                      note.type === "tip"
                                        ? "bg-primary/5 border-primary/20"
                                        : note.type === "fact"
                                        ? "bg-accent/5 border-accent/20"
                                        : "bg-muted/30 border-border"
                                    }`}
                                  >
                                    <p className="text-sm text-foreground/80 leading-relaxed">
                                      {note.type === "tip" && (
                                        <span className="font-semibold text-primary mr-2">
                                          💡 Tip:
                                        </span>
                                      )}
                                      {note.type === "fact" && (
                                        <span className="font-semibold text-accent mr-2">
                                          📚 Fact:
                                        </span>
                                      )}
                                      {note.type === "reflection" && (
                                        <span className="font-semibold text-muted-foreground mr-2">
                                          ✍️ Reflection:
                                        </span>
                                      )}
                                      {note.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="max-w-none">
                      <p className="text-foreground/90 text-lg leading-relaxed">
                        {entry.excerpt}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </article>

            {/* Sidebar - Right Side */}
            <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* In This Article */}
              {entry.content && entry.content.sections.length > 0 && (
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-foreground mb-4">
                      In This Article
                    </h3>
                    <nav className="space-y-2">
                      {entry.content.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-4"
                        >
                          {section.title}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Related Articles */}
              {relatedEntries.length > 0 && (
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl text-foreground mb-4">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedEntries.map((related) => (
                        <Link
                          key={related.id}
                          to={`/journal/${related.id}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm">
                              <img
                                src={related.image}
                                alt={related.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {related.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {related.excerpt}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <span>{related.date}</span>
                                <span>•</span>
                                <span>{related.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-20 mt-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="font-serif text-foreground hover:text-primary transition-colors">
            Destination Drifters
          </Link>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/journal" className="hover:text-foreground transition-colors">
              Journal
            </Link>
            <Link to="/destinations" className="hover:text-foreground transition-colors">
              Destinations
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default JournalEntryPage;

