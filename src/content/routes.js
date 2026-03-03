import { SITE_CONFIG } from './site-config.js';

export const ROUTE_ORDER = ['/', '/archive', '/armory', '/comms', '/devlog'];

export const ROUTES = {
  '/': {
    path: '/',
    title: 'Safehouse Arrival',
    assignmentLabel: 'Home Page',
    subtitle: 'Guest safety command center for immersive hospitality operations.',
    heroImage: '/assets/rooms/home-safehouse.svg',
    infoBlocks: [
      {
        heading: 'Mission',
        body: 'Deliver a premium survival-hospitality experience where every guest interaction feels immersive, safe, and unforgettable.'
      },
      {
        heading: 'Vision',
        body: 'Build the most memorable hospitality narrative platform by blending guest service standards with interactive biopunk storytelling.'
      },
      {
        heading: 'Key Offerings',
        body: 'Interactive tours, operations simulation, incident-response training, and loyalty-driven story progression.'
      }
    ],
    hotspots: [
      {
        id: 'pickup_weapon',
        label: 'Pick Up Emergency Sidearm',
        x: 46,
        y: 64,
        width: 12,
        height: 16,
        requires: [{ type: 'progress', key: 'weaponEquipped', equals: false }],
        effects: [
          { type: 'start_encounter', encounterId: 'intro_zombie', encounterHp: 100 },
          { type: 'set_progress', key: 'weaponEquipped', value: true }
        ]
      },
      {
        id: 'door_to_archive',
        label: 'Access Archive Wing',
        x: 82,
        y: 30,
        width: 14,
        height: 45,
        requires: [{ type: 'progress', key: 'introEncounterComplete', equals: true }],
        effects: [{ type: 'navigate', to: '/archive' }]
      }
    ]
  },
  '/archive': {
    path: '/archive',
    title: 'Archive Terminal',
    assignmentLabel: 'About Us',
    subtitle: 'Company history and leadership records for hospitality operations.',
    heroImage: '/assets/rooms/archive-room.svg',
    infoBlocks: [
      {
        heading: 'History',
        body: 'Founded as a boutique crisis-hospitality studio, the team evolved into a narrative operations lab specializing in high-engagement guest journeys.'
      },
      {
        heading: 'Values',
        body: 'Guest trust, operational transparency, and resilient service design define every hospitality touchpoint in the brand experience.'
      },
      {
        heading: 'Team',
        body: 'Operations lead, guest-experience director, security systems designer, and narrative producer collaborate across every release.'
      }
    ],
    hotspots: [
      {
        id: 'read_terminal_clue',
        label: 'Read Terminal Memo',
        x: 55,
        y: 40,
        width: 20,
        height: 20,
        requires: [],
        effects: [
          { type: 'discover_clue', clueKey: 'archiveKeyphrase', value: 'silent host' },
          { type: 'navigate', to: '/comms' }
        ]
      }
    ]
  },
  '/armory': {
    path: '/armory',
    title: 'Armory Services Desk',
    assignmentLabel: 'Services Page',
    subtitle: 'Service catalog and pricing tiers for guest support operations.',
    heroImage: '/assets/rooms/armory-service.svg',
    infoBlocks: [
      {
        heading: 'Service Tier: Essential',
        body: 'Starter package including guided onboarding, rapid-response basics, and standard inventory access.'
      },
      {
        heading: 'Service Tier: Advanced',
        body: 'Extended equipment access, premium response support, and scenario-based preparedness modules.'
      },
      {
        heading: 'Service Tier: Command',
        body: 'Full operations concierge, custom analytics reporting, and high-priority mission support workflows.'
      }
    ],
    hotspots: []
  },
  '/comms': {
    path: '/comms',
    title: 'Communications Hub',
    assignmentLabel: 'Contact Us Page',
    subtitle: 'Direct guest and partner communications channel.',
    heroImage: '/assets/rooms/comms-room.svg',
    infoBlocks: [
      {
        heading: 'Inquiry Workflow',
        body: 'Guests and partners can submit requests directly through this secure transmission form.'
      }
    ],
    contact: {
      phone: '+1 (555) 013-6560',
      email: 'contact@dizzysdisease.studio',
      address: '656 Meridian Yard, Halifax, NS, Canada',
      formEndpoint: SITE_CONFIG.formEndpoint
    },
    hotspots: []
  },
  '/devlog': {
    path: '/devlog',
    title: 'Evidence Board Devlog',
    assignmentLabel: 'Blog Page',
    subtitle: 'Hospitality industry insights and development updates.',
    heroImage: '/assets/rooms/devlog-board.svg',
    infoBlocks: [
      {
        heading: 'Post 1: Hospitality Through Interactive Narrative',
        body: 'We map guest lifecycle principles to interactive storytelling loops so visitors remember key brand information through participation.'
      },
      {
        heading: 'Post 2: Operational Safety as Experience Design',
        body: 'Service reliability, incident clarity, and response pacing are treated as both UX and hospitality fundamentals across every update.'
      }
    ],
    blogPosts: [
      {
        id: 'post-hospitality-loop',
        title: 'Designing a Hospitality-Centered Survival Loop',
        date: '2026-03-03',
        body: 'Our latest build aligns guest service principles with interactive progression. The welcome flow now teaches mission, values, and service options through playable moments.'
      },
      {
        id: 'post-ops-trust',
        title: 'Building Trust Through Operational Transparency',
        date: '2026-03-03',
        body: 'We publish incident-readiness notes, system updates, and response protocols so guests and partners understand how every service layer works.'
      }
    ],
    hotspots: [
      {
        id: 'devlog_clue_hint',
        label: 'Review Red String Note',
        x: 35,
        y: 20,
        width: 16,
        height: 18,
        requires: [],
        effects: [{ type: 'discover_clue', clueKey: 'archiveKeyphrase', value: 'silent host' }]
      }
    ]
  }
};

export function getRoute(path) {
  return ROUTES[path] ?? ROUTES['/'];
}
