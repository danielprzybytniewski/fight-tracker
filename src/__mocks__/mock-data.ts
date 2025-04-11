import { FightsHistoryCardContentProps } from "@/components/fights-history/fights-history-card-content";
import { FightCardsEvent } from "@/types/fight-cards-schema.types";
import {
  ApiFight,
  Fight,
  FightResult,
} from "@/types/fights-history-schema.types";
import { NewsContentData, NewsDetailData } from "@/types/news-schema.types";
import {
  Fighter as Athlete,
  DetailItem,
  Division,
  DivisionWithChampion,
  NOT_AVAILABLE,
} from "@/types/rankings-schema.types";

export const mockFightCards: FightCardsEvent[] = [
  {
    title: "Fight Night",
    fights: [
      {
        main: true,
        weight: 185,
        fighterA: {
          name: "Jing Li",
          record: "5-0",
          country: "https://example.com/china.png",
          picture: "https://example.com/fighter.png",
        },
        fighterB: {
          name: "Adam Kowalski",
          record: "12-0",
          country: "https://example.com/poland.png",
          picture: "https://example.com/fighter.png",
        },
      },
    ],
  },
];

export const mockAthlete: Athlete = {
  name: "John Doe",
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
  { label: "Height", value: "75.00" },
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

export const mockApiFight: ApiFight = {
  _id: "67533cea7a2ac5f7e09b27b6",
  event: "UFC 275: Teixeira vs. Prochazka",
  date: new Date("2022-06-10T21:00:00.000Z"),
  location: "Kallang, Singapore",
  fighter1ID: "009341ed974bad72",
  fighter2ID: "7ff97850e8c32bda",
  fighter1: "Jiri Prochazka",
  fighter2: "Glover Teixeira",
  win: "Jiri Prochazka",
  lose: "Glover Teixeira",
  weight_class: "Light Heavyweight",
  method: "SUB",
  endWith: "Rear Naked Choke",
  roundd: "5",
  time: "4:32",
};

export const mockAppFight: Fight = {
  id: "67533ce97a2ac5f7e09b1d70",
  event: "UFC Fight Night: Lineker vs. Dodson",
  date: new Date("2016-09-30T21:00:00.000Z"),
  location: "Portland, Oregon, USA",
  fighter1ID: "792be9a24df82ed6",
  fighter2ID: "d2bc285ead803db0",
  fighter1Name: "Brandon Moreno",
  fighter2Name: "Louis Smolka",
  winner: "Brandon Moreno",
  loser: "Louis Smolka",
  draw: false,
  weightClass: "Flyweight",
  method: "SUB",
  endWith: "Guillotine Choke",
  round: "1",
  time: "2:23",
};

export const mockFightsHistoryCardContentProps: FightsHistoryCardContentProps =
  {
    fight: mockAppFight,
    locationDisplay: mockAppFight.location || NOT_AVAILABLE,
    opponentName: mockAppFight.fighter2Name,
    weightClassDisplay: mockAppFight.weightClass || NOT_AVAILABLE,
    result: "win" as FightResult,
    methodDisplay: `${mockAppFight.method} (${mockAppFight.endWith})`,
    roundDisplay: `Round ${mockAppFight.round}`,
    timeDisplay: mockAppFight.time || NOT_AVAILABLE,
  };

export const mockTransformedDetails = {
  opponentName: "Fighter B",
  result: "win",
  methodDisplay: "KO (punch)",
  roundDisplay: "2",
  timeDisplay: "2:30",
  locationDisplay: "USA",
  weightClassDisplay: "Lightweight",
};

export const fighterCardMock: Athlete = {
  id: "john-doe",
  name: "John Doe",
  nickname: "The Destroyer",
  category: "Heavyweight",
  wins: 20,
  losses: 3,
  draws: 1,
  imgUrl: "https://example.com/johndoe.jpg",
};

export const mockFavoriteFighters: Athlete[] = [
  {
    id: "Jon Jones",
    name: "Jon Jones",
    nickname: "Bones",
    category: "Heavyweight",
    wins: 27,
    losses: 1,
    draws: 3,
    imgUrl: "/images/jon-jones.jpg",
  },
  {
    id: "Israel Adesanya",
    name: "Israel Adesanya",
    category: "Middleweight",
    wins: 24,
    losses: 2,
    draws: 1,
    imgUrl: "/images/israel-adesanya.jpg",
  },

  {
    id: "Alexandre Pantoja",
    name: "Alexandre Pantoja",
    nickname: "",
    category: "Flyweight",
    wins: undefined,
    losses: undefined,
    draws: undefined,
    imgUrl: "/images/alexandre-pantoja.jpg",
  },
];

export const mockNewsParagraphs: NewsContentData[] = [
  { type: "paragraph", data: { text: "First paragraph" } },
  { type: "paragraph", data: { text: "Second paragraph" } },
  { type: "paragraph", data: { text: "Third paragraph" } },
  { type: "paragraph", data: { text: "Fourth paragraph" } },
  { type: "paragraph", data: { text: "Fifth paragraph" } },
  { type: "paragraph", data: { text: "Sixth paragraph" } },
  { type: "paragraph", data: { text: "Seventh paragraph" } },
  { type: "paragraph", data: { text: "Eighth paragraph" } },
  { type: "paragraph", data: { text: "Ninth paragraph" } },
  { type: "paragraph", data: { text: "Tenth paragraph" } },
];

export const generateMockNewsImages = (count: number) =>
  Array.from({ length: count }, (_, index) => ({
    type: "image",
    src: `https://example.com/image-${index + 1}.jpg`,
  }));

export const mockNewsItem: NewsDetailData = {
  title: "Exciting MMA News",
  author: "John Doe",
  modified: "2025-04-09T10:00:00.000Z",
  categories: "Combat Sports, MMA",
  content: [
    { type: "paragraph", data: [{ text: "Some content" }] },
    { type: "image", src: "https://example.com/image.jpg" },
  ],
};
