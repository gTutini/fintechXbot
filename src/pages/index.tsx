import clsx from "clsx";
import Image from "next/image";

import { Chevron, Dots, Send } from "@/assets";
import { useChat } from "@/hooks";

export default function Home() {
  const { onSubmit, register, history, bottomRef } = useChat();

  return (
    <main className="flex flex-col">
      <section className="fixed top-0 pt-7 pb-5 px-6 bg-base-100 w-full flex justify-between items-center drop-shadow-sm">
        <button className="btn btn-square">
          <Chevron />
        </button>
        <h2 className="text-4xl font-semibold poppins-500">FintechX</h2>
        <button className="btn btn-square btn-ghost">
          <Dots />
        </button>
      </section>

      <section className="min-h-screen flex flex-col justify-end py-24 max-w-screen-md m-auto w-full">
        {history.map(({ message, id, origin }) => (
          <div
            key={id}
            className={clsx(
              "w-full p-6 flex items-center",
              origin === "user" ? "bg-base-200" : "bg-base-100"
            )}
          >
            <Image
              src="/user.png"
              width={37}
              height={37}
              className="mr-2"
              alt="user-profile"
            />
            <p className="text-xs urbanist-500">{message}</p>
          </div>
        ))}
        <span ref={bottomRef} />
      </section>

      <section className="fixed bottom-0 pb-7 pt-5 sm:px-6 w-full bg-base-100 max-w-screen-md inset-x-0 mx-auto">
        <form className="relative" onSubmit={onSubmit}>
          <input
            {...register("message", { required: true })}
            autoComplete="off"
            placeholder="Faça uma pergunta"
            className="input input-bordered w-full h-12 pr-10 urbanist-400"
          />
          <button
            type="submit"
            className="btn btn-square btn-ghost absolute right-0 "
          >
            <Send />
          </button>
        </form>
      </section>
    </main>
  );
}
