// Returned when summary is generated, mainly because of inappropiate reviews or lack of them.
import { IconBug } from '@tabler/icons-react';
import React from 'react';

const SummaryError = ({ error }: { error: Error }) => {
  return (
    <div className="p-4 bg-neutral-800 mt-2 rounded-xl h-[400px] flex flex-col items-center justify-center gap-5">
      <IconBug width={40} height={40} />
      <p className="font-bold">
        Sorry, an error ocurred while generating the summary:
      </p>
      <p>{error.message}</p>
      <p className="text-neutral-400">
        You could try generating it again, although if it&apos;s due to lack of
        reviews or inappropiate ones, it will still fail.<br />
        In this case, try checking out the game&apos;s reviews on Steam directly.
      </p>
      
    </div>
  );
};

export default SummaryError;
