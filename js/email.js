function sendEmail() {
  // Obtener los valores de los campos del formulario
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    companyName: document.getElementById("companyName").value,
    area: document.getElementById("area").value,
    phone: document.getElementById("phone").value,
    options: document.getElementById("service").value,
    message: document.getElementById("message").value,
  };

  const alertDiv = document.getElementById("alert");
  const alertMessage = document.getElementById("alert-message");

  // Validar que no existan datos vacios antes de enviar el ema
  if (Object.values(data).some((value) => value === "")) {
    alertMessage.textContent = "There are empty fields on the form.";
    alertDiv.className =
      "border border-red-600 rounded-lg text-center text-red-600 font-bold bg-slate-100 p-2 mb-6 block";
    return;
  }
  
  emailjs.send("service_j15jvic", "template_y2wk37u", data).then(() => {
    alertMessage.textContent = "Email sent!";
    alertDiv.className =
      "border border-green-600 rounded-lg text-center text-green-600 font-bold bg-slate-100 p-2 mb-6 block";
  });
}
