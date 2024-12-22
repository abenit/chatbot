export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "El mensaje es obligatorio." });
    }

    try {
      const API_KEY = process.env.OPENAI_API_KEY;
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

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error("Error en OpenAI:", errorData);
        return res
          .status(openaiResponse.status)
          .json({ error: "Error en la API de OpenAI." });
      }

      const data = await openaiResponse.json();
      res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
      console.error("Error interno del servidor:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ error: "Método no permitido, usa POST." });
  }
}
