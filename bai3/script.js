const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

// Lấy phần tử
const searchInput = $("#searchInput");
const searchBtn = $("#searchBtn");
const addBtn = $("#addProductBtn");
const formPanel = $("#formPanel");
const form = $("#addProductForm");
const cancelBtn = $("#cancelBtn");
const productList = $("#product-list");
const errorMsg = $("#errorMsg");

// Tìm kiếm theo tên
function applySearch(){
  const q = (searchInput?.value || "").toLowerCase();
  $$(".product-item").forEach(card => {
    const name = $(".product-name", card).textContent.toLowerCase();
    card.style.display = name.includes(q) ? "" : "none";
  });
}
searchBtn?.addEventListener("click", applySearch);
searchInput?.addEventListener("keyup", e => { if (e.key === "Enter") applySearch(); });

// Ẩn/hiện form
addBtn?.addEventListener("click", () => {
  formPanel.classList.toggle("open");
  formPanel.setAttribute("aria-hidden", formPanel.classList.contains("open") ? "false" : "true");
});
cancelBtn?.addEventListener("click", () => {
  formPanel.classList.remove("open");
  formPanel.setAttribute("aria-hidden", "true");
});

// Thêm sản phẩm
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#newName").value.trim();
  const priceVal = $("#newPrice").value.trim();
  const desc = $("#newDesc").value.trim();

  if (!name || !priceVal) {
    if (errorMsg) errorMsg.textContent = "Nhập tên và giá.";
    return;
  }
  if (errorMsg) errorMsg.textContent = "";

  const art = document.createElement("article");
  art.className = "product-item";
  art.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <p class="product-desc">${desc}</p>
    <p class="product-price">Giá: ${Number(priceVal).toLocaleString("vi-VN")}₫</p>
  `;

  productList.prepend(art);     // thêm lên đầu
  form.reset();                 // reset form
  formPanel.classList.remove("open"); // ẩn form
  formPanel.setAttribute("aria-hidden", "true");
  applySearch();                // giữ filter hiện tại
});
