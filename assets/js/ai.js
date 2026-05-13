const GEMINI_API_KEY =
    "AIzaSyByx6wQKsZiNSzW0YUHKlxVsSZ0uWqvbNY";

async function askGemini(message) {

    try {

        const response = await fetch(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    contents: [{
                        parts: [{
                            text:
                                `
                                You are a professional GATE AI Mentor.

                                Help students in:
                                - GATE CSE preparation
                                - DBMS
                                - OS
                                - CN
                                - DSA
                                - Study planning
                                - Productivity

                                User Question:
                                ${message}
                                `
                        }]
                    }]
                })
            }

        );

        const data =
            await response.json();

        return data.candidates[0]
            .content.parts[0].text;

    } catch (error) {

        console.error(error);

        return "AI temporarily unavailable.";
    }
}