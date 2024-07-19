const SummaryListSkeleton = () => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <button className="p-2 w-10 h-10 bg-gray-400 animate-pulse rounded-md" />
        <div className="font-bold md:text-lg">
          <div className="w-32 md:w-[300px] h-[25px] bg-gray-400 animate-pulse" />
        </div>
        <button className="p-2 w-10 h-10 bg-gray-400 animate-pulse rounded-md" />
      </div>
      <div className="p-4 bg-neutral-800 mt-2 rounded-xl">
        <div className="w-full h-[300px] bg-gray-400 animate-pulse mb-3" />
        <div className="w-24 h-[25px] bg-gray-400 animate-pulse mb-3" />
        <ol className="ml-5 mb-2 flex flex-col gap-1">
          <div className="max-w-24 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-48 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-20 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-60 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-24 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
        </ol>
        <div className="w-24 h-[25px] bg-gray-400 animate-pulse mb-3" />
        <ol className="ml-5 flex flex-col gap-1">
          <div className="max-w-16 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-48 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-72 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-60 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
          <div className="max-w-40 h-[20px] bg-gray-400 animate-pulse mb-0.5" />
        </ol>
      </div>
    </div>
  );
};

export default SummaryListSkeleton;
