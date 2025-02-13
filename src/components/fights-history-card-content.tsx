import { CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  User,
  Weight,
  ShieldCheck,
  Sword,
  Clock12,
  Clock2,
} from "lucide-react";
import {
  Fight,
  TransformedFightDetails,
} from "@/types/fights-history.schema.types";
import { FightsHistoryDetails } from "@/components/fights-history-details";
import FightsHistoryResultBadge from "@/components/fights-history-result-badge";

type FightsHistoryCardContentProps = TransformedFightDetails & {
  fight: Fight;
};

export const FightsHistoryCardContent = ({
  fight,
  locationDisplay,
  opponentName,
  weightClassDisplay,
  result,
  methodDisplay,
  roundDisplay,
  timeDisplay,
}: FightsHistoryCardContentProps) => {
  return (
    <CardContent className="space-y-4 text-sm sm:text-base">
      <FightsHistoryDetails
        icon={Calendar}
        label="Date"
        value={fight.date.toLocaleDateString()}
      />
      <FightsHistoryDetails
        icon={MapPin}
        label="Location"
        value={locationDisplay}
      />
      <FightsHistoryDetails icon={User} label="Opponent" value={opponentName} />
      <FightsHistoryDetails
        icon={Weight}
        label="Weight Class"
        value={weightClassDisplay}
      />
      <FightsHistoryDetails
        icon={ShieldCheck}
        label="Result"
        value={<FightsHistoryResultBadge result={result} />}
      />
      <FightsHistoryDetails icon={Sword} label="Method" value={methodDisplay} />
      <FightsHistoryDetails icon={Clock12} label="Round" value={roundDisplay} />
      <FightsHistoryDetails icon={Clock2} label="Time" value={timeDisplay} />
    </CardContent>
  );
};
