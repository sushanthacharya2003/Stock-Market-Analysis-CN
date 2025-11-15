export async function getStockSummary(symbol) {
    const res = await fetch("https://stock-market-api-k9vl.onrender.com/api/profiledata");
    const data = await res.json();

    const allProfiles = data.stocksProfileData[0];

    const stock = allProfiles[symbol];
    if (!stock) {
        console.error("Profile not found for:", symbol);
        return null;
    }

    const { summary } = stock;

    return { summary };
}
