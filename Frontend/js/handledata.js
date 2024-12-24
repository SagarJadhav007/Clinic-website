const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value,
    appointmentDate: document.getElementById("appointmentDate").value,
    problemDescription: document.getElementById("problemDescription").value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Appointment booked successfully!");
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send the data.");
  }
});
