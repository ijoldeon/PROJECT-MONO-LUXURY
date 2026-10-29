"use strict"; //실수하기 쉬운코드 를 엄격 하게 검사 하기위해 쓰는 코드

/* =====================================
   1. 상품 데이터
===================================== */

const products = [
  {
    id: 1,
    name: "MONO Embossed Gold Dial Watch",
    category: "시계",
    price: 1850000,
    image: "./images/watch.png",
    description:
      "18K 골드 MONO 로고와 프리미엄 가죽 스트랩이 결합된 드레스 워치입니다.",
  },
  {
    id: 2,
    name: "MONO Signature Cotton T-Shirt",
    category: "상의",
    price: 129000,
    image: "./images/t-shirt2.png",
    description: "정교한 MONO 로고가 돋보이는 프리미엄 코튼 티셔츠입니다.",
    hasDesignOptions: true,
    designs: [
      {
        name: "미니멀 체스트 로고",
        image: "./images/t-shirt2.png",
      },
      {
        name: "모노그램 프린트",
        image: "./images/t-shirt.png",
      },
    ],
  },
  {
    id: 4,
    name: "MONO Logo Pin Leather Jacket",
    category: "아우터",
    price: 1290000,
    image: "./images/jacket.png",
    description: "골드 MONO 로고 핀이 돋보이는 프리미엄 레더 재킷입니다.",
  },
  {
    id: 5,
    name: "MONO Classic Wool Coat",
    category: "아우터",
    price: 890000,
    image: "./images/outter.png",
    description: "모던한 실루엣의 럭셔리 울 코트입니다.",
  },
  {
    id: 6,
    name: "MONO Gold Monogram Leather Wallet",
    category: "잡화",
    price: 380000,
    image: "./images/wallet.png",
    description: "고급 가죽과 MONO 로고로 완성한 카드 지갑입니다.",
  },
  {
    id: 7,
    name: "MONO Tailored Slacks",
    category: "하의",
    price: 189000,
    image: "./images/slacks.png",
    description: "깔끔한 실루엣의 프리미엄 슬랙스입니다.",
  },

  {
    id: 8,
    name: "MONO Signature Leather Shoes",
    category: "신발",
    price: 259000,
    image: "./images/shoe.png",
    description: "고급스러운 마감이 돋보이는 MONO 시그니처 가죽 신발입니다.",
    hasDesignOptions: true,
    designs: [
      {
        name: "모노 오리지널 신발",
        image: "./images/shoe.png",
      },
      {
        name: "모노 로퍼",
        image: "./images/ropper.png",
      },
    ],
  },

  {
    id: 9,
    name: "MONO Premium Tailored Suit",
    category: "양복",
    price: 890000,
    image: "./images/suit.png",
    description:
      "세련된 실루엣과 고급스러운 원단으로 완성한 MONO 프리미엄 양복입니다.",
  },
];

/* =====================================
   2. 카테고리 배너 데이터
===================================== */

const categoryBanners = {
  시계: {
    image: "./images/watch.png",
    title: "WATCH COLLECTION",
  },
  아우터: {
    image: "./images/jacket.png",
    title: "OUTER COLLECTION",
  },
  상의: {
    image: "./images/t-shirt2.png",
    title: "TOP COLLECTION",
  },
  하의: {
    image: "./images/slacks.png",
    title: "BOTTOM COLLECTION",
  },
  신발: {
    image: "./images/shoe.png",
    title: "SHOES COLLECTION",
  },
  잡화: {
    image: "./images/wallet.png",
    title: "ACCESSORIES COLLECTION",
  },
};

/* =====================================
   3. 공통 기능
===================================== */

function formatPrice(price) {
  return Number(price).toLocaleString("ko-KR") + "원";
}

function getProduct(id) {
  return products.find((p) => p.id === Number(id));
}

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("monoCart") || "[]");

    if (!Array.isArray(cart)) return [];

    return cart.filter(
      (item) =>
        getProduct(item.id) &&
        typeof item.size === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 10,
    );
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("monoCart", JSON.stringify(cart));
  updateCartCount();
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal(cart) {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + product.price * item.quantity;
  }, 0);
}

function updateCartCount() {
  const count = document.getElementById("cart-count");

  if (count) {
    count.textContent = getCartCount();
  }
}

/* =====================================
   4. 메인 상품 목록 및 배너
===================================== */

function setupProductList() {
  const productList = document.getElementById("product-list");

  if (!productList) return;

  const searchInput = document.getElementById("search-input");
  const emptyMessage = document.getElementById("empty-message");
  const categoryButtons = document.querySelectorAll(".category");

  const categoryBanner = document.getElementById("category-banner");
  const categoryBannerImage = document.getElementById("category-banner-image");
  const categoryBannerTitle = document.getElementById("category-banner-title");

  let selectedCategory = "전체";

  function renderProducts() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filtered = products.filter((product) => {
      const matchCategory =
        selectedCategory === "전체" || product.category === selectedCategory;

      const matchKeyword =
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword);

      return matchCategory && matchKeyword;
    });

    productList.innerHTML = filtered
      .map(
        (product) => `
          <article class="product-card">
            <a
              class="product-image-link"
              href="./2.product.html?id=${product.id}"
            >
              <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
              >
            </a>

            <p class="product-category">${product.category}</p>

            <a
              class="product-name"
              href="./2.product.html?id=${product.id}"
            >
              ${product.name}
            </a>

            <p class="product-price">
              ${formatPrice(product.price)}
            </p>

            <a
              class="button dark"
              href="./2.product.html?id=${product.id}"
            >
              상세보기 및 선택구매
            </a>
          </article>
        `,
      )
      .join("");

    if (emptyMessage) {
      emptyMessage.hidden = filtered.length !== 0;
    }

    // 카테고리 배너 변경
    const banner = categoryBanners[selectedCategory];

    if (banner && categoryBanner) {
      categoryBanner.hidden = false;

      if (categoryBannerImage) {
        categoryBannerImage.src = banner.image;
        categoryBannerImage.alt = banner.title;
      }

      if (categoryBannerTitle) {
        categoryBannerTitle.textContent = banner.title;
      }
    } else if (categoryBanner) {
      categoryBanner.hidden = true;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;

      categoryButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      renderProducts();
    });
  });

  renderProducts();
}

/* =====================================
   5. 상품 상세 페이지
===================================== */

function setupProductDetail() {
  const addButton = document.getElementById("add-to-cart");

  if (!addButton) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || "2";
  const product = getProduct(productId);

  if (!product) {
    document.getElementById("detail-name").textContent =
      "상품을 찾을 수 없습니다.";

    addButton.disabled = true;
    return;
  }

  document.title = product.name + " | MONO";

  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-category").textContent = product.category;

  document.getElementById("detail-price").textContent = formatPrice(
    product.price,
  );

  document.getElementById("detail-description").textContent =
    product.description;

  const imageElement = document.getElementById("detail-image");

  if (imageElement) {
    imageElement.src = product.image;
    imageElement.alt = product.name;
  }

  // 티셔츠 디자인 선택

  // 상품별 사이즈 옵션 설정
  const sizeSelect = document.getElementById("size-select");

  if (sizeSelect) {
    if (product.category === "신발") {
      sizeSelect.innerHTML = `
        <option value="">사이즈 선택</option>
        <option value="240">240</option>
        <option value="245">245</option>
        <option value="250">250</option>
        <option value="255">255</option>
        <option value="260">260</option>
        <option value="265">265</option>
        <option value="270">270</option>
        <option value="275">275</option>
        <option value="280">280</option>
      `;
    } else {
      sizeSelect.innerHTML = `
        <option value="">사이즈 선택</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="FREE">FREE</option>
      `;
    }

    sizeSelect.required = true;
  }

  const sizeLabel = document.querySelector('label[for="size-select"]');

  if (product.hasDesignOptions && product.designs && sizeLabel) {
    const designHtml = `
      <div id="design-option-wrap" style="margin-bottom: 18px;">
        <label for="design-select">DESIGN / STYLE</label>

        <select id="design-select">
          ${product.designs
            .map(
              (design, index) => `
                <option value="${index}">
                  ${design.name}
                </option>
              `,
            )
            .join("")}
        </select>
      </div>
    `;

    sizeLabel.insertAdjacentHTML("beforebegin", designHtml);
  }

  const designSelect = document.getElementById("design-select");

  if (designSelect && product.designs) {
    designSelect.addEventListener("change", () => {
      const design = product.designs[Number(designSelect.value)];

      if (design && imageElement) {
        imageElement.src = design.image;
        imageElement.alt = product.name + " - " + design.name;
      }
    });
  }

  // 장바구니 담기
  addButton.addEventListener("click", () => {
    const sizeSelect = document.getElementById("size-select");
    const quantityInput = document.getElementById("detail-quantity");
    const message = document.getElementById("detail-message");

    const size = sizeSelect ? sizeSelect.value : "";
    const quantity = quantityInput ? Number(quantityInput.value) : 1;

    if (!size) {
      if (message) {
        message.textContent = "사이즈 옵션을 선택해 주세요.";
      }

      alert("사이즈 옵션을 선택해 주세요.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      alert("수량은 1개부터 10개까지 선택할 수 있습니다.");
      return;
    }

    let selectedDesignName = "";

    if (designSelect && product.designs) {
      selectedDesignName = product.designs[Number(designSelect.value)].name;
    }

    const cart = getCart();

    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === size &&
        (item.design || null) === (selectedDesignName || null),
    );

    if (existing) {
      if (existing.quantity + quantity > 10) {
        alert("동일 상품은 최대 10개까지 담을 수 있습니다.");
        return;
      }

      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        size,
        quantity,
        design: selectedDesignName || null,
      });
    }

    saveCart(cart);

    if (message) {
      message.textContent = "장바구니에 담겼습니다.";
    }

    if (confirm("상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
      window.location.href = "./3.cart.html";
    }
  });
}

/* =====================================
   6. 장바구니 페이지
===================================== */

function setupCartPage() {
  const cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  const emptyMessage = document.getElementById("cart-empty");
  const totalElement = document.getElementById("cart-total");
  const clearButton = document.getElementById("clear-cart");

  function renderCart() {
    const cart = getCart();

    if (emptyMessage) {
      emptyMessage.hidden = cart.length !== 0;
    }

    if (clearButton) {
      clearButton.disabled = cart.length === 0;
    }

    cartItems.innerHTML = cart
      .map((item) => {
        const product = getProduct(item.id);
        const designText = item.design ? `스타일: ${item.design} · ` : "";

        return `
          <article class="cart-row">
            <a href="./2.product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}">
            </a>

            <div>
              <a
                class="cart-product-name"
                href="./2.product.html?id=${product.id}"
              >
                ${product.name}
              </a>

              <p class="cart-meta">
                ${designText}옵션: ${item.size} ·
                ${formatPrice(product.price)}
              </p>

              <label>
                수량
                <input
                  class="cart-quantity"
                  type="number"
                  min="1"
                  max="10"
                  value="${item.quantity}"
                  data-id="${product.id}"
                  data-size="${item.size}"
                  data-design="${item.design || ""}"
                >
              </label>

              <br>

              <button
                class="remove-button"
                data-id="${product.id}"
                data-size="${item.size}"
                data-design="${item.design || ""}"
              >
                삭제
              </button>
            </div>

            <div class="cart-price">
              ${formatPrice(product.price * item.quantity)}
            </div>
          </article>
        `;
      })
      .join("");

    if (totalElement) {
      totalElement.textContent = formatPrice(getCartTotal(cart));
    }
  }

  cartItems.addEventListener("change", (event) => {
    if (!event.target.matches(".cart-quantity")) return;

    const quantity = Number(event.target.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      alert("수량은 1개부터 10개까지 입력해 주세요.");
      renderCart();
      return;
    }

    const id = Number(event.target.dataset.id);
    const size = event.target.dataset.size;
    const design = event.target.dataset.design || null;

    const cart = getCart();

    const item = cart.find(
      (entry) =>
        entry.id === id &&
        entry.size === size &&
        (entry.design || null) === design,
    );

    if (item) {
      item.quantity = quantity;
      saveCart(cart);
      renderCart();
    }
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-button");

    if (!button) return;

    const id = Number(button.dataset.id);
    const size = button.dataset.size;
    const design = button.dataset.design || null;

    const cart = getCart().filter(
      (item) =>
        !(
          item.id === id &&
          item.size === size &&
          (item.design || null) === design
        ),
    );

    saveCart(cart);
    renderCart();
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      if (confirm("장바구니를 비울까요?")) {
        saveCart([]);
        renderCart();
      }
    });
  }

  renderCart();
}

/* =====================================
   7. 주문 페이지
===================================== */

function setupCheckoutPage() {
  const form = document.getElementById("checkout-form");

  if (!form) return;

  const cart = getCart();
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  const orderButton = document.getElementById("place-order");

  if (cart.length === 0) {
    if (checkoutItems) {
      checkoutItems.textContent = "장바구니가 비어 있습니다.";
    }

    if (checkoutTotal) {
      checkoutTotal.textContent = "0원";
    }

    if (orderButton) {
      orderButton.disabled = true;
    }

    return;
  }

  if (checkoutItems) {
    checkoutItems.innerHTML = cart
      .map((item) => {
        const product = getProduct(item.id);
        const design = item.design ? ` / ${item.design}` : "";

        return `
          <div class="order-item">
            <span>
              ${product.name}${design}
              (${item.size}) × ${item.quantity}
            </span>

            <span>
              ${formatPrice(product.price * item.quantity)}
            </span>
          </div>
        `;
      })
      .join("");
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(getCartTotal(cart));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentCart = getCart();

    if (currentCart.length === 0) {
      alert("장바구니가 비어 있습니다.");
      window.location.href = "./3.cart.html";
      return;
    }

    const formData = new FormData(form);

    const order = {
      orderNumber: "MONO-" + Date.now(),
      customerName: formData.get("customerName"),
      payment: formData.get("payment"),
      total: getCartTotal(currentCart),
    };

    localStorage.setItem("monoLastOrder", JSON.stringify(order));
    localStorage.removeItem("monoCart");

    window.location.href = "./5.complete.html";
  });
}

/* =====================================
   8. 주문 완료 페이지
===================================== */

function setupCompletePage() {
  const numberElement = document.getElementById("complete-number");

  if (!numberElement) return;

  let order;

  try {
    order = JSON.parse(localStorage.getItem("monoLastOrder") || "null");
  } catch (error) {
    order = null;
  }

  if (!order) {
    numberElement.textContent = "주문 정보가 없습니다.";
    return;
  }

  numberElement.textContent = order.orderNumber;

  const nameElement = document.getElementById("complete-name");
  const paymentElement = document.getElementById("complete-payment");
  const totalElement = document.getElementById("complete-total");

  if (nameElement) {
    nameElement.textContent = order.customerName;
  }

  if (paymentElement) {
    paymentElement.textContent = order.payment;
  }

  if (totalElement) {
    totalElement.textContent = formatPrice(order.total);
  }
}

/* =====================================
   9. 페이지 실행
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupProductList();
  setupProductDetail();
  setupCartPage();
  setupCheckoutPage();
  setupCompletePage();
});
