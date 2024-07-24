export const randomGameList = [
  "Super Meat Boy",
  "Celeste",
  "The Talos Principle",
  "Portal 2",
  "Battleblock Theater",
  "Warframe",
  "Hades",
  "Half-Life",
  "Grand Theft Auto",
  "Deep Rock Galactic",
  "Skyrim",
  "Fallout",
  "Borderlands",
  "Risk of Rain",
  "Dead Cells",
  "Monster Hunter",
  "Terraria",
  "Stardew Valley",
  "Factorio",
  "Satisfactory",
  "Baldur's Gate",
];

export const getRandomGame = (): string => {
  return randomGameList[Math.floor(Math.random() * randomGameList.length)];
};
