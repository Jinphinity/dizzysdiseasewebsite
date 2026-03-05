export const MERCHANT_CATALOG = [
  { id: 'ammo_pack', name: 'Ammo Pack', description: '12 rounds of standard handgun ammunition. Every bullet counts.', cost: 20, sell: 10 },
  { id: 'med_kit', name: 'Medical Kit', description: 'Field trauma kit. Restores 30 health on use.', cost: 30, sell: 15 },
  { id: 'signal_decoder', name: 'Signal Decoder', description: 'Decrypts locked terminal handshakes. Required for encrypted comms.', cost: 45, sell: 22 },
  { id: 'keycard_alpha', name: 'Keycard Alpha', description: 'Priority access credential for restricted areas of the facility.', cost: 60, sell: 30 }
];

export function getMerchantItem(itemId) {
  return MERCHANT_CATALOG.find((item) => item.id === itemId) ?? null;
}
