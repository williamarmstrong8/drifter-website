export interface JournalEntry {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const journalEntries: JournalEntry[] = [
  {
    id: "patagonia-wind-whispers",
    title: "Where the Wind Speaks",
    location: "Torres del Paine",
    country: "Patagonia, Chile",
    date: "March 2024",
    excerpt: "The wind here doesn't just blow — it tells stories. Ancient ones, carried across glaciers and through valleys that have witnessed millennia of silence.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80",
    author: {
      name: "Elena Vásquez",
      role: "Explorer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    },
    readTime: "8 min read",
    coordinates: { lat: -50.9423, lng: -73.4068 }
  },
  {
    id: "morocco-blue-city",
    title: "Lost in Blue",
    location: "Chefchaouen",
    country: "Morocco",
    date: "February 2024",
    excerpt: "Every corner turned reveals another shade of blue. The medina breathes in cerulean and exhales in cobalt, a living canvas painted by generations.",
    image: "https://images.unsplash.com/photo-1553899017-5ead8d0c63b0?w=1200&q=80",
    author: {
      name: "Marcus Chen",
      role: "Photographer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    readTime: "6 min read",
    coordinates: { lat: 35.1686, lng: -5.2636 }
  },
  {
    id: "norway-northern-lights",
    title: "Dancing with the Aurora",
    location: "Tromsø",
    country: "Norway",
    date: "January 2024",
    excerpt: "At 2 AM, the sky cracked open with ribbons of green light. We stood there, four strangers turned family, watching the universe put on its greatest show.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    author: {
      name: "Sofia Lindqvist",
      role: "Study Abroad",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    },
    readTime: "10 min read",
    coordinates: { lat: 69.6492, lng: 18.9553 }
  },
  {
    id: "japan-temple-dawn",
    title: "The Temple at Dawn",
    location: "Kyoto",
    country: "Japan",
    date: "December 2023",
    excerpt: "Before the tourists wake, before the city stirs, there's a moment when the temple belongs only to the monks, the moss, and the mist.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    author: {
      name: "James Okonkwo",
      role: "Writer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    },
    readTime: "7 min read",
    coordinates: { lat: 35.0116, lng: 135.7681 }
  },
  {
    id: "iceland-black-beach",
    title: "Where Fire Meets Ice",
    location: "Reynisfjara",
    country: "Iceland",
    date: "November 2023",
    excerpt: "Black sand beneath my feet, waves crashing with primal fury. This is where the earth reminds you it's still being born.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80",
    author: {
      name: "Elena Vásquez",
      role: "Explorer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    },
    readTime: "5 min read",
    coordinates: { lat: 63.4054, lng: -19.0454 }
  },
  {
    id: "peru-sacred-valley",
    title: "Echoes of the Ancients",
    location: "Sacred Valley",
    country: "Peru",
    date: "October 2023",
    excerpt: "The terraces climb impossibly high, carved by hands that understood something about this land that we've forgotten. Walking here feels like remembering.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
    author: {
      name: "Carlos Mendoza",
      role: "Adventurer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
    },
    readTime: "9 min read",
    coordinates: { lat: -13.3306, lng: -72.0800 }
  }
];
