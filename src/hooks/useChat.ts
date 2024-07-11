import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { API } from "@/services";

interface History {
  message: string;
  createdAt: Date;
  id: string;
  origin: "user" | "bot";
}

function useChat() {
  const bottomRef = useRef<HTMLSpanElement>(null);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const [history, setHistory] = useState<History[]>([]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = handleSubmit(async ({ message }) => {
    reset();

    setHistory((previousState) => [
      ...previousState,
      {
        message,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        origin: "user",
      },
    ]);

    getBotMessage(message);
  });

  const getBotMessage = async (message: string) => {
    const response = await API.post<{ content: string }>("/api/chat", {
      message,
    });

    setHistory((previousState) => [
      ...previousState,
      {
        message: response.data.content,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        origin: "bot",
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return { register, onSubmit, history, bottomRef };
}

export { useChat };
