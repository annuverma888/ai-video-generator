// script.js
document.getElementById('generateButton').addEventListener('click', generateVideoContent);

async function generateVideoContent() {
    const topic = document.getElementById('topic').value;
    const subjectArea = document.getElementById('subjectArea').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const duration = document.getElementById('duration').value;

    // Simple client-side validation
    if (!topic || !subjectArea || !targetAudience || !duration) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate-video', { // Replace with your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic, subjectArea, targetAudience, desiredLengthMinutes: duration })
        });

        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }

        const data = await response.json();

        if (data.success) {
            document.getElementById('script').textContent = data.videoContent.script;
            document.getElementById('visualSuggestions').textContent = data.videoContent.visualSuggestions;
             document.getElementById('quizQuestions').textContent = data.videoContent.quizQuestions;
        } else {
            alert('Error: ${data.error}');
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        alert('Error: ${error.message}');
    }
    
}
const apiKey = "YOUR_OPENAI_API_KEY";  // Replace with your API key

    async function chatWithGPT(userMessage) {
        const apiUrl = "https://api.openai.com/v1/chat/completions";
    
        const requestBody = {
            model: "gpt-4", // You can change it to "gpt-3.5-turbo" for a cheaper option
            messages: [{ role: "system", content: "You are a helpful assistant." },
                       { role: "user", content: userMessage }],
            max_tokens: 100,
            temperature: 0.7
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });
    
            const data = await response.json();
            console.log("GPT Response:", data.choices[0].message.content);
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
        }
    }
    
    // Example usage:
    chatWithGPT("Hello, how are you?").then(response => {
        document.getElementById("chatOutput").innerText = response;
    });