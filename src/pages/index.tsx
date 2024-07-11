import { useTimeout } from "usehooks-ts";
import { useRouter } from "next/router";

import { Logo } from "@/assets";

export default function SplashScreen() {
  const router = useRouter();
  useTimeout(() => router.push("/intro"), 2000);

  return (
    <div className="flex h-screen items-center justify-center">
      <Logo />
      <div className="absolute inset-x-0 bottom-4 text-center">
        <h1 className="text-4xl poppins-500">FintechX</h1>
        <p className="text-base poppins-300">Version 1.0</p>
      </div>
    </div>
  );
}
