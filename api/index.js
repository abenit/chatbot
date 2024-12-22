<<<<<<< HEAD
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Configuración para OpenAI API
    const API_KEY = process.env.OPENAI_API_KEY; // La clave API estará en las variables de entorno
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Eres un recepcionista virtual profesional y amable.",
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const data = await openaiResponse.json();
    res.status(200).json({ response: data.choices[0].message.content });
  } else {
    res.status(405).json({ error: "Método no permitido, usa POST." });
  }
}
=======
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Configuración para OpenAI API
    const API_KEY = process.env.OPENAI_API_KEY; // La clave API estará en las variables de entorno
    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Eres un recepcionista virtual profesional y amable.",
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    const data = await openaiResponse.json();
    res.status(200).json({ response: data.choices[0].message.content });
  } else {
    res.status(405).json({ error: "Método no permitido, usa POST." });
  }
}
>>>>>>> b4ae6d2ce2e5e21de87132a5eb8e72c539c87d52
