export async function getChartData(symbol, range) {
    const res = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksdata");
    const data = await res.json();

    // the main stock data object
    const allStocks = data.stocksData[0];

    // get selected stock like AAPL or MSFT
    const stock = allStocks[symbol];

    if (!stock) {
        console.error("Symbol not found:", symbol);
        return null;
    }

    const rangeData = stock[range];

    if (!rangeData) {
        console.error("Range not found:", range);
        return null;
    }

    const { value, timeStamp } = rangeData;

    // convert timestamps → dd/mm/yyyy
    const dates = timeStamp.map(t => {
        const d = new Date(t * 1000);
        return d.toLocaleDateString();
    });

    return {
        dates,
        prices: value
    };
}

