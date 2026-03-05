import { SITE_CONFIG } from './site-config.js';

export const ROUTE_ORDER = ['/', '/archive', '/armory', '/comms', '/devlog'];

export const ROUTES = {
  '/': {
    path: '/',
    title: 'Safehouse Arrival',
    assignmentLabel: 'Home Page',
    subtitle: 'Welcome to the interactive teaser for Dizzy\'s Disease.',
    heroImage: '/assets/rooms/home-safehouse.png',
    infoBlocks: [
      {
        heading: 'The Game',
        body: 'Dizzy\'s Disease is a grueling tactical survival horror RPG blending immersive sim mechanics, intense resource scarcity, and puzzle-like combat.'
      },
      {
        heading: 'The Threat',
        body: 'A mysterious neural virus, unleashed by erratic bio-computing, manipulates the mind, altering your perception of reality while horrific mutants hunt you.'
      },
      {
        heading: 'Key Pillars',
        body: 'Every bullet counts. Tactical Combat as a Puzzle, Scarcity & Risk, Mastery of Place, and an oppressive Atmosphere & Tension.'
      }
    ],
    hotspots: [
      {
        id: 'pickup_weapon',
        label: 'Pick Up Emergency Sidearm',
        kind: 'pickup',
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
        kind: 'door',
        x: 82,
        y: 30,
        width: 14,
        height: 45,
        requires: [{ type: 'progress', key: 'introEncounterComplete', equals: true }],
        lockedMessage: 'Door is locked. Neutralize the active threat first.',
        effects: [{ type: 'navigate', to: '/archive' }]
      }
    ]
  },
  '/archive': {
    path: '/archive',
    title: 'Archive Terminal',
    assignmentLabel: 'About Us',
    subtitle: 'Studio records and game development background.',
    heroImage: '/assets/rooms/archive-room.png',
    infoBlocks: [
      {
        heading: 'The Studio',
        body: 'We are an indie development team passionately dedicated to pushing the boundaries of the survival horror genre by making players think, panic, and adapt.'
      },
      {
        heading: 'Our Vision',
        body: 'To create a deeply atmospheric, systems-driven experience where tactical planning and environmental awareness mean the difference between life and death.'
      },
      {
        heading: 'The Journey',
        body: 'Originating as a conceptual neural-virus ARG, Dizzy\'s Disease has evolved into a fully fledged interactive world built on Unreal Engine.'
      }
    ],
    hotspots: [
      {
        id: 'read_terminal_clue',
        label: 'Read Terminal Memo',
        kind: 'terminal',
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
    subtitle: 'Pre-order tiers and Kickstarter backer rewards.',
    heroImage: '/assets/rooms/armory-service.png',
    infoBlocks: [
      {
        heading: 'Tier 1: Survivor',
        body: 'Get early access to the PC Alpha build, a digital copy of the final game, and an exclusive Discord backer role.'
      },
      {
        heading: 'Tier 2: Operative',
        body: 'Includes Alpha access, the digital soundtrack and lore artbook, plus your name hidden as an easter egg in the game.'
      },
      {
        heading: 'Tier 3: Commander',
        body: 'All previous digital rewards plus a premium physical collector\'s edition containing the scale Safehouse Diorama.'
      }
    ],
    hotspots: []
  },
  '/comms': {
    path: '/comms',
    title: 'Communications Hub',
    assignmentLabel: 'Contact Us Page',
    subtitle: 'Direct line to the development team.',
    heroImage: '/assets/rooms/comms-room.png',
    infoBlocks: [
      {
        heading: 'Signal the Devs',
        body: 'Use this secure transmission relay for press inquiries, business deals, community questions, or reporting bugs in the Alpha build.'
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
    subtitle: 'System updates and behind-the-scenes game development.',
    heroImage: '/assets/rooms/devlog-board.png',
    infoBlocks: [
      {
        heading: 'Development Philosophy',
        body: 'We believe in transparent development. Every month, we pin new evidence to this board detailing our design process, art milestones, and mechanics testing.'
      }
    ],
    blogPosts: [
      {
        id: 'post-tactical-horror',
        title: 'Tactical Combat as a Puzzle',
        date: '2026-03-03',
        body: 'In Dizzy\'s Disease, you can\'t just run and gun. We recently finalized the \'Scarcity\' system where players must treat every encounter as a strategic puzzle, hoarding ammo and utilizing the environment.'
      },
      {
        id: 'post-wobbly-aim',
        title: 'Building Tension: The Wobbly Aim Mechanic',
        date: '2026-03-03',
        body: 'To reflect the protagonist\'s decaying mental state from the neural virus, we integrated a physics-driven wobbly reticle. Precision takes focus, adding panic to every shot.'
      }
    ],
    hotspots: [
      {
        id: 'devlog_clue_hint',
        label: 'Review Red String Note',
        kind: 'document',
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
