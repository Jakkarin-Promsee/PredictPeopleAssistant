document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line', // Type of chart: 'bar', 'line', 'pie', etc.
        data: {
            labels: ['10.00', '10.30', '11.00', '11.30', '12.00'],
            datasets: [{
                label: 'people',
                data: [12, 19, 25, 54, 23],
                //backgroundColor: 'rgba(75, 192, 192, 0.2)',
                //borderColor: 'rgba(75, 192, 192, 1)',
                //borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('searchButton').addEventListener('click', () => {
        const searchTerm = document.getElementById('search').value;
        alert('Search button clicked with term: ' + searchTerm);
    });
});
