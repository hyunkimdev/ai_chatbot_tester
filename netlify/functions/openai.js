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
    
        const data = await response.json();
    
        console.log("Full API response data:", JSON.stringify(data, null, 2));
    
        // **에러 처리 코드 추가**
        if (data.error) {
            console.error("API Error:", data.error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: data.error.message || "API call failed" }),
            };
        }
    
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
            throw new Error("Invalid API response format");
        }
    
        return {
            statusCode: 200,
            body: JSON.stringify({ answer: data.choices[0].message.content.trim() }),
        };
    } catch (error) {
        console.error("Error during API call:", error);
    
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}    
  