export function renderStockList(symbols, onClickCallback) {
    const listContainer = document.querySelector("#stockList");
    listContainer.innerHTML = "";

    symbols.forEach((symbol) => {
        const stockButton = document.createElement("button");   // FIX 1 + FIX 2
        stockButton.className = "stock-item";
        stockButton.textContent = symbol;

        stockButton.addEventListener("click", () => {
            onClickCallback(symbol);
        });

        listContainer.appendChild(stockButton);                 // FIX 3
    });
}

export function highlightStock(symbol) {
    const items = document.querySelectorAll(".stock-item");

    items.forEach(item => {
        if (item.textContent === symbol) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}
