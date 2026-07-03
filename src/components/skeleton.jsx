export default function Skeleton() {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {[1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          className="bg-white w-full rounded-2xl shadow-xl p-5"
        >
          <div className="shimmer h-64 w-full rounded-lg"></div>

          <div className="mt-4 space-y-3">
            <div className="shimmer h-4 rounded"></div>
            <div className="shimmer h-4 rounded w-3/4"></div>
            <div className="shimmer h-4 rounded w-1/2"></div>
          </div>

          <div className="mt-4 shimmer h-8 rounded"></div>
        </div>
      ))}
    </div>
  );
}