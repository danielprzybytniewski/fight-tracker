export default function AthleteRecordChart({
  wins,
  losses,
  draws = 0,
}: {
  wins: number;
  losses: number;
  draws?: number;
}) {
  const total = wins + losses + draws;
  const winsPercent = (wins / total) * 100;
  const lossesPercent = (losses / total) * 100;
  const drawsPercent = (draws / total) * 100;

  return (
    <div className="mx-auto mt-4 w-full max-w-md">
      <div className="flex h-8 overflow-hidden rounded-lg">
        <div
          style={{ width: `${winsPercent}%` }}
          className="flex items-center justify-center bg-green-500 text-sm font-medium text-white"
        >
          {`${wins}W`}
        </div>
        <div
          style={{ width: `${lossesPercent}%` }}
          className="flex items-center justify-center bg-red-500 text-sm font-medium text-white"
        >
          {`${losses}L`}
        </div>
        {draws !== 0 && (
          <div
            style={{ width: `${drawsPercent}%` }}
            className="flex items-center justify-center bg-yellow-500 text-sm font-medium text-white"
          >
            {`${draws}D`}
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{Math.round(winsPercent)}% Wins</span>
        <span>{Math.round(lossesPercent)}% Losses</span>
        {draws !== 0 && <span>{Math.round(drawsPercent)}% Draws</span>}
      </div>
    </div>
  );
}
