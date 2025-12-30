import { Link } from "react-router-dom";
import { journalEntries } from "@/data/journalEntries";

const JournalHighlights = () => {
  const featuredEntries = journalEntries.slice(0, 1);

  return (
    <section className="py-20 md:py-32 bg-card">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mb-16">
          <p className="font-handwriting text-xl text-muted-foreground mb-2">
            Stories from the road
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Featured Entries
          </h2>
        </div>

        {/* Editorial Layout */}
        <div className="space-y-24 md:space-y-32">
          {featuredEntries.map((entry, index) => (
            <Link
              to={`/journal/${entry.id}`}
              key={entry.id}
              className="group block"
            >
              <article
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image Side */}
                <div
                  className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm image-lift">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 film-grain"
                      style={{ backgroundImage: `url('${entry.image}')` }}
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                  </div>
                </div>

                {/* Text Side */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1 lg:text-right" : "lg:order-2"
                  } space-y-4 md:space-y-6`}
                >
                  {/* Meta */}
                  <div
                    className={`flex items-center gap-3 text-muted-foreground ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    <span className="font-handwriting text-lg">
                      {entry.date}
                    </span>
                    <span className="w-8 h-px bg-border" />
                    <span className="text-sm uppercase tracking-wider">
                      {entry.country}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {entry.title}
                  </h3>

                  {/* Location */}
                  <p className="text-muted-foreground font-medium">
                    {entry.location}
                  </p>

                  {/* Excerpt */}
                  <p className="text-foreground/80 text-lg leading-relaxed max-w-lg">
                    {entry.excerpt}
                  </p>

                  {/* Author */}
                  <div
                    className={`flex items-center gap-3 pt-4 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    <img
                      src={entry.author.avatar}
                      alt={entry.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className={index % 2 === 1 ? "lg:text-right" : ""}>
                      <p className="text-sm font-medium text-foreground">
                        {entry.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.author.role}
                      </p>
                    </div>
                  </div>

                  {/* Read More Indicator */}
                  <div
                    className={`flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      index % 2 === 1 ? "lg:justify-end" : ""
                    }`}
                  >
                    <span className="text-sm font-medium">Read the story</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalHighlights;
