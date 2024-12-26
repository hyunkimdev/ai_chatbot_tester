const fetch = require("node-fetch");

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    if (!body.question) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Question is required" }),
        };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: body.question,
                max_tokens: 100,
            }),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data.choices[0].text.trim()),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };
    }
};
