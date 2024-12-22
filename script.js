document.getElementById("sendButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;

  if (!userInput.trim()) {
    document.getElementById("response").innerText = "Por favor, escribe algo.";
    return;
  }

  document.getElementById("response").innerText = "Procesando...";

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById("response").innerText = `Error del servidor: ${
        errorData.error || "Error desconocido."
      }`;
      console.error("Error en el servidor:", errorData);
      return;
    }

    const data = await response.json();
    document.getElementById("response").innerText = data.response;
  } catch (error) {
    document.getElementById("response").innerText =
      "No se pudo conectar con el servidor. Intenta nuevamente.";
    console.error("Error de conexión:", error);
  }
});
