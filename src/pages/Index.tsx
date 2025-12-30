import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/landing/Hero";
import ExplorationStrip from "@/components/landing/ExplorationStrip";
import JournalHighlights from "@/components/landing/JournalHighlights";
import InvitationFooter from "@/components/landing/InvitationFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ExplorationStrip />
      <JournalHighlights />
      <InvitationFooter />
    </div>
  );
};

export default Index;
