import { Mode } from "../interfaces/Mode";

const ModeSwitch = ({
  mode,
  onChangeMode,
}: {
  mode: Mode;
  onChangeMode: () => void;
}) => {
  return (
    <button
      onClick={onChangeMode}
      className="bg-neutral-700 p-2 w-full rounded-md my-2 hover:bg-neutral-600"
    >
      Switch to {mode === Mode.Summary ? "Judge" : "Summary"} Mode
    </button>
  );
};

export default ModeSwitch;
