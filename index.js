// Global date function, returns all elements of date
function getCurrentDateTime() {
    let currentDateTime = new Date()
    let day = currentDateTime.getDate();
    let month = currentDateTime.getMonth() + 1;
    let year = currentDateTime.getFullYear();
    let hours = currentDateTime.getHours();
    let minutes = currentDateTime.getMinutes();
    let seconds = currentDateTime.getSeconds();

    // returning the whole output as an object
    return { currentDateTime, day, month, year, hours, minutes, seconds };
}

// Sets the current year in footer
function setYearInFooter() {
    let year = getCurrentDateTime().year;
    document.getElementById('year').innerHTML = year;
}

// Initializing the products array
let products = [];

// Function for adding products to cart
// Takes parameters product and price
function addToCart(product, price) {
    // As the base price is being passed as a whole number
    // we divide it by 100 to get the actual decimal value
    let basePrice = parseFloat(price / 100);

    // Getting quantity from the user
    let quantity = parseInt(prompt("Please enter a quantity: ", 1));
    // Checking if entered quantity is valid
    while (isNaN(quantity) || quantity <= 0) {
        quantity = parseInt(prompt("Invalid input please enter a valid numeric value: ", 1));
    }

    let grossPrice = quantity * basePrice;

    let taxRate = 0.13;
    let tax = grossPrice * taxRate;

    let netPrice = parseFloat((grossPrice + tax).toFixed(2));
    // push an object to array
    data = {
        name: product,
        quantity: quantity,
        basePrice: basePrice.toFixed(2),
        grossPrice: grossPrice.toFixed(2),
        tax: tax.toFixed(2),
        netPrice: netPrice
    }

    products.push(data);

    // Make the checkout button visible only after adding at least one product to the cart
    document.getElementById('checkout-button').innerHTML = `<button
    class="checkout-button"
    value="Checkout"
    id="checkout-button"
    onclick="getReceipt()"
  >
    Checkout
  </button>
  `;
}

// Get the customer name
function getName() {
    let customerName = prompt("Please enter your full name for the bill: ");

    // Validate the customer name
    while (!isNaN(customerName) || !customerName || customerName.length < 2) {
        customerName = prompt("Please enter a valid name: ");
    }
    return customerName;
}

// Get the final invoice
function getReceipt() {
    let name = getName();
    if (products.length < 1) {
        alert(`Hey ${name}! No products added! Add some products to cart and try again!`)
    }
    else {
        let date = getCurrentDateTime().currentDateTime.toLocaleString('en-US');

        // Get table headers
        let table = `
        <h3>Hi <span style="color: #096bcc;">${name}!</span> Here is your bill!</h3>
        <table>
        <tr>
        <td colspan=3" class="receipt-main-heading">Invoice</td>
        <td colspan="3" class="receipt-date">Date & Time:<br /> ${date}</td>
        <tr>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Base Price</th>
        <th>Gross Price</th>
        <th>GST @13%</th>
        <th>Net Total</th>
        </tr>`

        let totalBill = 0;
        // Iterate through all available products and store in the table
        for (let i = 0; i <= products.length - 1; i++) {
            let product = products[i]
            table += `
            <tr>
            <td>${product.name}</td>
            <td class="item-align-right">x ${product.quantity}</td>
            <td class="price-align-right">$${product.basePrice}</td>
            <td class="price-align-right">$${product.grossPrice}</td>
            <td class="price-align-right">$${product.tax}</td>
            <td class="price-align-right">$${product.netPrice}</td>
            </tr>`
            totalBill += product.netPrice;
        }
        table += `
        <tr style="font-weight: 600">
        <td colspan="5"">Total Bill</td>
        <td colspan ="1" class="price-align-right">$${totalBill.toFixed(2)}</td>
        </tr>`
        table += `</table>`
        table += `<p>Thank you for shopping with us! Please visit again!</p>`

        // Print the final output
        document.getElementById('receipt-table').innerHTML = table
    }
}