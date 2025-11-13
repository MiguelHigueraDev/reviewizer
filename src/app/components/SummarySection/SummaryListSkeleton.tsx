const SummaryListSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-muted rounded-md" />
        <div className="h-4 w-48 bg-muted rounded-md" />
      </div>

      {/* Navigation Skeleton */}
      <div className="flex justify-between items-center gap-4 bg-card border border-border rounded-lg p-4">
        <div className="h-9 w-9 bg-muted rounded-md" />
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="h-6 w-48 bg-muted rounded-md" />
          <div className="h-4 w-20 bg-muted rounded-md" />
        </div>
        <div className="h-9 w-9 bg-muted rounded-md" />
      </div>

      {/* Summary Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-3">
        <div className="h-4 w-full bg-muted rounded-md" />
        <div className="h-4 w-full bg-muted rounded-md" />
        <div className="h-4 w-3/4 bg-muted rounded-md" />
      </div>

      {/* Positives Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded-md" />
          <div className="h-6 w-40 bg-muted rounded-md" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="h-2 w-2 bg-muted rounded-full mt-1.5" />
              <div className={`h-4 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'} bg-muted rounded-md`} />
            </div>
          ))}
        </div>
      </div>

      {/* Negatives Card Skeleton */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded-md" />
          <div className="h-6 w-44 bg-muted rounded-md" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="h-2 w-2 bg-muted rounded-full mt-1.5" />
              <div className={`h-4 ${i % 2 === 0 ? 'w-5/6' : 'w-4/6'} bg-muted rounded-md`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryListSkeleton;
