const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const searchInput = $("#searchInput");
const searchBtn = $("#searchBtn");
const addBtn = $("#addProductBtn");
const formPanel = $("#formPanel");
const form = $("#addProductForm");
const cancelBtn = $("#cancelBtn");
const productList = $("#product-list");
const errorMsg = $("#errorMsg");

function applySearch(){
  const q = (searchInput?.value || "").toLowerCase();
  $$(".product-item").forEach(card => {
    const name = $(".product-name", card).textContent.toLowerCase();
    card.style.display = name.includes(q) ? "" : "none";
  });
}
searchBtn?.addEventListener("click", applySearch);
searchInput?.addEventListener("keyup", e => { if (e.key === "Enter") applySearch(); });

addBtn?.addEventListener("click", () => {
  formPanel.classList.toggle("open");
  formPanel.setAttribute("aria-hidden", formPanel.classList.contains("open") ? "false" : "true");
});
cancelBtn?.addEventListener("click", () => {
  formPanel.classList.remove("open");
  formPanel.setAttribute("aria-hidden", "true");
});

// Submit with validation
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#newName").value.trim();
  const priceStr = $("#newPrice").value.trim();
  const desc = $("#newDesc").value.trim();

  const priceNum = Number(priceStr);
  if (!name || !priceStr || !(priceNum > 0)) {
    if (errorMsg) errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ (giá > 0).";
    return;
  }
  if (errorMsg) errorMsg.textContent = "";

  const item = document.createElement("article");
  item.className = "product-item";
  item.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <p class="product-desc">${desc}</p>
    <p class="product-price">Giá: ${priceNum.toLocaleString("vi-VN")}₫</p>
  `;

  productList.prepend(item);    // chèn đầu danh sách
  form.reset();                 // xóa nội dung form
  formPanel.classList.remove("open"); // ẩn form
  formPanel.setAttribute("aria-hidden", "true");
  applySearch();                // đảm bảo search vẫn áp dụng cho item mới
});
