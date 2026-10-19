/** 2022 Baranagar Municipality election data (from the supplied PDF). */

export const municipalSeats = {
  total: 34,
  parties: [
    { id: "aitc", name: "AITC", seats: 32, note: "including one uncontested seat", color: "#2e9e5f" },
    { id: "cpim", name: "CPI(M)", seats: 2, color: "#b3323f" },
    { id: "bjp", name: "BJP", seats: 0, color: "#ff9933" },
  ],
};

export const ward4Results = [
  { candidate: "Pritha Mukherjee", party: "AITC", partyId: "aitc", votes: 1806, share: 56.0, color: "#2e9e5f" },
  { candidate: "Saraswati Das", party: "CPI(M)", partyId: "cpim", votes: 1059, share: 32.84, color: "#b3323f" },
  { candidate: "Priyanka Chakrabarty", party: "BJP", partyId: "bjp", votes: 360, share: 11.16, color: "#ff9933" },
] as const;

export const ward4Totals = {
  totalVotes: 3225,
  margin: 747,
};
