import Image from "next/image";
import { useBotMessage } from "@/hooks";
import { Message } from "@/hooks/useChat";

function BotMessage({ message }: { message: Message }) {
  const { displayResponse, bottomRef } = useBotMessage(message.message);

  return (
    <>
      <div className="bg-base-200 p-6">
        <Image
          src="/bot.png"
          width={37}
          height={37}
          className="mr-2"
          alt="bot-profile"
        />
        <p className="text-xs urbanist-500 mt-4 whitespace-pre-line">
          {displayResponse}
        </p>
      </div>
      <span ref={bottomRef} />
    </>
  );
}

export { BotMessage };
