export function renderStockList(symbols, listData, onClickCallback) {
    const listContainer = document.querySelector(".stockList ul");
    listContainer.innerHTML = "";

    symbols.forEach(symbol => {
        const { bookValue, profit } = listData[symbol];

        const li = document.createElement("li");

        const button = document.createElement("button");
        button.className = "stock-item";

        button.innerHTML = `
            <strong>${symbol}</strong>
                BV: ${bookValue} | Profit: ${(profit * 100).toFixed(2)}%

        `;

        button.addEventListener("click", () => onClickCallback(symbol));

        li.appendChild(button);
        listContainer.appendChild(li);
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

