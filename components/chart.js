async function getChartDetails() {
    const res= await fetch(https://stock-market-api-k9vl.onrender.com/api/stocksdata);
    const data=res.json();
    return data.stocksData
}

