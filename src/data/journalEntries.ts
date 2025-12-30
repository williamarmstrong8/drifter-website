export interface ArticleSection {
  id: string;
  title: string;
}

export interface ArticlePhoto {
  url: string;
  caption?: string;
  alt?: string;
}

export interface ArticleQuote {
  text: string;
  author?: string;
}

export interface ArticleNote {
  text: string;
  type?: "tip" | "reflection" | "fact";
}

export interface ArticleContent {
  sections: ArticleSection[];
  paragraphs: Array<{
    sectionId: string;
    content: string;
    photos?: ArticlePhoto[];
    quotes?: ArticleQuote[];
    notes?: ArticleNote[];
  }>;
}

export type JournalTag = "Study Abroad" | "Europe Guides" | "Travel Tips" | "Accommodation Reviews";

export interface JournalEntry {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  datePosted: string; // Full date for posting
  excerpt: string;
  content?: ArticleContent;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  tags: JournalTag[];
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
    datePosted: "March 15, 2024",
    excerpt: "The wind here doesn't just blow — it tells stories. Ancient ones, carried across glaciers and through valleys that have witnessed millennia of silence.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80",
    author: {
      name: "Elena Vásquez",
      role: "Explorer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    },
    readTime: "8 min read",
    tags: ["Travel Tips"],
    coordinates: { lat: -50.9423, lng: -73.4068 },
    content: {
      sections: [
        { id: "arrival", title: "The Arrival" },
        { id: "wind", title: "Listening to the Wind" },
        { id: "glaciers", title: "Ancient Ice" },
        { id: "reflection", title: "What the Silence Taught Me" }
      ],
      paragraphs: [
        {
          sectionId: "arrival",
          content: "I arrived in Torres del Paine on a day when the clouds hung low, pressing against the peaks like a heavy blanket. The journey here had been long—three flights, a bus ride through winding mountain roads, and finally, a hike that left my legs trembling. But as I stepped out of the van and felt that first gust of Patagonian wind, I knew I had arrived somewhere that would change me."
        },
        {
          sectionId: "arrival",
          content: "The wind here doesn't just blow—it speaks. It carries with it stories from glaciers that have been melting for thousands of years, from valleys that have witnessed the slow dance of tectonic plates, from peaks that have watched civilizations rise and fall. Standing there, I felt small in the best possible way.",
          photos: [{
            url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80",
            caption: "First view of Torres del Paine from the trailhead",
            alt: "Torres del Paine mountains"
          }]
        },
        {
          sectionId: "wind",
          content: "On my second day, I woke before dawn to hike to the base of the towers. The wind was my constant companion, sometimes a gentle whisper, sometimes a howling force that pushed against my body with such strength I had to lean into it. I learned to listen to its different voices—the soft rustle through the lenga trees, the sharp whistle through rock crevices, the deep roar across the open plains.",
          quotes: [{
            text: "The wind doesn't just move through Patagonia—it moves through you. It strips away everything that doesn't matter and leaves only what's essential.",
            author: "Local guide, María"
          }]
        },
        {
          sectionId: "wind",
          content: "I met María, a local guide who had been leading treks here for twenty years. She told me that the wind has a name in the local Mapuche language—Puelche—and that it's considered a living force, not just weather. 'The wind remembers,' she said, 'and if you listen carefully, it will share its memories with you.'",
          notes: [{
            text: "The Puelche wind is a warm, dry wind that descends from the Andes. It's known for its strength and unpredictability.",
            type: "fact"
          }]
        },
        {
          sectionId: "glaciers",
          content: "The glaciers here are ancient storytellers. I spent an afternoon sitting by Grey Glacier, watching massive chunks of ice calve off and crash into the milky turquoise water below. Each crack and rumble felt like the earth itself speaking—a language older than words, older than human memory.",
          photos: [{
            url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&q=80",
            caption: "Grey Glacier calving into the lake",
            alt: "Glacier calving"
          }]
        },
        {
          sectionId: "glaciers",
          content: "Scientists say these glaciers are retreating, melting at an unprecedented rate. But standing there, feeling the cold air that had been trapped in ice for millennia, I felt connected to something vast and timeless. The ice was teaching me about impermanence—about how even the most permanent-seeming things are in constant motion.",
          notes: [{
            text: "The Grey Glacier is part of the Southern Patagonian Ice Field, the third largest reserve of fresh water in the world.",
            type: "fact"
          }]
        },
        {
          sectionId: "reflection",
          content: "On my last morning, I sat on a rock overlooking the towers and let the wind wash over me. I thought about all the places I'd been, all the stories I'd collected, and realized that this journey wasn't just about seeing new landscapes—it was about learning to listen.",
          quotes: [{
            text: "Travel isn't about the places you go—it's about who you become when you're there."
          }]
        },
        {
          sectionId: "reflection",
          content: "The wind had stripped away my expectations, my plans, my need to control. It had left me with something more valuable: a sense of wonder, a connection to the natural world, and the understanding that some stories can only be heard in silence.",
          notes: [{
            text: "I'll be back. This place has become part of me now, and I know I'll return to listen to what else the wind has to say.",
            type: "reflection"
          }]
        }
      ]
    }
  },
  {
    id: "morocco-blue-city",
    title: "Lost in Blue",
    location: "Chefchaouen",
    country: "Morocco",
    date: "February 2024",
    datePosted: "February 22, 2024",
    excerpt: "Every corner turned reveals another shade of blue. The medina breathes in cerulean and exhales in cobalt, a living canvas painted by generations.",
    image: "https://images.unsplash.com/photo-1553899017-5ead8d0c63b0?w=1200&q=80",
    author: {
      name: "Marcus Chen",
      role: "Photographer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    readTime: "6 min read",
    tags: ["Europe Guides", "Travel Tips"],
    coordinates: { lat: 35.1686, lng: -5.2636 },
    content: {
      sections: [
        { id: "first-sight", title: "First Sight" },
        { id: "colors", title: "A City of Blue" },
        { id: "people", title: "The People" },
        { id: "departure", title: "Leaving Blue Behind" }
      ],
      paragraphs: [
        {
          sectionId: "first-sight",
          content: "I arrived in Chefchaouen by bus from Tangier, winding through the Rif Mountains. When the blue city first came into view, I thought my eyes were playing tricks on me. Every building, every wall, every step was painted in shades of blue—from the palest sky to the deepest ocean."
        },
        {
          sectionId: "colors",
          content: "The story goes that the Jewish refugees who settled here in the 1930s painted the city blue to represent the sky and heaven, a reminder of God's presence. Others say it's to keep mosquitoes away, or that blue represents water and life. Whatever the reason, the effect is magical.",
          photos: [{
            url: "https://images.unsplash.com/photo-1553899017-5ead8d0c63b0?w=1200&q=80",
            caption: "The iconic blue streets of Chefchaouen",
            alt: "Blue painted streets"
          }]
        },
        {
          sectionId: "people",
          content: "The people here are as warm as the colors are cool. I spent hours in the medina, getting lost intentionally, stopping to chat with shopkeepers, sharing mint tea with locals who invited me into their homes. The hospitality was overwhelming in the best way.",
          quotes: [{
            text: "In Chefchaouen, every door is a painting, every alley a gallery, and every person a story waiting to be told."
          }]
        },
        {
          sectionId: "departure",
          content: "Leaving was harder than I expected. The blue had seeped into my memory, and I knew I'd carry it with me. This city taught me that sometimes the most beautiful places are the ones that make you slow down, get lost, and truly see.",
          notes: [{
            text: "Best time to visit: Spring (March-May) for perfect weather and fewer crowds.",
            type: "tip"
          }]
        }
      ]
    }
  },
  {
    id: "norway-northern-lights",
    title: "Dancing with the Aurora",
    location: "Tromsø",
    country: "Norway",
    date: "January 2024",
    datePosted: "January 18, 2024",
    excerpt: "At 2 AM, the sky cracked open with ribbons of green light. We stood there, four strangers turned family, watching the universe put on its greatest show.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    author: {
      name: "Sofia Lindqvist",
      role: "Study Abroad",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    },
    readTime: "10 min read",
    tags: ["Study Abroad", "Europe Guides"],
    coordinates: { lat: 69.6492, lng: 18.9553 },
    content: {
      sections: [
        { id: "arrival", title: "Above the Arctic Circle" },
        { id: "waiting", title: "The Long Wait" },
        { id: "aurora", title: "When the Sky Danced" },
        { id: "aftermath", title: "Forever Changed" }
      ],
      paragraphs: [
        {
          sectionId: "arrival",
          content: "Tromsø in January is a study in contrasts. The sun barely rises, giving you just a few hours of twilight before darkness descends again. But this darkness is what I came for—the chance to see the Northern Lights, the Aurora Borealis, nature's most spectacular light show."
        },
        {
          sectionId: "waiting",
          content: "For three nights, we drove out of the city, away from light pollution, and waited. We huddled in the cold, drinking hot chocolate, sharing stories. Four strangers from different corners of the world, brought together by a shared dream of seeing the lights.",
          photos: [{
            url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
            caption: "Waiting for the aurora under the starry Arctic sky",
            alt: "Northern lights"
          }]
        },
        {
          sectionId: "aurora",
          content: "On the fourth night, at 2 AM, it happened. The sky cracked open. Ribbons of green light began to dance, first faint, then growing stronger. They swirled and twisted, painting the sky in colors I didn't know existed. Purple, pink, and green all mixed together in a cosmic ballet.",
          quotes: [{
            text: "The aurora doesn't just appear—it performs. And when it does, you understand why ancient people thought the gods were speaking.",
            author: "Our guide, Erik"
          }]
        },
        {
          sectionId: "aftermath",
          content: "We stood there for hours, until our fingers were numb and our faces were frozen, but none of us wanted to leave. In that moment, watching the universe put on its greatest show, I felt connected to something infinite. The four of us, strangers just days before, were now bound by this shared experience.",
          notes: [{
            text: "Best viewing months: September to March. Check aurora forecasts and be patient—nature doesn't follow schedules!",
            type: "tip"
          }]
        }
      ]
    }
  },
  {
    id: "japan-temple-dawn",
    title: "The Temple at Dawn",
    location: "Kyoto",
    country: "Japan",
    date: "December 2023",
    datePosted: "December 10, 2023",
    excerpt: "Before the tourists wake, before the city stirs, there's a moment when the temple belongs only to the monks, the moss, and the mist.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
    author: {
      name: "James Okonkwo",
      role: "Writer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80"
    },
    readTime: "7 min read",
    tags: ["Travel Tips"],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    content: {
      sections: [
        { id: "early-morning", title: "Before Dawn" },
        { id: "temple", title: "Entering the Sacred Space" },
        { id: "meditation", title: "A Moment of Stillness" },
        { id: "awakening", title: "The City Wakes" }
      ],
      paragraphs: [
        {
          sectionId: "early-morning",
          content: "I woke at 4:30 AM, before the alarm, pulled from sleep by something I couldn't name. The streets of Kyoto were empty, the only sound the distant hum of a delivery truck. I walked through the sleeping city toward Fushimi Inari, the temple of a thousand torii gates."
        },
        {
          sectionId: "temple",
          content: "Before the tourists wake, before the city stirs, there's a moment when the temple belongs only to the monks, the moss, and the mist. I arrived just as the first light was breaking, painting the sky in shades of lavender and rose.",
          photos: [{
            url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80",
            caption: "Fushimi Inari at dawn, before the crowds arrive",
            alt: "Temple gates at dawn"
          }]
        },
        {
          sectionId: "meditation",
          content: "Walking through the torii gates, I felt the weight of centuries. Each gate had been donated by a business, a prayer for prosperity. But in the early morning quiet, they felt less like requests and more like offerings—gratitude for the beauty of this moment, this place.",
          quotes: [{
            text: "In Japan, there's a word for the beauty found in impermanence: mono no aware. It's the gentle sadness of things passing, the awareness of their beauty precisely because they won't last."
          }]
        },
        {
          sectionId: "awakening",
          content: "As I descended, the city was beginning to wake. The first tourists were arriving, cameras in hand. But I carried with me that sacred hour, that moment when the temple was mine alone. Some experiences can't be photographed—they can only be felt, and remembered.",
          notes: [{
            text: "Arrive before 6 AM for the best experience. The temple is open 24/7, but the magic happens in those early hours.",
            type: "tip"
          }]
        }
      ]
    }
  },
  {
    id: "iceland-black-beach",
    title: "Where Fire Meets Ice",
    location: "Reynisfjara",
    country: "Iceland",
    date: "November 2023",
    datePosted: "November 28, 2023",
    excerpt: "Black sand beneath my feet, waves crashing with primal fury. This is where the earth reminds you it's still being born.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80",
    author: {
      name: "Elena Vásquez",
      role: "Explorer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    },
    readTime: "5 min read",
    tags: ["Europe Guides", "Travel Tips"],
    coordinates: { lat: 63.4054, lng: -19.0454 },
    content: {
      sections: [
        { id: "approach", title: "Approaching the Edge" },
        { id: "beach", title: "The Black Beach" },
        { id: "waves", title: "Primal Forces" },
        { id: "reflection", title: "Earth's Reminder" }
      ],
      paragraphs: [
        {
          sectionId: "approach",
          content: "Reynisfjara isn't just a beach—it's a place where you feel the raw power of the earth. As I approached, the wind picked up, carrying with it the salt spray and the sound of waves crashing against basalt columns that rose like organ pipes from the sea."
        },
        {
          sectionId: "beach",
          content: "The sand is black, volcanic, a reminder that this entire island was born from fire. I walked barefoot, feeling the cool grains between my toes, watching the contrast between the dark sand, the white foam of the waves, and the grey sky above.",
          photos: [{
            url: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80",
            caption: "The iconic black sand beach of Reynisfjara",
            alt: "Black sand beach"
          }]
        },
        {
          sectionId: "waves",
          content: "The waves here are dangerous—sneaker waves that can pull you out to sea in seconds. Signs warn visitors to stay back, but even from a safe distance, you can feel their power. Each crash is a reminder that nature doesn't care about human plans or schedules.",
          quotes: [{
            text: "Iceland doesn't just show you nature—it shows you nature at its most raw, most powerful, most indifferent to your existence."
          }]
        },
        {
          sectionId: "reflection",
          content: "Standing there, watching the waves crash against the ancient basalt, I understood something fundamental: this is where the earth reminds you it's still being born. Iceland is young, geologically speaking, and every geyser, every volcano, every black beach is proof that creation is an ongoing process.",
          notes: [{
            text: "Always respect the ocean here. Sneaker waves are real and dangerous. Stay at least 30 meters from the water's edge.",
            type: "tip"
          }]
        }
      ]
    }
  },
  {
    id: "peru-sacred-valley",
    title: "Echoes of the Ancients",
    location: "Sacred Valley",
    country: "Peru",
    date: "October 2023",
    datePosted: "October 12, 2023",
    excerpt: "The terraces climb impossibly high, carved by hands that understood something about this land that we've forgotten. Walking here feels like remembering.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
    author: {
      name: "Carlos Mendoza",
      role: "Adventurer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
    },
    readTime: "9 min read",
    tags: ["Travel Tips", "Accommodation Reviews"],
    coordinates: { lat: -13.3306, lng: -72.0800 },
    content: {
      sections: [
        { id: "journey", title: "The Journey In" },
        { id: "terraces", title: "Ancient Engineering" },
        { id: "connection", title: "Feeling the Connection" },
        { id: "wisdom", title: "Remembering What Was Forgotten" }
      ],
      paragraphs: [
        {
          sectionId: "journey",
          content: "The road to the Sacred Valley winds through mountains that seem to touch the sky. I arrived in the early morning, when the mist still clung to the peaks and the sun was just beginning to warm the ancient stones."
        },
        {
          sectionId: "terraces",
          content: "The terraces at Moray and Ollantaytambo are engineering marvels. They climb impossibly high, each level creating a different microclimate. The Incas understood this land in a way that modern science is only beginning to appreciate—they knew how to work with the mountains, not against them.",
          photos: [{
            url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80",
            caption: "The circular terraces of Moray, an ancient agricultural laboratory",
            alt: "Inca terraces"
          }]
        },
        {
          sectionId: "connection",
          content: "Walking among these terraces, I felt something I can only describe as recognition. Not the kind you get from seeing a photo, but something deeper—as if I was remembering something I'd never learned, connecting to a wisdom that predates written history.",
          quotes: [{
            text: "The Incas didn't build on the land—they built with it. Every stone, every terrace, every path was a conversation with the earth.",
            author: "Our guide, Miguel"
          }]
        },
        {
          sectionId: "wisdom",
          content: "We've forgotten so much. We've forgotten how to listen to the land, how to work with natural systems instead of against them. But places like this remind us. Walking here feels like remembering—remembering that we're part of something larger, something older, something wiser.",
          notes: [{
            text: "The Sacred Valley sits at a lower altitude than Cusco, making it a great place to acclimatize. Take your time and drink lots of water!",
            type: "tip"
          }]
        }
      ]
    }
  }
];
