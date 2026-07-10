export interface EventConfig {
  eventName: string;
  tagline: string;
  description: string[];
  startDate: string;
  endDate: string;
  timezone: string;
  earlyBirdEndsAt: string;
  logo: string;
  showVideo: boolean;
  videoEmbedUrl?: string;

  credibilityChips: Array<{
    title: string;
    description: string;
  }>;

  agenda: Array<{
    day: string;
    title: string;
    sessions: string[];
  }>;

  speakers: Array<{
    name: string;
    title: string;
    image: string;
    bio: string;
  }>;

  tickets: {
    ga: {
      name: string;
      price: number;
      compareAtPrice: number;
      image: string;
      inclusions: string[];
      checkoutUrl: string;
      accentColor: string;
    };
    vip: {
      name: string;
      price: number;
      compareAtPrice: number;
      image: string;
      inclusions: string[];
      checkoutUrl: string;
      accentColor: string;
      badge: string;
    };
  };

  faq: Array<{
    question: string;
    answer: string;
  }>;

  footer: {
    privacyPolicyUrl: string;
  };
}

export const eventConfig: EventConfig = {
  eventName: "Content to Cash",
  tagline: "3 Day Live Virtual Challenge For Online Trainers",
  description: [
    "Learn the blueprint to turn your content into a client-generating machine and hit $50,000 per month",
    "Without any tech experience, funnels or fancy websites"
  ],
  startDate: "2026-03-12T00:00:00-05:00",
  endDate: "2026-03-14T23:59:59-05:00",
  timezone: "America/New_York",
  earlyBirdEndsAt: "2026-02-18T00:00:00-08:00",
  logo: "/ptd-logo-sm.webp",
  showVideo: true,
  videoEmbedUrl: "https://player.vimeo.com/video/1161157136",

  credibilityChips: [
    {
      title: "Live Virtual Event",
      description: "Join from anywhere in the world"
    },
    {
      title: "3 Days of Training",
      description: "Comprehensive content strategy"
    },
    {
      title: "Expert Instructors",
      description: "Learn from proven coaches"
    },
    {
      title: "Action-Oriented",
      description: "Walk away with a clear plan"
    }
  ],

  agenda: [
    {
      day: "Day 1",
      title: "The Content to Cash Blueprint",
      sessions: [
        "Generate massive attention using proven viral content frameworks that top fitness creators use to reach millions",
        "Build instant authority and a premium personal brand as an online fitness coach in 2026",
        "Understand what actually drives reach on Instagram — and why most coaches stay invisible despite posting consistently",
        "Engineer viral Instagram Reels by breaking down the exact structure, hooks, pacing, and psychology behind 100M+ views",
        "Stop posting content that only gets likes and start using content that converts",
        "Turn views and followers into $1,500+ clients with a repeatable monetization strategy",
        "Build a brand that attracts clients on autopilot, without chasing trends or relying on guesswork"
      ]
    },
    {
      day: "Day 2",
      title: "The Conversion System",
      sessions: [
        "Reverse-engineer what's already working by breaking down top-performing fitness coach profiles in real time",
        "Extract proven virality, positioning, and content tactics you can immediately apply to your own Instagram account",
        "Identify what's missing (or broken) in your current profile that's holding back reach, authority, and conversions",
        "Understand the complete system behind generating 900 sales calls per month with the IG Booking Funnel",
        "Learn how to turn Instagram traffic into booked calls at scale, without DMs turning into a full-time job",
        "See how content, profile optimization, and funnels work together as one cohesive client-acquisition machine",
        "Get live answers and tactical clarification during an extended Q&A with Brian Mark and Cole DaSilva",
        "Walk away knowing exactly how to implement what you've learned over the last 48 hours"
      ]
    },
    {
      day: "Day 3",
      title: "Scaling to $50k/Month and Beyond",
      sessions: [
        "Identify exactly why you're stuck below $50,000/month and what must change to break through that income ceiling",
        "Understand the mindset, strategy, and operational shifts required to scale to $50K+ months as an online fitness coach",
        "Master a proven sales call framework to close $3,000 clients in 45 minutes—without pressure, gimmicks, or chasing leads",
        "Learn how top closers structure conversations to increase close rate and average client value",
        "See the real roadmap to $150,000 months, including what systems, leverage, and team structure actually look like at that level",
        "Avoid the common scaling mistakes that keep coaches capped even with strong demand",
        "Get live, tactical feedback during hands-on content audits to dial in your bio, Reels, and overall profile",
        "Walk away with crystal-clear next steps to attract more clients, close them faster, and scale with confidence"
      ]
    }
  ],

  speakers: [
    {
      name: "Brian Mark",
      title: "Founder & Head Coach",
      image: "/brianimage2.png",
      bio: "Brian has helped hundreds of fitness professionals build thriving online businesses. He specializes in helping trainers transition from trading time for money to building scalable coaching programs that generate consistent revenue."
    },
    {
      name: "Cole DaSilva",
      title: "Co-Founder & Marketing Strategist",
      image: "/coleimage2.png",
      bio: "Cole is an expert in content marketing and client acquisition systems. He's known for creating simple, effective strategies that help coaches attract premium clients through organic content without complicated funnels or ads."
    }
  ],

  tickets: {
    ga: {
      name: "General Admission",
      price: 49,
      compareAtPrice: 99.99,
      image: "/gaticky.webp",
      inclusions: [
        "3 days of full day access",
        "10 sessions of proven content, lead generation, and sales tactics to hit $50K/month",
        "Insights from Cole and Brian who generate 100M+ views monthly on Instagram",
        "Implementation and breakdowns to get more followers, views, and clients in 2026"
      ],
      checkoutUrl: "https://go.pt-domination.com/orderformga",
      accentColor: "#3b82f6"
    },
    vip: {
      name: "VIP All-Access",
      price: 99,
      compareAtPrice: 199.99,
      image: "/vipticky.webp",
      inclusions: [
        "3 days of full day access",
        "10 sessions of proven content, lead generation, and sales tactics to hit $50K/month",
        "Insights from Cole and Brian who generate 100M+ views monthly on Instagram",
        "Implementation and breakdowns to get more followers, views, and clients in 2026",
        "Exclusive VIP Group coaching session with Brian Mark and Cole DaSilva ($1,000 value)",
        "Lifetime access to all session replays (available 30 days after event)"
      ],
      checkoutUrl: "https://go.pt-domination.com/orderformvip",
      accentColor: "#eab308",
      badge: "Limited spots available"
    }
  },

  faq: [
    {
      question: "What time are the sessions?",
      answer: "Thursday March 12th: 3:00 PM – 7:00 PM PST\nFriday March 13th: 3:00 PM – 7:00 PM PST\nSaturday March 14th: 3:00 PM – 8:00 PM PST"
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "If after the first day you don't believe you received enough value, let us know and we'll refund you. Period.\n\nSimply attend all sessions on Day 1, and if you decide not to continue, we'll refund every penny."
    },
    {
      question: "Where will the virtual event take place?",
      answer: "The event will be held on Zoom. You'll receive your private access link immediately after purchasing a ticket."
    },
    {
      question: "When is the VIP Group pre-coaching session?",
      answer: "A week before the event, we'll reach out with the exact day and time for the VIP Coaching Session."
    },
    {
      question: "Will there be replays?",
      answer: "General Admission tickets include access during the live event. VIP tickets include lifetime replay access so you can watch at your own pace."
    }
  ],

  footer: {
    privacyPolicyUrl: "https://pt-domination.com/privacy-policy/"
  }
};
