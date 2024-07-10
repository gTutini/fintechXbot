import { Logo } from "@/assets";

function SplashScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Logo />
      <div className="absolute inset-x-0 bottom-4 text-center">
        <h1 className="text-4xl">BrainBox</h1>
        <p className="text-base">Version 1.0</p>
      </div>
    </div>
  );
}

export { SplashScreen };
