import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Arrow } from "@/assets";

export default function Home() {
  return (
    <>
      <Head>
        <title>FintechX</title>
      </Head>
      <section className="min-h-screen max-w-screen-sm m-auto px-10">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Image src="/home.png" width={336} height={439} alt="astronaut" />
          <h1 className="text-4xl poppins-700 mt-6 text-center">
            Bem-vindo a FintechX
          </h1>
          <p className="text-center poppins-300 mt-4">
            Experimente a conveniência de uma IA avançada pronta para ajudar
            você a qualquer momento.
          </p>
          <Link href="/chat">
            <button className="btn btn-active mt-6 pl-8">
              Entrar <Arrow />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
