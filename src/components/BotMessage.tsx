import { Message } from "@/hooks/useChat";
import Image from "next/image";

function BotMessage({ message }: { message: Message }) {
  return (
    <div className="bg-base-200 p-6">
      <Image
        src="/bot.png"
        width={37}
        height={37}
        className="mr-2"
        alt="bot-profile"
      />
      <p className="text-xs urbanist-500 mt-4">{message.message}</p>
    </div>
  );
}

export { BotMessage };
