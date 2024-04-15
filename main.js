document.addEventListener("DOMContentLoaded", function() {
        const products = document.querySelectorAll(".card");
        const tableBody = document.querySelector(".table tbody");
    
        products.forEach(product => {
            const basketBtn = product.querySelector(".btn.basket");
            const productName = product.querySelector(".card-title").textContent.trim();
            const productPrice = parseFloat(product.querySelector(".card-text").textContent.replace("$", ""));
    
            let count = 0;
            let totalPrice = 0;
    
            basketBtn.addEventListener("click", function() {
                count++;
                totalPrice += productPrice;
                updateTableRow();
            });
    
            function updateTableRow() {
                const existingRow = tableBody.querySelector(`tr[data-product="${productName}"]`);
                if (existingRow) {
                    existingRow.querySelector(".count").textContent = count;
                    existingRow.querySelector(".total-price").textContent = totalPrice.toFixed(2) + "$";
                } else {
                    const newRow = document.createElement("tr");
                    newRow.dataset.product = productName;
                    newRow.innerHTML = `
                        <td>${productName}</td>
                        <td class="count">${count}</td>
                        <td class="total-price">${totalPrice.toFixed(2)}$</td>
                        <td>
                            <button class="btn btn-success increase">+</button>
                            <button class="btn btn-danger decrease">-</button>
                            <button class="btn btn-danger delete-product">Delete</button>
                        </td>
                    `;
                    
                    newRow.querySelector(".increase").addEventListener("click", function() {
                        count++;
                        totalPrice += productPrice;
                        updateTableRow();
                    });
    
                    newRow.querySelector(".decrease").addEventListener("click", function() {
                        if (count > 1) {
                            count--;
                            totalPrice -= productPrice;
                            updateTableRow();
                        }
                    });
    
                    newRow.querySelector(".delete-product").addEventListener("click", function() {
                        newRow.remove();
                    });
    
                    tableBody.appendChild(newRow);
                }
            }
        });
    });
    