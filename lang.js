i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: 'locales/{{lng}}.json'
    }
  }, function(err, t) {
    updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = i18next.t(key);
  });

  document.body.dir = i18next.language === 'ar' ? 'rtl' : 'ltr';
}

// فتح القائمة
document.getElementById("langBtn").addEventListener("click", () => {
  document.getElementById("langMenu").style.display =
    document.getElementById("langMenu").style.display === "block"
      ? "none"
      : "block";
      console.log("here")
});

// تغيير اللغة بالضغط على أي اختيار
document.querySelectorAll(".lang-option").forEach(option => {
  option.addEventListener("click", (e) => {
    const lang = e.target.getAttribute("data-lang");
    i18next.changeLanguage(lang, updateContent);
    document.getElementById("langMenu").style.display = "none";
  });
});


