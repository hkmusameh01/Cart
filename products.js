// There is Code at the bottom

let productsList = [
  {
    id: 1,
    product_name: "T-shirt1",
    product_price: "112.55",
    product_image: "https://i.pinimg.com/564x/07/49/3d/07493df68cde1ae2240ba9cb9d78040b.jpg",
    added_to_cart: false
  },
  {
    id: 2,
    product_name: "T-shirt2",
    product_price: "856.99",
    product_image: "https://i.pinimg.com/564x/c3/a9/43/c3a94366965a7abac8dd3469d9b6b5d0.jpg",
    added_to_cart: true
  },
  {
    id: 3,
    product_name: "T-shirt3",
    product_price: "75.00",
    product_image: "https://i.pinimg.com/564x/78/d1/79/78d179b17aecd88f9d66f9da4887fd52.jpg",
    added_to_cart: false
  },
  {
    id: 4,
    product_name: "T-shirt4",
    product_price: "399.99",
    product_image: "https://i.pinimg.com/236x/93/3a/8c/933a8c472f7ef5c2194a3549b65a4a19.jpg",
    added_to_cart: true
  },
  {
    id: 5,
    product_name: "T-shirt5",
    product_price: "249.99",
    product_image: "https://i.pinimg.com/236x/86/6b/c8/866bc87f9aa9a492763b580761bee5a8.jpg",
    added_to_cart: false
  },
  {
    id: 6,
    product_name: "T-shirt6",
    product_price: "299.99",
    product_image: "https://i.pinimg.com/474x/d9/cb/23/d9cb231471ec32b27b9edee59abbd579.jpg",
    added_to_cart: false
  }
];

localStorage.setItem('productsList', JSON.stringify(productsList))

const products = JSON.parse(localStorage.getItem('productsList'))


let productImgDiv = null;
let productInfoDiv = null

const modal = document.querySelector('.modal')

const generateModal = (product) => {
  productImgDiv = document.createElement("div");
  productImgDiv.classList.add("product-img");
  
  const productImg = document.createElement("img");
  productImg.src = product.product_image;
  
  productImgDiv.appendChild(productImg);
  
  productInfoDiv = document.createElement("div");
  productInfoDiv.classList.add("product-info");
  productInfoDiv.classList.add("product");
  productInfoDiv.id = product.id

  const productTextDiv = document.createElement("div");
  productTextDiv.classList.add("product-text");

  const productName = document.createElement("h1");
  productName.textContent = product.product_name;

  const productDescription = document.createElement("p");
  productDescription.textContent = "Lorem text just to make it nice look! Lorem text just to make it nice look! Lorem text just to make it nice look! Lorem text just to make it nice look!";

  productTextDiv.appendChild(productName);
  productTextDiv.appendChild(productDescription);

  const productPriceBtnDiv = document.createElement("div");
  productPriceBtnDiv.classList.add("product-price-btn");

  const productPrice = document.createElement("p");
  productPrice.textContent = product.product_price + '$';

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  
  const removeFromCart = document.createElement("button");
  removeFromCart.textContent = "Remove From Cart";

  if(product.added_to_cart) {
    addToCartBtn.style.display = 'none'
    removeFromCart.style.display = 'inline-block'
  } else {
    addToCartBtn.style.display = 'inline-block'
    removeFromCart.style.display = 'none'
  }

  // Add To Cart
  addToCartBtn.addEventListener("click", (e) => {
    addProductToCart(e)
    addToCartBtnToUpdateWhenUpdateFromModal.style.display = 'none'
    removeFromCartToUpdateWhenUpdateFromModal.style.display = 'inline-block'
  });

  // Remove from Cart
  removeFromCart.addEventListener('click', e => {
    removeProductFromCart(e)
    addToCartBtnToUpdateWhenUpdateFromModal.style.display = 'inline-block'
    removeFromCartToUpdateWhenUpdateFromModal.style.display = 'none'
  })

  productPriceBtnDiv.appendChild(productPrice);
  productPriceBtnDiv.appendChild(addToCartBtn);
  productPriceBtnDiv.appendChild(removeFromCart);

  productInfoDiv.appendChild(productTextDiv);
  productInfoDiv.appendChild(productPriceBtnDiv);

  modal.appendChild(productImgDiv)
  modal.appendChild(productInfoDiv)
}