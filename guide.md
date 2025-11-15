Responsibilities
1. chart.js

Draws the stock price chart

Updates when a different stock is selected

2. list.js

Shows list of stocks in your portfolio

Click event → loads detail + chart

3. detail.js

Shows stock name

Sector

Market cap

High/low values

Buttons for “1D / 1W / 1M / 1Y / 5Y"

4. stocks.js

Has functions like:

fetchStockList();
fetchStockDetails(symbol);
fetchStockHistory(symbol, range);

5. app.js

The boss. It coordinates everything.

Steps:
list API ✔

stats API ✔

summary API ✔

chart API ✔

list.js ✔

loadStock() ✔

app.js skeleton ✔

