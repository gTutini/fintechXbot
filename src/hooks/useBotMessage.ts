import { useEffect, useState } from "react";

function useBotMessage(message: string) {
  const [, setCompletedTyping] = useState(false);
  const [displayResponse, setDisplayResponse] = useState("");

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = message;

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [message]);

  return { displayResponse };
}

export { useBotMessage };
