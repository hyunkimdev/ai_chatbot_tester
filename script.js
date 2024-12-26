const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = "https://api.openai.com/v1/completions";

document.getElementById("ask-btn").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");

  if (!question) {
    responseDiv.textContent = "Please input your question!";
    return;
  }

  responseDiv.textContent = "Generating an answer...";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    responseDiv.textContent = data.choices[0].text.trim();
  } catch (error) {
    responseDiv.textContent = "An error occurred. Please try again.";
    console.error(error);
  }
});
