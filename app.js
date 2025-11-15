import { initChart, updateChart, bindRangeButtons } from "./components/chart.js";
import { renderStockList, highlightStock } from "./components/list.js";
import { renderStockDetails } from "./components/detail.js";

// importing API functions
import { getChartData } from "./api/chartApi.js";
import { getBookData } from "./api/detailsApi.js";
import { getProfileData } from "./api/detailsApi.js";  // if you split them
import { getStockList } from "./api/statsApi.js";

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
    const chartData=await getChartData(symbol,currentRange);
    const updatedChart=await updateChart(chartData);
    const bookData=await getBookData(symbol);
    const profileData=await getProfileData(symbol);
    const stockData={...bookData,...profileData};
    renderStockDetails(stockData);
}

function bindEvents() {
    // will fill later
}

// start the app
initApp();

