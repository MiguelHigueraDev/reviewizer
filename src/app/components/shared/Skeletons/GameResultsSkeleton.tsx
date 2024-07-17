const GameResultsSkeleton = () => {
  return (
    <ol className="flex gap-2 flex-col w-full">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="flex gap-3 items-center">
          {/* Image */}
          <div className="bg-gray-400 animate-pulse w-[120px] h-[45px]" />

          {/* Game text */}
          <div className="flex flex-col gap-2.5 animate-pulse flex-grow">
            <div className="h-3 w-[230px] bg-gray-400" />
            <div className="h-3 w-[150px] bg-gray-400" />
          </div>

          {/* Button */}
          <div className="bg-gray-400 animate-pulse w-[36px] h-[36px] rounded-lg"></div>
        </li>
      ))}
    </ol>
  );
};

export default GameResultsSkeleton;
