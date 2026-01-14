
// Tabs functionality for Categories & Services
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
});

const searchInput = document.querySelector("#heroModel");
const suggestionBox = document.querySelector("#searchSuggestions");
const availableSuggestions = [
  "لوحة عباد الشمس",
  "الصرخة",
  "الموناليزا",
  "بين القصرين",
  "البؤساء",
  "التصوير الفوتوغرافي المعماري",
  "سوناتا ضوء القمر",
];

if (searchInput && suggestionBox) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      suggestionBox.textContent = "";
      return;
    }
    const matches = availableSuggestions.filter((item) =>
      item.toLowerCase().includes(query)
    );
    suggestionBox.innerHTML = matches.length
      ? matches.map((item) => `• ${item}`).join("<br>")
      : "لا توجد اقتراحات تتطابق مع بحثك.";
  });
}

const searchResultsContainer = document.querySelector("#searchResults");
const heroSearchForm = document.querySelector("#heroSearchForm");
const inventory = [
  {
    name: "لوحة عباد الشمس",
    type: "لوحة",
    brand: "فان جوخ",
    model: "عباد الشمس",
    price: 1500000,
    category: "انطباعية",
    year: 1888,
  },
  {
    name: "الموناليزا",
    type: "لوحة",
    brand: "ليوناردو دا فنشي",
    model: "الموناليزا",
    price: 2000000,
    category: "عصر النهضة",
    year: 1503,
  },
  {
    name: "بين القصرين",
    type: "كتاب",
    brand: "نجيب محفوظ",
    model: "بين القصرين",
    price: 50,
    category: "رواية",
    year: 1956,
  },
  {
    name: "الصرخة",
    type: "لوحة",
    brand: "إدفارد مونك",
    model: "الصرخة",
    price: 1200000,
    category: "تعبيرية",
    year: 1893,
  },
];

const renderSearchResults = (items) => {
  if (!searchResultsContainer) return;
  if (!items.length) {
    searchResultsContainer.innerHTML =
      '<p>لم نعثر على أعمال تطابق معايير البحث، حاول تعديل الفلاتر.</p>';
    return;
  }
  searchResultsContainer.innerHTML = items
    .map(
      (car) => `
        <div class="result-card">
          <strong>${car.name}</strong>
          <span>النوع: ${car.type} · الفنان/المؤلف: ${car.brand} · العنوان: ${car.model}</span>
          <span>التصنيف: ${car.category ?? "-"} · السنة: ${car.year ?? "-"}</span>
        </div>
      `
    )
    .join("");
};

if (heroSearchForm) {
  heroSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const [typeSelect, brandSelect] = heroSearchForm.querySelectorAll("select");
    const modelInput = heroSearchForm.querySelector("#heroModel");
    const priceRange = heroSearchForm.querySelector('input[type="range"]');
    const queryModel = modelInput ? modelInput.value.trim().toLowerCase() : "";
    const maxPrice = priceRange ? Number(priceRange.value) : Infinity;

    const filtered = inventory.filter((car) => {
      const matchesType =
        !typeSelect.value || car.type === typeSelect.value;
      const matchesBrand =
        !brandSelect.value || car.brand === brandSelect.value;
      const matchesModel = queryModel
        ? car.model.toLowerCase().includes(queryModel) ||
          car.name.toLowerCase().includes(queryModel)
        : true;
      const matchesPrice = car.price <= maxPrice;
      return matchesType && matchesBrand && matchesModel && matchesPrice;
    });

    renderSearchResults(filtered);
  });
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = contactForm.querySelector(".form-feedback");
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      feedback.textContent = "يرجى ملء الحقول المطلوبة بشكل صحيح.";
      feedback.style.color = "var(--accent)";
      return;
    }
    feedback.textContent = "تم استلام رسالتك، سنعود إليك خلال 24 ساعة.";
    feedback.style.color = "var(--success)";
    contactForm.reset();
  });
}

const registrationForm = document.querySelector("#registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = registrationForm.querySelector(".form-feedback");
    if (!registrationForm.checkValidity()) {
      registrationForm.reportValidity();
      feedback.textContent = "يرجى ملء الحقول المطلوبة بشكل صحيح (الهاتف: 8-12 أرقام مسموح بفواصل ومسافة و+).";
      feedback.style.color = "var(--accent)";
      return;
    }
    const password = registrationForm.querySelector('input[name="password"]').value;
    const confirmPassword = registrationForm.querySelector(
      'input[name="confirmPassword"]'
    ).value;
    if (password !== confirmPassword) {
      feedback.textContent = "كلمة المرور وتأكيدها غير متطابقين.";
      feedback.style.color = "var(--accent)";
      return;
    }
    feedback.textContent =
      "تم إنشاء الحساب، ستصلك تحديثات عبر البريد الإلكتروني.";
    feedback.style.color = "var(--success)";
    registrationForm.reset();
  });
}

// Login form validation
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const feedback = loginForm.querySelector(".form-feedback");
    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      feedback.textContent = "يرجى إدخال بريد إلكتروني صالح وكلمة مرور من 6 أحرف على الأقل.";
      feedback.style.color = "var(--accent)";
      return;
    }
    feedback.textContent = "تم تسجيل الدخول بنجاح. مرحباً بك!";
    feedback.style.color = "var(--success)";
    // Optional redirect after successful login (mock)
    // setTimeout(() => { window.location.href = "index.html"; }, 1200);
    loginForm.reset();
  });
}

const thumbnails = Array.from(
  document.querySelectorAll(".thumbnail-grid img")
);
const mainImage = document.querySelector("#currentGalleryImage");
const prevBtn = document.querySelector("#prevThumbnail");
const nextBtn = document.querySelector("#nextThumbnail");
const galleryMessage = document.querySelector("#gallery360Message");

if (thumbnails.length && mainImage) {
  let currentIndex = 0;

  const setActive = (index) => {
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    const selected = thumbnails[index];
    if (selected) {
      selected.classList.add("active");
      mainImage.src = selected.src.replace(/w=500/, "w=1200");
      currentIndex = index;
    }
  };

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      setActive(Number(thumb.dataset.index));
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const nextIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      setActive(nextIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % thumbnails.length;
      setActive(nextIndex);
    });
  }
}

const toggle360 = document.querySelector("#toggle360");
if (toggle360 && galleryMessage) {
  toggle360.addEventListener("click", () => {
    const isActive = galleryMessage.dataset.active === "true";
    galleryMessage.textContent = isActive
      ? 'انقر على "عرض 360°" لجولة تفاعلية حول العمل الفني.'
      : "جولة 360° تعمل الآن (وهمي) - عرض تفاعلي للعمل.";
    galleryMessage.dataset.active = (!isActive).toString();
  });
}
