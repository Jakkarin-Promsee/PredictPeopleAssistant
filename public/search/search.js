document.addEventListener('DOMContentLoaded', () => {
    const askButton = document.getElementById('askButton');
    const questionInput = document.getElementById('question');
    const responseDiv = document.getElementById('response');

    askButton.addEventListener('click', async () => {
        const question = questionInput.value.trim();
        if (question === "") {
            alert('Type your question');
            return;
        }

        try {
            const response = await fetch('/ask', { // Note: '/ask' is the endpoint you will use on your server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question }),
            });
            const data = await response.json();
            responseDiv.textContent = data.answer || 'There is no answer.';
        } catch (error) {
            responseDiv.textContent = 'error';
        }
    });
});
