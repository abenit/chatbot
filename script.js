document.getElementById("sendButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;

  // Verifica si el usuario ingresó algún texto
  if (!userInput.trim()) {
    document.getElementById("response").innerText = "Por favor, escribe algo.";
    return;
  }

  // Muestra un mensaje mientras se procesa la solicitud
  document.getElementById("response").innerText = "Procesando...";

  try {
    // Realiza la solicitud al backend
    const response = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    // Maneja errores de la respuesta del servidor
    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById("response").innerText = `Error del servidor: ${
        errorData.error || "Error desconocido."
      }`;
      console.error("Error en el servidor:", errorData);
      return;
    }

    // Procesa y muestra la respuesta del backend
    const data = await response.json();
    document.getElementById("response").innerText = data.response;
  } catch (error) {
    // Maneja errores en la conexión o en el fetch
    document.getElementById("response").innerText =
      "Hubo un error en la conexión. Intenta nuevamente.";
    console.error("Error en el cliente:", error);
  }
});
