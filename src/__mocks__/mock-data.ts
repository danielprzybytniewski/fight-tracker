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

export const mockFighter: Fighter = {
  name: "John Doe",
  record: "15-0",
  country: "England",
  picture: "https://example.com/fighter.png",
  link: "https://example.com/fighter-profile",
};
