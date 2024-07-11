import { useEffect, useRef, useState } from "react";

function useBotMessage(message: string) {
  const bottomRef = useRef<HTMLSpanElement>(null);
  const [, setCompletedTyping] = useState(false);
  const [displayResponse, setDisplayResponse] = useState("");

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = message;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));

      i++;

      scrollToBottom();

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [message]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: bottomRef.current?.offsetTop,
    });
  };

  return { displayResponse, bottomRef };
}

export { useBotMessage };
