(() => {
  const form = document.querySelector("[data-contact-form]");
  const thankYou = document.querySelector("[data-thank-you]");
  const resetBtn = document.querySelector("[data-send-another]");
  const errorMsg = document.querySelector("[data-form-error]");
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (!form || !thankYou || !submitBtn) return;

  const submitLabel = submitBtn.textContent;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: a bot that fills every field trips this; humans never see it.
    if (form.elements._honey?.value) return;

    errorMsg?.setAttribute("hidden", "");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("submit failed");

      form.hidden = true;
      thankYou.hidden = false;
    } catch (err) {
      errorMsg?.removeAttribute("hidden");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });

  resetBtn?.addEventListener("click", () => {
    form.reset();
    errorMsg?.setAttribute("hidden", "");
    thankYou.hidden = true;
    form.hidden = false;
  });
})();
