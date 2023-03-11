const modal = document.querySelector('.modal')
const blur = document.querySelector('.blur')
const closeModalBtn = document.querySelector('.btn.close-modal')

// Local Storage
const products = JSON.parse(localStorage.getItem('productsList')) || [];

if(!products.length) {
  localStorage.setItem('productsList', JSON.stringify(productsList))
  location.reload();
}

// Global variables to update the UI
// Without the need to refresh the page
let productImgDiv = null;
let productInfoDiv = null

let addToCartBtn = null;
let removeFromCart = null;

let addToCartBtnToUpdateWhenUpdateFromModal = null;
let removeFromCartToUpdateWhenUpdateFromModal = null;


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
  addToCartBtn.classList.add('add_to_cart')
  addToCartBtn.textContent = "Add to Cart";
  
  const removeFromCart = document.createElement("button");
  removeFromCart.classList.add('remove_from_cart')
  removeFromCart.textContent = "Remove From Cart";

  if(product.added_to_cart) {
    addToCartBtn.classList.add('hidden')
    removeFromCart.classList.remove('hidden')
  } else {
    addToCartBtn.classList.remove('hidden')
    removeFromCart.classList.add('hidden')
  }

  // Add To Cart
  addToCartBtn.addEventListener("click", (e) => {
    addProductToCart(e)
    addToCartBtnToUpdateWhenUpdateFromModal.classList.add('hidden')
    removeFromCartToUpdateWhenUpdateFromModal.classList.remove('hidden')
  });

  // Remove from Cart
  removeFromCart.addEventListener('click', e => {
    removeProductFromCart(e)
    addToCartBtnToUpdateWhenUpdateFromModal.classList.remove('hidden')
    removeFromCartToUpdateWhenUpdateFromModal.classList.add('hidden')
  })

  productPriceBtnDiv.appendChild(productPrice);
  productPriceBtnDiv.appendChild(addToCartBtn);
  productPriceBtnDiv.appendChild(removeFromCart);

  productInfoDiv.appendChild(productTextDiv);
  productInfoDiv.appendChild(productPriceBtnDiv);

  modal.appendChild(productImgDiv)
  modal.appendChild(productInfoDiv)
}

// Handle open/close the modal
const closeModal = () => {
  productImgDiv.remove();
  productInfoDiv.remove();
  modal.classList.add('hidden')
  blur.classList.add('hidden')
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

closeModalBtn.addEventListener('click', closeModal)
blur.addEventListener('click', closeModal)