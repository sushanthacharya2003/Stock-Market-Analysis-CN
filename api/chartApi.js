export async function getChartData(symbol, range) {
    const res = await fetch("https://stock-market-api-k9vl.onrender.com/api/stocksdata");
    const data = await res.json();

    const allStocks = data.stocksData[0];

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

    const labels = timeStamp.map(t => {
        const d = new Date(t * 1000);
        return d.toLocaleDateString();
    });

    return {
        labels,      // <- chart.js uses this
        values: value
    };
}

