document.getElementById("ask-btn").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseDiv = document.getElementById("response");

  if (!question) {
      responseDiv.textContent = "Please input your question!";
      responseDiv.classList.add('show');
      return;
  }

  responseDiv.textContent = "Generating an answer...";
  responseDiv.classList.remove('show');

  try {
      const response = await fetch("/.netlify/functions/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();

      if (data.answer) {
          responseDiv.textContent = data.answer;
      } else {
          responseDiv.textContent = "No answer received.";
      }
  } catch (error) {
      responseDiv.textContent = "An error occurred. Please try again.";
      console.error(error);
  }

  responseDiv.classList.add('show');  // Show the response box
});
