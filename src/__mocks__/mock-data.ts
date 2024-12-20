import { Event, Fighter } from "@/types/fight-cards-schema.types";

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
