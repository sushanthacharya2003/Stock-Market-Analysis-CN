function renderStockDetails(details){
const detailBox = document.querySelector("#stockDetails");
detailBox.innerHTML=`<h1>Stock Summary </h1>
<p>${details.summary}</p>`;
}

