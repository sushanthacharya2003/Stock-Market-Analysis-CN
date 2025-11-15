import Chart from "chart.js/auto";

let chart = null;

export function initChart() {
    const ctx = document.getElementById("stockChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],          // empty initially
            datasets: [
                {
                    label: "Stock Price",
                    data: [],       // empty initially
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export function updateChart(data) {
    if (!chart) return;

    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;

    chart.update();
}

