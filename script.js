document.getElementById("sendButton").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;

  if (!userInput.trim()) {
    document.getElementById("response").innerText = "Por favor, escribe algo.";
    return;
  }

  document.getElementById("response").innerText = "Procesando...";

  try {
    const response = await fetch("http://localhost:3000/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    document.getElementById("response").innerText = data.response;
  } catch (error) {
    document.getElementById("response").innerText = "Hubo un error.";
    console.error(error);
  }
});
