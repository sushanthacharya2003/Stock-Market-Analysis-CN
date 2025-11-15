import { initChart, updateChart } from "./components/chart.js";
import { renderStockList, highlightStock } from "./components/list.js";
import { renderStockDetails } from "./components/detail.js";

import { getChartData } from "./api/chartApi.js";
import { getBookData, getStockList } from "./api/statsApi.js";
import { getStockSummary } from "./api/stockSummaryApi.js";

let currentSymbol = null;
let currentRange = "1mo";

// -------- INIT APP --------
async function initApp() {
    initChart();
    await loadStockList();
    setupRangeButtons();
}

initApp();

// -------- LOAD STOCK LIST --------
async function loadStockList() {
    const listData = await getStockList();     // full object with BV + profit
    const symbols = Object.keys(listData);     // convert to ["AAPL","MSFT"]

    // render list with details
    renderStockList(symbols, listData, (symbol) => {
        currentSymbol = symbol;
        highlightStock(symbol);
        loadStock(symbol);
    });

    // auto-select the first stock
    currentSymbol = symbols[0];
    highlightStock(currentSymbol);
    loadStock(currentSymbol);
}

// -------- LOAD SINGLE STOCK (chart + summary) --------
async function loadStock(symbol) {
    if (!symbol) return;

    const chartData = await getChartData(symbol, currentRange);
    updateChart(chartData);

    const bookData = await getBookData(symbol);
    const profileData = await getStockSummary(symbol);

    const stockData = {
        ...bookData,
        ...profileData
    };

    renderStockDetails(stockData);
}

// -------- RANGE BUTTONS --------
function setupRangeButtons() {
    const buttons = document.querySelectorAll(".range-buttons button");

    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentRange = btn.dataset.range;
            loadStock(currentSymbol);
            highlightRangeButton(btn);
        });
    });

    // optionally: set first range as active by default
    highlightRangeButton(buttons[0]);
}

function highlightRangeButton(activeBtn) {
    const buttons = document.querySelectorAll(".range-buttons button");
    buttons.forEach(btn => btn.classList.remove("active"));
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
}

