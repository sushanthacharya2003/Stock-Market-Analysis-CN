export async function getBookData(symbol) {
    const res = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata");
    const data = await res.json();

    const allDetails = data.stocksStatsData[0];

    const stock = allDetails[symbol];
    if (!stock) {
        console.error("Symbol not found:", symbol);
        return null;
    }

    const { bookValue, profit } = stock;

    return { bookValue, profit };
}

export async function getStockList() {
    const res = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata");
    const data = await res.json();

    const allDetails = data.stocksStatsData[0];

    // Remove _id and keep only valid stocks
    let cleaned = {};
    for (let key in allDetails) {
        if (key !== "_id") {
            cleaned[key] = allDetails[key];
        }
    }

    return cleaned;   // returns {AAPL:{bookValue, profit}, MSFT:{...}}
}
