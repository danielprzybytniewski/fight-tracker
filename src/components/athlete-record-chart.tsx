export default function AthleteRecordChart({
  wins,
  losses,
  draws = "0",
}: {
  wins: string;
  losses: string;
  draws?: string;
}) {
  const total = parseInt(wins) + parseInt(losses) + parseInt(draws);
  const winsPercent = (parseInt(wins) / total) * 100;
  const lossesPercent = (parseInt(losses) / total) * 100;
  const drawsPercent = (parseInt(draws) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="h-8 flex rounded-lg overflow-hidden">
        <div
          style={{ width: `${winsPercent}%` }}
          className="bg-green-500 flex items-center justify-center text-white text-sm font-medium"
        >
          {`${wins}W`}
        </div>
        <div
          style={{ width: `${lossesPercent}%` }}
          className="bg-red-500 flex items-center justify-center text-white text-sm font-medium"
        >
          {`${losses}L`}
        </div>
        {draws !== "0" && (
          <div
            style={{ width: `${drawsPercent}%` }}
            className="bg-yellow-500 flex items-center justify-center text-white text-sm font-medium"
          >
            {`${draws}D`}
          </div>
        )}
      </div>
      <div className="flex justify-between text-sm mt-1 text-gray-600 dark:text-gray-400">
        <span>{Math.round(winsPercent)}% Wins</span>
        <span>{Math.round(lossesPercent)}% Losses</span>
        {draws !== "0" && <span>{Math.round(drawsPercent)}% Draws</span>}
      </div>
    </div>
  );
}
