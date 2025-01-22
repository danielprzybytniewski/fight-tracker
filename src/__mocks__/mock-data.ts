import { Event, Fighter } from "@/types/fight-cards-schema.types";
import {
  Fighter as Athlete,
  DetailItem,
  Division,
  DivisionWithChampion,
} from "@/types/rankings-schema.types";

export const mockFightsCards: Event[] = [
  {
    title: "Fight Night",
    date: "Sunday, 16 February 2025, 00:00",
    fights: [
      {
        fighterA: {
          name: "Fighter A",
          record: "5-0",
          country: "China",
          picture: "https://example.com/fighter.png",
          link: "https://example.com/fighterA",
        },
        fighterB: {
          name: "Fighter B",
          record: "12-0",
          country: "Poland",
          picture: "https://example.com/fighter.png",
          link: "https://example.com/fighterB",
        },
      },
    ],
  },
];

export const mockEventFightCard: Event[] = [
  {
    title: "Fight Night",
    date: "Monday, 10 February 2025, 00:00",
    fights: [
      {
        fighterA: {
          link: "https://example.com/fighterA",
          name: "Jan Kowalski",
          record: "15-0",
          country: "https://example.com/poland.png",
          picture: "https://example.com/fighter.png",
        },
        fighterB: {
          link: "https://example.com/fighterB",
          name: "Yang Wang",
          record: "2-0",
          country: "https://example.com/china.png",
          picture: "https://example.com/fighter.png",
        },
      },
    ],
  },
];

export const mockFighter: Fighter = {
  name: "John Doe",
  record: "15-0",
  country: "England",
  picture: "https://example.com/fighter.png",
  link: "https://example.com/fighter-profile",
};

export const mockEventFighter: Fighter = {
  link: "https://example.com/fighter-profile",
  name: "Jan Kowalski",
  record: "22-0",
  country: "https://example.com/poland.png",
  picture: "https://example.com/fighter.png",
};

export const mockAthlete: Athlete = {
  name: "Jonh Doe",
  wins: 20,
  losses: 5,
  draws: 1,
  category: "Lightweight",
  status: "Active",
  age: "30",
  height: 70,
  weight: 155,
  reach: 72,
  legReach: 40,
  fightingStyle: "Striker",
  trainsAt: "AKA",
  placeOfBirth: "California, USA",
  octagonDebut: "2015-01-01",
};

export const mockAthleteCard: Athlete = {
  ...mockAthlete,
  id: "Jonh Doe",
  imgUrl: "https://example.com/athlete.jpg",
};

export const mockIncompleteAthleteData: Athlete = {
  wins: 10,
  losses: 2,
  draws: 0,
} as Athlete;

export const mockUndefinedAthleteRecord: Partial<Athlete> = {
  wins: undefined,
  losses: undefined,
  draws: undefined,
};

export const mockDivision: Division = {
  id: "lightweight",
  categoryName: "Lightweight",
  champion: {
    id: "John Doe",
    championName: "John Doe",
    imgUrl: "https://example.com/champion.png",
  },
  fighters: [{ ...mockAthlete, id: "1" }],
};

export const mockDivisionWithChampion: DivisionWithChampion = {
  ...mockDivision,
  champion: {
    ...mockDivision.champion,
    ...mockAthlete,
  },
};

export const mockGeneralDetails: DetailItem[] = [
  { label: "Age", value: "30" },
  { label: "Height", value: "6'2\"" },
];

export const mockAdditionalDetails: DetailItem[] = [
  { label: "Fighting Style", value: "Striker" },
  { label: "Trains At", value: "AKA" },
];

export const mockRankings: Division[] = [
  {
    id: "Lightweight",
    categoryName: "Lightweight",
    champion: { id: "Jonh Doe", championName: "John Doe" },
    fighters: [],
  },
  {
    id: "Heavyweight",
    categoryName: "Heavyweight",
    champion: { id: "Jane Doe", championName: "Jane Doe" },
    fighters: [],
  },
];
