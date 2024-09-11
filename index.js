document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dobInput = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("terms").checked;

  // Date validation
  let dobValue = dobInput;
  let dob = new Date(dobInput);
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  let monthDiff = today.getMonth() - dob.getMonth();
  let dayDiff = today.getDate() - dob.getDate();

  if (
    age < 18 ||
    age > 55 ||
    (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))
  ) {
    alert("You must be between age 18 and 55.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Create data object
  const data = {
    name,
    email,
    password,
    dob: dobValue,
    termsAccepted,
  };

  // Retrieve existing data from localStorage
  let savedData = localStorage.getItem("formData");
  let dataArray = savedData ? JSON.parse(savedData) : [];

  // Add new data to the array
  dataArray.push(data);

  // Store the updated data array back to localStorage
  localStorage.setItem("formData", JSON.stringify(dataArray));

  // Update the table with the new data
  renderTable();
});

function renderTable() {
  // Retrieve data from localStorage
  let savedData = localStorage.getItem("formData");
  let dataArray = savedData ? JSON.parse(savedData) : [];
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = ""; // Clear existing table rows

  // Populate the table with data
  dataArray.forEach((entry) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = entry.name;
    row.appendChild(nameCell);

    let emailCell = document.createElement("td");
    emailCell.textContent = entry.email;
    row.appendChild(emailCell);

    let passwordCell = document.createElement("td");
    passwordCell.textContent = entry.password;
    row.appendChild(passwordCell);

    let dobCell = document.createElement("td");
    dobCell.textContent = entry.dob;
    row.appendChild(dobCell);

    let termsCell = document.createElement("td");
    termsCell.textContent = entry.termsAccepted ? "Yes" : "No";
    row.appendChild(termsCell);

    tableBody.appendChild(row);
  });
}

// Initial render of the table when the page loads
window.onload = renderTable;
