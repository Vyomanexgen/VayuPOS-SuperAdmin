export default function CardStat({ title, value, change }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-1">
      <p className="text-sm text-gray-600">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <span className="text-xs text-green-600">{change}</span>
    </div>
  );
}
