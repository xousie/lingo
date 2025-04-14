import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="">
          <Image
            src="/CN.svg"
            alt="Mandarin"
            height={32}
            width={40}
            className="mr-4 rounded-md  drop-shadow-lg"
          />
          Mandarin
        </Button>
        <Button size="lg" variant="ghost" className="">
          <Image
            src="/JP.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md  drop-shadow-lg"
          />
          Japanese
        </Button>
        <Button size="lg" variant="ghost" className="">
          <Image
            src="/US.svg"
            alt="English"
            height={32}
            width={40}
            className="mr-4 rounded-md  drop-shadow-lg"
          />
          English
        </Button>
        <Button size="lg" variant="ghost" className="">
          <Image
            src="/ES.svg"
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md  drop-shadow-lg"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="">
          <Image
            src="/ID.svg"
            alt="Bahasa"
            height={32}
            width={40}
            className="mr-4 rounded-md  drop-shadow-lg"
          />
          Bahasa
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
