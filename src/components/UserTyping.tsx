import { Pointer } from "./Pointer";

const UserTyping = ({
  userInput,
  className,
}: {
  userInput: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} char={char} />;
      })}
      <Pointer />
    </div>
  );
};

const Character = ({ char }: { char: string }) => {
  return <span className="text-primary-400">{char}</span>;
};

export default UserTyping;
