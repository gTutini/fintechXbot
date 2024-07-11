import Image from "next/image";
import clsx from "clsx";

import { Message } from "@/hooks/useChat";

function UserMessage({ message }: { message: Message }) {
  return (
    <div
      key={message.id}
      className={"w-full p-6 flex items-center bg-base-100"}
    >
      <Image
        src="/user.png"
        width={37}
        height={37}
        className="mr-2"
        alt="user-profile"
      />
      <p className="text-xs urbanist-500">{message.message}</p>
    </div>
  );
}

export { UserMessage };
