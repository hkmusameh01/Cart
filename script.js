const productsContainer = document.querySelector(".products-container");
const cartIcon = document.querySelector('.fa-cart-shopping.cart');
const indicator = document.querySelector('.indicator');
const cart = document.getElementById("cart");
const blur = document.querySelector('.blur')
const body = document.querySelector('body')
const closeModalBtn = document.querySelector('.btn.close-modal')

cartIcon.addEventListener('click', (e) => {
  cart.classList.toggle('hidden')
})

const closeModal = () => {
  productImgDiv.remove();
  productInfoDiv.remove();
  modal.classList.add('hidden')
  blur.classList.add('hidden')
  body.style.overflow = 'auto'
}

closeModalBtn.addEventListener('click', closeModal)
blur.addEventListener('click', closeModal)

let addToCartBtn = null;
let removeFromCart = null;

let addToCartBtnToUpdateWhenUpdateFromModal = null;
let removeFromCartToUpdateWhenUpdateFromModal = null;

// function call to generate product cards
function generateProductCards(products) {
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.setAttribute('id', product.id)

    const productImageDiv = document.createElement('div');
    productImageDiv.classList.add('product-image');

    const productImage = document.createElement('img');
    productImage.src = product.product_image;
    productImage.alt = product.product_name;

    productImageDiv.appendChild(productImage);
    productDiv.appendChild(productImageDiv);

    const productInfoDiv = document.createElement('div');
    productInfoDiv.classList.add('product-info');

    const productName = document.createElement("h4");
    productName.classList.add('name');
    productName.textContent = product.product_name;

    const productPrice = document.createElement("p");
    productPrice.classList.add('price');
    productPrice.textContent = "$" + product.product_price;

    productInfoDiv.appendChild(productName);
    productInfoDiv.appendChild(productPrice);
    productDiv.appendChild(productInfoDiv);

    const btnsDiv = document.createElement('div');
    btnsDiv.classList.add('btns');

    addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add('add_to_cart');
    addToCartBtn.textContent = 'Add to Cart'

    removeFromCart = document.createElement("button");
    removeFromCart.classList.add('remove_from_cart');
    removeFromCart.textContent = 'Remove from Cart';

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
    });

    // Remove from Cart
    removeFromCart.addEventListener('click', e => {
      removeProductFromCart(e)
    })

    const quickViewBtn = document.createElement("button");
    quickViewBtn.classList.add('quick_view');

    const quickViewIcon1 = document.createElement('i');
    quickViewIcon1.classList.add('fa-regular', 'fa-eye');

    const quickViewIcon2 = document.createElement('i');
    quickViewIcon2.classList.add('fa-regular', 'fa-eye-slash');

    quickViewBtn.addEventListener("click", e => {
      modal.classList.remove('hidden')
      blur.classList.remove('hidden')
      body.style.overflow = 'hidden'
      generateModal(product)
      removeFromCartToUpdateWhenUpdateFromModal = quickViewBtn.previousElementSibling
      addToCartBtnToUpdateWhenUpdateFromModal = removeFromCartToUpdateWhenUpdateFromModal.previousElementSibling
    });

    quickViewBtn.appendChild(quickViewIcon1);
    quickViewBtn.appendChild(quickViewIcon2);
    btnsDiv.appendChild(addToCartBtn);
    btnsDiv.appendChild(removeFromCart);
    btnsDiv.appendChild(quickViewBtn);
    productDiv.appendChild(btnsDiv);

    productsContainer.appendChild(productDiv);
  });
}
generateProductCards(products)

function generateCartProducts(carProducts) {
  carProducts.forEach(product => {
    const cartProduct = document.createElement("div");
    cartProduct.className = "product";
    cartProduct.setAttribute('id', product.id)

    const img = document.createElement("img");
    img.src = product.product_image;
    img.alt = product.product_name;

    const productTitle = document.createElement("div");
    productTitle.className = "product-title";
    productTitle.textContent = product.product_name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.product_price;

    const cartBtns = document.createElement("div");
    cartBtns.className = "cart-btns";

    const quickViewBtn = document.createElement("button");
    quickViewBtn.className = "btn quick_view";

    const quickViewIcon1 = document.createElement("i");
    quickViewIcon1.className = "fa-regular fa-eye";

    const quickViewIcon2 = document.createElement("i");
    quickViewIcon2.className = "fa-regular fa-eye-slash";

    quickViewBtn.addEventListener("click", e => {
      modal.classList.remove('hidden')
      blur.classList.remove('hidden')
      body.style.overflow = 'hidden'
      generateModal(product)
    });

    quickViewBtn.appendChild(quickViewIcon1);
    quickViewBtn.appendChild(quickViewIcon2);

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn remove";

    removeBtn.addEventListener('click', e => {
      e.target.closest('.product').remove()
      const id = +e.target.closest('.product').id;

      const arr = Array.from(productsContainer.querySelectorAll('.product'))
      let ele = null;
      arr.forEach((item) => {
        if(+item.id === id) ele = item
      })
      
      addToCartBtn = ele.querySelector('.add_to_cart')
      removeFromCart = ele.querySelector('.remove_from_cart')

      const newList = products.filter(prod => {
        if(prod.id === id) prod.added_to_cart = false
   
        return prod
      })
      localStorage.setItem('productsList', JSON.stringify(newList))

      addToCartBtn.style.display = 'inline-block'
      removeFromCart.style.display = 'none'

      let inde = Number(indicator.textContent);
      indicator.textContent = --inde
    })

    const removeIcon = document.createElement("i");
    removeIcon.className = "fa-sharp fa-solid fa-xmark";

    removeBtn.appendChild(removeIcon);

    cartBtns.appendChild(quickViewBtn);
    cartBtns.appendChild(removeBtn);

    cartProduct.appendChild(img);
    cartProduct.appendChild(productTitle);
    cartProduct.appendChild(price);
    cartProduct.appendChild(cartBtns);

    cart.appendChild(cartProduct);
  })
}

// filter which products in the cart at the first load!
const cartProducts = (products) => products.filter((product) => {
  return product.added_to_cart === true
})

// call the function to generate cart products
const cartProductsList = cartProducts(JSON.parse(localStorage.getItem('productsList')))
indicator.textContent = cartProductsList.length
generateCartProducts(cartProductsList);

const removeProductFromCart = (e) => {
  const id = +e.target.closest('.product').id;

  removeFromCart = e.target;
  addToCartBtn = e.target.previousElementSibling;

  const newList = products.filter(prod => {
    if(prod.id === id) prod.added_to_cart = false;

    return prod
  })

  localStorage.setItem('productsList', JSON.stringify(newList))
  addToCartBtn.style.display = 'inline-block'
  removeFromCart.style.display = 'none'
  
  cart.querySelectorAll('.product').forEach((prod) => {
    prod.remove();
  })
  
  const cartProductsList = cartProducts(JSON.parse(localStorage.getItem('productsList')))
  indicator.textContent = cartProductsList.length
  generateCartProducts(cartProductsList);
}

const addProductToCart = (e) => {
  const id = +e.target.closest('.product').id;

  addToCartBtn = e.target;
  removeFromCart = e.target.nextElementSibling;

  const newList = products.filter(prod => {
    if(prod.id === id) prod.added_to_cart = true;

    return prod
  })

  localStorage.setItem('productsList', JSON.stringify(newList))
  addToCartBtn.style.display = 'none'
  removeFromCart.style.display = 'inline-block'

  cart.querySelectorAll('.product').forEach((prod) => {
    prod.remove();
  })

  const cartProductsList = cartProducts(JSON.parse(localStorage.getItem('productsList')))
  indicator.textContent = cartProductsList.length
  generateCartProducts(cartProductsList);
}