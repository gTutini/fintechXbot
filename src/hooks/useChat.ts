import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { API } from "@/services";
import { useBoolean } from "usehooks-ts";

export interface Message {
  message: string;
  id: string;
  origin: "user" | "bot";
}

function useChat() {
  const bottomRef = useRef<HTMLSpanElement>(null);
  const { register, handleSubmit, reset, setFocus } = useForm<{
    message: string;
  }>();
  const [history, setHistory] = useState<Message[]>([]);
  const {
    value: isLoading,
    setFalse: finishedLoading,
    setTrue: startLoading,
  } = useBoolean(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setFocus("message");
  };

  const welcomeMessage = () => {
    setHistory((prevState) => [
      ...prevState,
      {
        message:
          "Bem vindo! Sou o bot de atendimento da FintechX. Como posso ajudar?",
        id: crypto.randomUUID(),
        origin: "bot",
      },
    ]);
  };

  const onSubmit = handleSubmit(async ({ message }) => {
    reset();
    startLoading();

    setHistory((prevState) => [
      ...prevState,
      {
        message,
        id: crypto.randomUUID(),
        origin: "user",
      },
    ]);

    await getBotMessage(message);
  });

  const getBotMessage = async (message: string) => {
    const response = await API.post<{ content: string }>("/api/chat", {
      message,
    });

    setHistory((prevState) => [
      ...prevState,
      {
        message: response.data.content,
        id: crypto.randomUUID(),
        origin: "bot",
      },
    ]);
    finishedLoading();
  };

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    welcomeMessage();
  }, []);

  return { register, onSubmit, history, bottomRef, isLoading };
}

export { useChat };
