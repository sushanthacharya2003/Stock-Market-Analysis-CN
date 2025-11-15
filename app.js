import { initChart, updateChart, bindRangeButtons } from "./components/chart.js";
import { renderStockList, highlightStock } from "./components/list.js";
import { renderStockDetails } from "./components/detail.js";

// importing API functions
import { getChartData } from "./api/chartApi.js";
import { getBookData } from "./api/detailsApi.js";
import { getProfileData } from "./api/detailsApi.js";  // if you split them
import { getStockList } from "./api/listApi.js";

let currentSymbol = null;
let currentRange = "1mo";

async function initApp() {
    await loadStockList();
    initChart();
    bindEvents();
}

async function loadStockList() {
    // will fill later
}

async function loadStock(symbol) {
    // will fill later
}

function bindEvents() {
    // will fill later
}

// start the app
initApp();

