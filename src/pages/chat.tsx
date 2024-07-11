import { Chevron, Dots, Logo, Send } from "@/assets";
import { useChat } from "@/hooks";
import Head from "next/head";
import { BotMessage, UserMessage } from "@/components";
import Link from "next/link";

export default function Chat() {
  const { onSubmit, register, history, bottomRef, isLoading } = useChat();

  return (
    <>
      <Head>
        <title>FintechX Chat Atendimento</title>
      </Head>
      <main className="flex flex-col">
        <section className="fixed top-0 pt-7 pb-5 px-6 bg-base-100 w-full flex justify-between items-center drop-shadow-sm">
          <Link href="/intro">
            <button className="btn btn-square">
              <Chevron />
            </button>
          </Link>
          <h2 className="text-3xl poppins-200">FintechX</h2>
          <button className="btn btn-square btn-ghost">
            <Dots />
          </button>
        </section>

        <section className="min-h-screen max-w-screen-md flex flex-col justify-end py-24  m-auto w-full">
          <div className="flex items-center flex-col mb-10">
            <Logo />
            <h1 className="urbanist-600 text-xl">Bot de Atendimento</h1>
          </div>
          {history.map((message) => {
            return message.origin === "user" ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <BotMessage key={message.id} message={message} />
            );
          })}
          {isLoading && (
            <div className="flex justify-center">
              <span className="loading loading-dots loading-lg" />
            </div>
          )}
          <span ref={bottomRef} />
        </section>

        <section className="fixed bottom-0 pb-7 pt-5 px-6 md:px-0 w-full bg-base-100 max-w-screen-md inset-x-0 mx-auto">
          <form className="relative" onSubmit={onSubmit}>
            <input
              {...register("message", { required: true })}
              autoComplete="off"
              placeholder="Faça uma pergunta"
              className="input input-bordered w-full h-12 pr-10 urbanist-400 transition ease-in-out delay-150"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-square btn-ghost absolute right-0 transition ease-in-out delay-150"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-ring loading-md" />
              ) : (
                <Send />
              )}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
