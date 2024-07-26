import { IconBrandGithub } from "@tabler/icons-react";

const AppIntro = () => {
  return (
    <div className="mb-5 mt-1">
      {/* Name and logo */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold text-center mb-2">
          Reviewizer AI 🤖
        </h1>
      </div>
      {/* How it works */}
      <div>
        <p>
          Search up to <strong>3</strong> Steam games you are interested in to
          get an AI summary of their reviews!
        </p>
        <a
          href="https://github.com/MiguelHigueraDev/reviewizer"
          className="flex gap-1 text-sm items-center mt-2 text-neutral-400 hover:text-neutral-300"
          target="_blank"
        >
          <IconBrandGithub width={18} height={18} />
          Source code!
        </a>
      </div>
    </div>
  );
};

export default AppIntro;
