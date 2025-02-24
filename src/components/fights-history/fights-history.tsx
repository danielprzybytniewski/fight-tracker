import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Fight } from "@/types/fights-history.schema.types";
import {
  sortFightsByDate,
  transformFightDetails,
} from "@/lib/fights-history-transformer";
import GradientHeading from "@/components/shared/gradient-heading";
import FightsHistoryCardContent from "@/components/fights-history/fights-history-card-content";

type FightsHistoryProps = {
  fightsHistory: Fight[];
  mainFighterName: string;
};

export default function FightsHistory({
  fightsHistory,
  mainFighterName,
}: FightsHistoryProps) {
  const sortedFights = sortFightsByDate(fightsHistory);

  return (
    <div className="mt-8 space-y-6">
      <GradientHeading component="h2" className="text-2xl sm:text-3xl">
        UFC Fights History
      </GradientHeading>
      {sortedFights.length === 0 && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
          UFC Fights History not found
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedFights.map((fight: Fight) => {
          const {
            opponentName,
            result,
            methodDisplay,
            roundDisplay,
            timeDisplay,
            locationDisplay,
            weightClassDisplay,
          } = transformFightDetails(fight, mainFighterName);

          return (
            <Card
              key={fight.id}
              className="bg-gray-50 dark:bg-gray-800/80 shadow-md rounded-2xl h-full flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex-col justify-center gap-2 text-center sm:min-h-10">
                  <span>{fight.event}</span>
                </CardTitle>
              </CardHeader>
              <FightsHistoryCardContent
                fight={fight}
                locationDisplay={locationDisplay}
                opponentName={opponentName}
                weightClassDisplay={weightClassDisplay}
                result={result}
                methodDisplay={methodDisplay}
                roundDisplay={roundDisplay}
                timeDisplay={timeDisplay}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
