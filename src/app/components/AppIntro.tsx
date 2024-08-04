import { IconBrandGithub } from "@tabler/icons-react";
import ModeSwitch from "./ModeSwitch";
import { Mode } from "../interfaces/Mode";

const AppIntro = ({
  mode,
  onChangeMode,
}: {
  mode: Mode;
  onChangeMode: () => void;
}) => {
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
        <ModeSwitch mode={mode} onChangeMode={onChangeMode} />
        {mode === Mode.Summary ? (
          <p className="text-md px-4 py-2">
            Search up to <strong>3</strong> Steam games you are interested in,
            the AI will provide you with a summary of each.
          </p>
        ) : (
          <p className="text-md px-4 py-2">
            Search up to <strong>3</strong> Steam games you are interested in.
            Enter a prompt describing what you are looking for and the AI will
            choose the best game for you.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppIntro;
