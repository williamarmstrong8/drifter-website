import { Link } from "react-router-dom";
import { X, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Destination {
  title: string;
  country: string;
  lat: number;
  lng: number;
  journalId?: string;
  image?: string;
  excerpt?: string;
}

interface DestinationCardProps {
  destination: Destination | null;
  onClose: () => void;
}

const DestinationCard = ({ destination, onClose }: DestinationCardProps) => {
  if (!destination) return null;

  const journalId = destination.journalId;

  return (
    <div className="absolute top-4 left-4 z-40 pointer-events-none">
      <Card className="w-full max-w-sm relative pointer-events-auto shadow-2xl overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Image */}
        {destination.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        )}

        <CardHeader className="pb-3">
          <div>
            <CardTitle className="text-xl font-serif leading-tight">
              {destination.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              {destination.country}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          {destination.excerpt && (
            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
              {destination.excerpt}
            </p>
          )}

          {/* Coordinates */}
          <div className="text-sm text-muted-foreground pt-2 border-t border-border/50">
            <p className="font-handwriting text-xs mb-1">Coordinates</p>
            <p className="font-mono text-xs">
              {destination.lat.toFixed(4)}°, {destination.lng.toFixed(4)}°
            </p>
          </div>

          {/* Journal Link */}
          {journalId && (
            <div className="pt-2">
              <Link to={`/journal/${journalId}`}>
                <Button className="w-full group">
                  Read the Story
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationCard;
