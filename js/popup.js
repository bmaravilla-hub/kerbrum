function validateField(field) {
  const lang = localStorage.getItem("language") || "es";
  const requiredText =
    lang === "es" ? "Este campo es requerido" : "This field is required";
  const invalidEmailText = lang === "es" ? "Email inválido" : "Invalid email";

  let isValid = true;
  field.classList.remove("placeholder-red-400", "border-red-500");

  const value = field.value.trim();

  if (
    (field.nodeName === "SELECT" && value === "") ||
    (field.nodeName !== "SELECT" && value === "")
  ) {
    field.classList.add("placeholder-red-400", "border-red-500");
    if (field.nodeName !== "SELECT") {
      field.placeholder = requiredText;
    }
    isValid = false;
  } else if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
    field.classList.add("placeholder-red-400", "border-red-500");
    field.placeholder = invalidEmailText;
    isValid = false;
  }
  return isValid;
}

function clearError(field) {
  const lang = localStorage.getItem("language") || "es";
  const originalPlaceholder =
    field.getAttribute(`data-placeholder-${lang}`) || "";

  field.classList.remove("placeholder-red-400", "border-red-500");
  field.placeholder = originalPlaceholder;
}

document.addEventListener("DOMContentLoaded", function () {
  const areaSelect = document.getElementById("area");
  const areaSearchContainer = document.getElementById("area-search-container");

  if (areaSelect && areaSearchContainer && typeof areaCodes !== "undefined") {
    let isSearchActive = false;

    const populateSelect = (filter = "") => {
      areaSelect.innerHTML = "";
      const currentValue = areaSelect.value;

      const filteredCodes = areaCodes.filter(
        (code) =>
          code.name.toLowerCase().includes(filter.toLowerCase()) ||
          code.code.includes(filter)
      );

      filteredCodes.forEach((code) => {
        const option = document.createElement("option");
        option.value = code.code;
        option.textContent = `${code.flag} ${code.code}`;
        areaSelect.appendChild(option);
      });

      const stillExists = filteredCodes.some((c) => c.code === currentValue);
      if (stillExists) {
        areaSelect.value = currentValue;
      }
    };

    const createSearchInput = () => {
      areaSearchContainer.innerHTML = "";
      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "🔎país o código";
      searchInput.className =
        "popup-input w-full rounded-t-lg pl-4 pr-4 py-3 focus:outline-none text-sm bg-gray-800 border-b border-white/20";
      searchInput.style.color = "#FFFFFF";
      searchInput.addEventListener("input", () => {
        populateSelect(searchInput.value);
      });
      searchInput.addEventListener("click", (e) => e.stopPropagation());
      areaSearchContainer.appendChild(searchInput);
      return searchInput;
    };

    // MODIFICADO: Permitir selección normal y búsqueda
    areaSelect.addEventListener("mousedown", (e) => {
      // Si ya está activa la búsqueda, permitir comportamiento normal
      if (isSearchActive) {
        return;
      }

      e.preventDefault();

      areaSearchContainer.classList.remove("hidden", "opacity-0");
      const searchInput = createSearchInput();
      areaSelect.size = Math.min(10, areaCodes.length);
      areaSelect.classList.add("rounded-b-lg");
      areaSelect.classList.remove("rounded-lg");

      setTimeout(() => searchInput.focus(), 0);
      isSearchActive = true;
    });

    // NUEVO: Permitir selección normal con doble click
    areaSelect.addEventListener("dblclick", (e) => {
      // Permitir comportamiento normal del select
      areaSelect.size = 0;
      areaSearchContainer.classList.add("hidden");
      isSearchActive = false;
    });

    const closeDropdown = () => {
      if (!isSearchActive) return;
      areaSelect.size = 0;
      areaSearchContainer.classList.add("hidden", "opacity-0");
      areaSearchContainer.innerHTML = "";
      areaSelect.classList.add("rounded-lg");
      areaSelect.classList.remove("rounded-b-lg");
      isSearchActive = false;
    };

    areaSelect.addEventListener("change", closeDropdown);

    // Cerrar dropdown al hacer click fuera
    document.addEventListener("click", (e) => {
      if (
        !areaSelect.contains(e.target) &&
        !areaSearchContainer.contains(e.target)
      ) {
        closeDropdown();
      }
    });

    const populateFullList = () => {
      const currentValue = areaSelect.value;
      areaSelect.innerHTML = "";
      areaCodes.sort((a, b) => a.name.localeCompare(b.name));
      areaCodes.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.code;
        option.textContent = `${country.flag} ${country.code}`;
        areaSelect.appendChild(option);
      });
      areaSelect.value = currentValue || "+503";
    };
    populateFullList();
  }

  if (!sessionStorage.getItem("popupShown")) {
    setTimeout(function () {
      document.getElementById("welcome-popup").classList.remove("hidden");
    }, 1000);
    sessionStorage.setItem("popupShown", "true");
  }

  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("welcome-popup").classList.add("hidden");
  });

  const form = document.getElementById("popupform");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fields = form.querySelectorAll("input[required], select[required]");
      let isFormValid = true;

      fields.forEach((field) => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        console.log("Formulario inválido, no se enviará.");
        return;
      }

      const button = document.querySelector("#envbutt");
      button.disabled = true;
      button.innerHTML = "Enviando ...";

      const data = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        area: document.getElementById("area").value,
        telefono: document.getElementById("telefono").value,
        cargo: document.getElementById("cargo").value,
      };

      try {
        await emailjs.send("service_zddo34n", "template_g9a9q66", data);
        window.location.href = "gracias.html";
      } catch (error) {
        console.log("FAILED...", error);
        alert(
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo."
        );
        button.disabled = false;
        button.innerHTML = "Agendar mi consulta";
      }
    });
  }
});
