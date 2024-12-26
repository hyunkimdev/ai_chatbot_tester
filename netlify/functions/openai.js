const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { question } = JSON.parse(event.body);

  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred." }),
    };
  }
};
