import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

import { baseData } from "@/data/baseFintechXData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: "You are a helpfull assistant",
        },
        {
          role: "user",
          content: baseData,
        },
        {
          role: "user",
          content: req.body.message,
        },
      ],
    });

    res.status(200).json({ content: response.choices[0].message.content });

    return;
  }

  res.status(405).send({ message: "Only POST requests allowed" });
  return;
}
