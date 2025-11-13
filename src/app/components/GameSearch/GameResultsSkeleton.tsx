const GameResultsSkeleton = () => {
  return (
    <div className="flex gap-3 flex-col w-full animate-pulse">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 items-center p-3 rounded-lg border border-border bg-card"
        >
          {/* Image skeleton */}
          <div className="w-[120px] h-[45px] flex-shrink-0 rounded overflow-hidden bg-muted" />

          {/* Game info skeleton */}
          <div className="flex-grow min-w-0 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded-md" />
            <div className="h-3 w-1/2 bg-muted rounded-md" />
          </div>

          {/* Button skeleton */}
          <div className="flex-shrink-0 h-9 w-9 bg-muted rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default GameResultsSkeleton;
