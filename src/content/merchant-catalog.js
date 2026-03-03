export const MERCHANT_CATALOG = [
  { id: 'ammo_pack', name: 'Ammo Pack', description: 'Guest safety resupply bundle.', cost: 20, sell: 10 },
  { id: 'med_kit', name: 'Medical Kit', description: 'Emergency aid package for incident response.', cost: 30, sell: 15 },
  { id: 'signal_decoder', name: 'Signal Decoder', description: 'Unlocks encrypted terminal handshakes.', cost: 45, sell: 22 },
  { id: 'keycard_alpha', name: 'Keycard Alpha', description: 'Priority access credential for operations rooms.', cost: 60, sell: 30 }
];

export function getMerchantItem(itemId) {
  return MERCHANT_CATALOG.find((item) => item.id === itemId) ?? null;
}
