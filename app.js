document.getElementById("sentimentForm").addEventListener("submit", function(e) {
    e.preventDefault(); e

    const inputText = document.getElementById("inputText").value;

    if (inputText.trim() === "") {
        alert("Write your feelings, please.");
        return;
    }
    document.getElementById("clearButton").addEventListener("click", function() {
        document.getElementById("inputText").value = ""; // Limpiar texto
        document.getElementById("result").innerHTML = ""; // Limpiar resultado
    });
    // Procesando texto
    document.getElementById("result").innerHTML = "<p>Analyzing the Sentiment...</p>";

    // Lllamada a la API de Hugging Face y modelo
    fetch("https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: inputText
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data[0]); // Imprimir la respuesta completa para inspección

        // Ajuste del acceso a los datos
            const sentimentData = data[0];
            const sentiment = sentimentData[0].label; // Etiqueta del sentimiento
            const score = sentimentData[0].score; // Puntuación de confianza

            console.log('Sentiment: ${sentiment}, Score: ${score}');

            let sentimentText = "";
            let sentimentGifUrl = "";
            let commentsentiment="";

            if (sentiment == "negative") {
                sentimentText = "Negative 😞";
                sentimentGifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2wydGRwM3p3NWlpbXUwbDMwdHZjaGMweXVpNTBrbnYxcnZlOGllMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dXckBa1HDG86RqUh19/giphy.webp";
                commentsentiment = "You are not alone in this. Every day is a new opportunity to improve!"
            } else if (sentiment == "neutral") {
                sentimentText = "Neutral 😐";
                sentimentGifUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTI3dXNidGhrazg1NW40MHBwcHR6dXNvc2JvZnZnMHB5c2lja2w5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H47VxJRkvQU3a7FOPf/giphy.webp";
                commentsentiment = "Remember that it's okay to have quiet days. Every emotion counts on the path of growth"
            } else if (sentiment == "positive") {
                sentimentText = "Positive 😊";
                sentimentGifUrl = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3B1ODJlbHl0aDhweXp5a3lpNGV4NHoxNDY1dHZ1d2NjZm85cWVvbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdfyKrN7HGTIY/giphy.webp";
                commentsentiment= "Amazing! It's a great moment to share it with others"
            }

            //Imprimir resultado
           
            document.getElementById("result").innerHTML = `<p>Sentiment detected: <strong>${sentimentText}</strong> (Score: ${(score * 100).toFixed(2)}%)</p>
            ${sentimentGifUrl ? `<img src="${sentimentGifUrl}" alt="${sentimentText}">` : ''}`;

            // Solicitar permiso para las notificaciones push
              if (Notification.permission === "granted") {
                navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification("Sentiment Result", {
                        body: `Sentimiento detectado: ${sentimentText}\n${commentsentiment}`,
                    });
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        navigator.serviceWorker.ready.then(registration => {
                            registration.showNotification("Sentiment Result", {
                                body: `Sentimiento detectado: ${sentimentText}\n${commentsentiment}`,
                            });
                        });
                    }
                });
            }
        })
    .catch(error => {
        console.error("Sentiment analysis error:", error);
        document.getElementById("result").innerHTML = "<p>Sentiment analysis error.</p>";
    });
});

