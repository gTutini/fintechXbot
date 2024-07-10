import { useEffect } from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

interface History {
  message: string;
  createdAt: Date;
  id: string;
  origin: "user" | "bot";
}

function useChat() {
  const bottomRef = useRef<HTMLSpanElement>(null);
  const { register, handleSubmit, reset } = useForm();
  const [history, setHistory] = useState<History[]>([]);

  const onSubmit = handleSubmit(({ message }) => {
    reset();

    setHistory([
      ...history,
      {
        message,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        origin: "user",
      },
    ]);
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return { register, onSubmit, history, bottomRef };
}

export { useChat };
