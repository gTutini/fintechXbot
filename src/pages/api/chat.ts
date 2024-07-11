import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const baseData = `
Informações sobre a FintechX:
A FintechX é uma fintech brasileira líder que revoluciona a gestão financeira 
diária com tecnologia de ponta. Oferece serviços como contas digitais sem tarifas, 
investimentos personalizados e crédito flexível, garantindo segurança e rapidez nas 
transações. Além disso, prioriza a educação financeira, capacitando clientes a tomar 
decisões informadas, com suporte especializado disponível.
A FintechX atende de segunda-feira a sábado, das 08:00 ás 20:00.
Temos escritórios em São Paulo, São Francisco e Nova York.
A FintechX foi fundada em 2014 por Carlos Roberto Gonçalves.
Para proteger os seus dados, a FintechX estabelece processos e controles para prevenção, 
detecção e resposta a incidentes e proteção dos seus dados de acessos e usos não autorizados, 
garantindo a gestão do risco de segurança, inclusive cibernética, e a construção de um 
alicerce robusto de segurança.
Caso receba um e-mail suspeito pedindo alguma ação ou informação, 
abra uma página na internet e acesse direto o site, digitando o 
endereço oficial na barra do navegador. Não utilize endereços salvos 
nos favoritos. Você também pode abrir o app do seu banco para 
procurar aquela informação, mensagem ou entrar em contato conosco 
por um dos nossos números de telefone oficiais.
A FintechX tem atende por depois telefones:
Para capitais e regiões metropolitanas: 7070 0952
Para demais localidades: 0800 348 2374
Na FintechX você pode aprender mais sobre investimentos e poupança por que oferecemos 
uma abordagem abrangente para aprender sobre investimentos e poupança. Nossos serviços 
incluem educação financeira personalizada através de workshops e consultoria 
especializada para ajudá-lo a criar um plano de investimentos alinhado com 
seus objetivos. Você tem acesso a uma plataforma completa de informações, 
incluindo artigos e ferramentas interativas, além de suporte contínuo de 
nossa equipe dedicada. Comece sua jornada para uma melhor compreensão 
financeira conosco e construa um futuro financeiro mais sólido.
Para receber nossas promoções e descontos, você pode se 
inscrever através do nosso site oficial. Procure pela 
seção de inscrição para promoções e preencha o formulário 
com suas informações pessoais, como nome completo, endereço 
de e-mail e, se necessário, número de telefone. Após enviar 
seus dados, você poderá receber um e-mail de confirmação para 
validar sua inscrição. Assim, você estará pronto para receber
nossas ofertas especiais diretamente em sua caixa de entrada.
`;

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

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

    // const response = {
    //   object: "chat.completion",
    //   created: 1720634562,
    //   model: "gpt-3.5-turbo-0125",
    //   choices: [
    //     {
    //       index: 0,
    //       message: {
    //         role: "assistant",
    //         content:
    //           "A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.A FintechX atende de segunda-feira a sábado, das 08:00 às 20:00.",
    //       },
    //       logprobs: null,
    //       finish_reason: "stop",
    //     },
    //   ],
    //   usage: {
    //     prompt_tokens: 715,
    //     completion_tokens: 24,
    //     total_tokens: 739,
    //   },
    //   system_fingerprint: null,
    // };

    // await delay(2000);

    res.status(200).json({ content: response.choices[0].message.content });

    return;
  }

  res.status(405).send({ message: "Only POST requests allowed" });
  return;
}
