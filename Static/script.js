document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyList = document.getElementById('history-list');

    // Function to update the history list on the page
    function updateHistory(historyData) {
        historyList.innerHTML = ''; // Clear existing history
        historyData.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.innerHTML = `
                <span class="expression">${item.expression}</span>
                <span class="result">= ${item.result}</span>
            `;
            historyItem.addEventListener('click', () => {
                display.value = item.expression;
            });
            historyList.appendChild(historyItem);
        });
    }

    // Function to fetch history from the backend
    function fetchHistory() {
        fetch('/history')
            .then(response => response.json())
            .then(data => updateHistory(data))
            .catch(error => console.error('Error fetching history:', error));
    }

    // Initial fetch of history when the page loads
    fetchHistory();

    // Event listener for the clear history button
    clearHistoryBtn.addEventListener('click', () => {
        fetch('/clear-history', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                updateHistory([]); // Clear the local history list
            })
            .catch(error => console.error('Error clearing history:', error));
    });
});

function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const expression = document.getElementById('display').value;
    
    // Replace visual operators with spaces for backend parsing
    const cleanedExpression = expression.replace(/([+\-*/])/g, ' $1 ');

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: cleanedExpression }),
    })
    .then(response => response.json())
    .then(data => {
        const display = document.getElementById('display');
        if (data.error) {
            display.value = 'Error: ' + data.error;
        } else {
            display.value = data.result;
            // Update the history list on the page
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = '';
            data.history.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.classList.add('history-item');
                historyItem.innerHTML = `
                    <span class="expression">${item.expression}</span>
                    <span class="result">= ${item.result}</span>
                `;
                historyItem.addEventListener('click', () => {
                    display.value = item.expression;
                });
                historyList.appendChild(historyItem);
            });
        }
    })
    .catch(error => {
        document.getElementById('display').value = 'Error: Unexpected error';
        console.error('Fetch Error:', error);
    });
}