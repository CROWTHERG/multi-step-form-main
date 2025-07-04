const formSteps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const sidebarSteps = document.querySelectorAll(".step");
const plans = document.querySelectorAll(".plan");
let currentStep = 0;

function updateStep() {
  formSteps.forEach((step, i) => {
    step.classList.toggle("active", i === currentStep);
    sidebarSteps[i].classList.toggle("active", i === currentStep);
  });
  backBtn.classList.toggle("hidden", currentStep === 0);
  nextBtn.textContent =
    currentStep === formSteps.length - 1 ? "Confirm" : "Next Step";
}

nextBtn.addEventListener("click", () => {
  if (!validateStep()) return; // 🛑 Block if validation fails

  if (currentStep === formSteps.length - 1) {
    showConfirmation();
    return;
  }
  currentStep++;
  if (currentStep === formSteps.length - 1) showSummary();
  updateStep();
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) currentStep--;
  updateStep();
});

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((p) => p.classList.remove("active"));
    plan.classList.add("active");
  });
});

function validateStep() {
  let valid = true;

  // ✅ Validation only for Step 1 (Personal Info)
  if (currentStep === 0) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    clearErrors();

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required.");
      valid = false;
    }
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required.");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      showError(emailInput, "Enter a valid email address.");
      valid = false;
    }
    if (phoneInput.value.trim() === "") {
      showError(phoneInput, "Phone number is required.");
      valid = false;
    }
  }

  return valid;
}

function showError(input, message) {
  let error = document.createElement("small");
  error.classList.add("error");
  error.innerText = message;
  input.parentElement.appendChild(error);
  input.classList.add("invalid");
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((e) => e.remove());
  document.querySelectorAll(".invalid").forEach((i) =>
    i.classList.remove("invalid")
  );
}

function showSummary() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const selectedPlan = document.querySelector(".plan.active h2").textContent;
  const addons = [
    ...document.querySelectorAll(".addons input:checked"),
  ].map((a) => a.value);

  const summaryBox = document.getElementById("summary");
  summaryBox.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Plan:</strong> ${selectedPlan}</p>
    <p><strong>Add-Ons:</strong> ${addons.join(", ") || "None"}</p>
  `;
}

function showConfirmation() {
  document.querySelector(".form-container").innerHTML = `
    <div class="confirmation">
      <div class="checkmark">✅</div>
      <h1>Thank You!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun 
        using our platform. If you ever need support, feel free to email us.
      </p>
    </div>
  `;
}
