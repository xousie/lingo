import { challengeOptions } from "@/db/schema";
import Image from "next/image";

type Props = {
  question: string;
  options: (typeof challengeOptions.$inferSelect)[];
};

export const QuestionBubble = ({ question, options }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src={options[0].imageSrc}
        alt="mayb?"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src={options[0].imageSrc}
        alt="mayb?"
        height={40}
        width={40}
        className="block lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
