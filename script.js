const createBtn = document.querySelector("#create")
const formDiv = document.querySelector(".form")
const closeBtn = document.querySelector("#close")
const productDiv = document.querySelector(".products")

const form = document.querySelector("form")

// Get products from localStorage
// If no products exist, create an empty array
const productsArr = JSON.parse(localStorage.getItem("products")) || [];

// Stores the index of product being updated
// null means currently creating a new product
let updateIndex = null;

let ui = () => {

    // Clear old cards before rendering again
    // Prevents duplicate product cards
    productDiv.innerHTML = "";    // prevent from repeatative product cards

    // Loop through products array and create cards
    productsArr.forEach((elem, index) => {
        productDiv.innerHTML += `<div class="product-card">
                <div class="img">
                    <img src="${elem.image}" alt="">
                </div>
                <div class="text">
                    <h3>Name : ${elem.productName}</h3>
                    <p>Description : ${elem.description}</p>
                    <p>price : ${elem.price}</p>
                </div>
                <div class="btns">
                    <button onclick="updateProduct('${elem.productName}')" id="update">Update</button>
                    <button onclick="deleteProduct(${index})" id="delete">Delete</button>
                </div>
            </div>`
    })
}

ui()

// Open form when Create button is clicked
createBtn.addEventListener("click", () => {
    formDiv.style.display = "flex";
})

// Hide form when Close button is clicked
closeBtn.addEventListener("click", () => {
    formDiv.style.display = "none";
})

form.addEventListener("submit", (event) => {
    // Prevent page reload
    event.preventDefault();

    // Get values from input fields
    let productName = event.target[0].value;
    let description = event.target[1].value;
    let price = event.target[2].value;
    let image = event.target[3].value;

    // Check if any field is empty
    if (productName.trim() === "" || description.trim() === "" || price.trim() === "" || image === "") {
        alert("please fill all the details");
        return
    }

    // Create product object
    let obj = {
        productName,
        description,
        price,
        image
    }

    // If updateIndex has value
    // replace old product with new data
    if (updateIndex !== null) {
        productsArr[updateIndex] = obj;   // take the index and overright it 

        // Reset update mode
        updateIndex = null;

        // Save updated array in localStorage
        localStorage.setItem("products", JSON.stringify(productsArr))
    }
    else {   // Otherwise create new product
        productsArr.push(obj);    // used to create a new product and push it in array
        localStorage.setItem("products", JSON.stringify(productsArr))
    }

    ui();

    form.reset();
    formDiv.style.display = "none";
})

let updateProduct = (name) => {      // finding the product and index of this name 
    formDiv.style.display = "flex";

    // Find product object using product name
    let product = productsArr.find((elem) => elem.productName === name);

    // Find position/index of that product
    updateIndex = productsArr.findIndex((elem) => elem.productName === name);

    // Fill form with existing product data
    // User can edit and save it
    form[0].value = product.productName;
    form[1].value = product.description;
    form[2].value = product.price;
    form[3].value = product.image;
}

let deleteProduct = (index) => {
    // Remove product from array
    // index tells which product to remove
    productsArr.splice(index, 1);

    // Update localStorage after deletion
    localStorage.setItem("products", JSON.stringify(productsArr))

    // Refresh UI
    ui();
}




// ----------- LOCAL STORAGE ---------------

// permanent storage of browser
// u can save text data in local storage
// gives max upto 5mb

// let data = [
//     {
//         name:"rutu",
//         age:21,
//         address:"mumbai"
//     },
//     {
//         name:"gotu",
//         age:21,
//         address:"mumbai"
//     },
//     {
//         name:"motu",
//         age:21,
//         address:"mumbai"
//     }
// ]

// localStorage.setItem("fam-people", JSON.stringify(data))   // convert data to string

// let lsd = localStorage.getItem("fam-people")

// let value = JSON.parse(lsd)    // convert string to orignal form

// console.log(value);