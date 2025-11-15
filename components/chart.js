
let chart = null;
// Zerodha-style vertical crosshair plugin
const crosshairPlugin = {
    id: "crosshair",
    afterDraw(chart) {
        if (!chart._active || !chart._active.length) return;

        const ctx = chart.ctx;
        const activePoint = chart._active[0].element;

        // x position of the hover point
        const x = activePoint.x;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chart.chartArea.top);
        ctx.lineTo(x, chart.chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#aaa";   // light gray like zerodha
        ctx.stroke();
        ctx.restore();
    }
};

export function initChart() {
    Chart.register(crosshairPlugin);

    const ctx = document.getElementById("stockChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [],
            datasets: [
                {
                    label: "",
                    data: [],
                    borderColor: "#008aff",       // Zerodha blue
                    borderWidth: 1.8,             // thin, clean line
                    tension: 0,                   // NO curve (zerodha is straight)
                    pointRadius: 0,               // no dots
                    pointHoverRadius: 0,
                    fill: false                   // no gradient fill
                }
            ]
        },
        options: {

            responsive: true,
            maintainAspectRatio: false,
            animation: false,                    // chart updates instantly

            scales: {
                x: {
                    display: false,              // Zerodha hides X axis completely
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,              // Zerodha hides Y axis too
                    grid: {
                        display: true,
                        color: "#eee",            // very light grid lines
                        lineWidth: 1
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: "#fff",
                    titleColor: "#333",
                    bodyColor: "#000",
                    titleFont: { size: 12, weight: "normal" },
                    bodyFont: { size: 14, weight: "bold" },
                    borderColor: "#ddd",
                    borderWidth: 1,
                    displayColors: false,       // no color box
                    callbacks: {
                        title: function (context) {
                            return context[0].label;       // Date
                        },
                        label: function (context) {
                            return `₹ ${context.raw}`;     // Price
                        }
                    }
                }
            },

            interaction: {
                intersect: false,
                mode: "index"
            },

            hover: {
                mode: "index",
                intersect: false
            }
        }
    });

}

export function updateChart(data) {
    if (!chart) return;

    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.values;

    chart.update();
}

