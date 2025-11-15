import { initChart, updateChart, bindRangeButtons } from "./components/chart.js";
import { renderStockList, highlightStock } from "./components/list.js";
import { renderStockDetails } from "./components/detail.js";

// importing API functions
import { getChartData } from "./api/chartApi.js";
import { getBookData } from "./api/statsApi.js";
import { getStockList } from "./api/statsApi.js";
import { getStockSummary } from "./api/stockSummaryApi.js";  // if you split them

let currentSymbol = null;
let currentRange = "1mo";

async function initApp() {
    initChart();
    await loadStockList();
    bindEvents();
    loadStockList();
    loadStock();
    setupRangeButtons();

}

async function loadStockList() {
    const list=await getStockList();
    const symbols=Object.keys(list);
    renderStockList(symbols,(symbol)=>{
    currentSymbol = symbol;
    highlightStock(symbol);
    loadStock(symbol);
    });
    currentSymbol = symbols[0]
    highlightStock(currentSymbol)
    loadStock(currentSymbol)

}

//range_buttons

// Select all range buttons INSIDE the range-buttons container
const rangeButtons = document.querySelectorAll(".range-buttons button");

function setupRangeButtons() {
    rangeButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            // update the global range
            currentRange = btn.dataset.range;

            // reload chart for the currently selected stock
            loadStock(currentSymbol);

            // highlight the current button
            highlightRangeButton(btn);
        });
    });
}

function highlightRangeButton(activeBtn) {
    rangeButtons.forEach(btn => {
        btn.classList.remove("active");      // remove active state
    });

    activeBtn.classList.add("active");       // add active to clicked button
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

