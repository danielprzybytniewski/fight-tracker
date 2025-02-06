import EventFightCard from "@/components/event-fight-card";
import EventFighter from "@/components/event-fighter";
import { FavoritesProvider } from "@/providers/favorites-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Fighter } from "@/types/fight-cards-schema.types";
import { ThemeProvider } from "next-themes";

export const MockEventFightCard = ({ title }: { title: string }) => (
  <FavoritesProvider>
    <EventFightCard title={title} />
  </FavoritesProvider>
);

export const MockEventFighter = ({ fighter }: { fighter: Fighter }) => (
  <FavoritesProvider>
    <EventFighter fighter={fighter} />
  </FavoritesProvider>
);

export const MockLayout = ({ children }: { children: React.ReactNode }) => (
  <ReactQueryProvider>
    <ThemeProvider>
      <FavoritesProvider>
        <div>
          <nav role="navigation">Navbar</nav>
          <main>{children}</main>
          <footer role="contentinfo">Footer</footer>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  </ReactQueryProvider>
);
