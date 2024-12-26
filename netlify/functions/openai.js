import fetch from "node-fetch";

export async function handler(event) {
  const { question } = JSON.parse(event.body);
  console.log("Received question:", question);

  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
      }),
    });

    console.log("API response status:", response.status);

    const data = await response.json();
    console.log("API response data:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: data.choices[0].message.content.trim() }),
    };
  } catch (error) {
    console.error("Error during API call:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred." }),
    };
  }
}
