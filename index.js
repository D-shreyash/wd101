document.getElementById("registrationForm").addEventListener("submit", (e) => {
  console.log("hello");
  e.preventDefault();

  // Collect form data
  let dobInput = document.getElementById("dob").value;
  let dobValue = dobInput;
  dobInput = dobInput.split("-");
  let dobY = parseInt(dobInput[0]);
  let dobM = parseInt(dobInput[1]);
  let dobD = parseInt(dobInput[2]);

  let todayDay = new Date();
  todayDay = todayDay.toISOString().split("T")[0];
  todayDay = todayDay.split("-");
  let todayY = parseInt(todayDay[0]);
  let todayM = parseInt(todayDay[1]);
  let todayD = parseInt(todayDay[2]);

  let age = todayY - dobY;
  let monthDiff = todayM - dobM;
  let dayDiff = todayD - dobD;

  console.log(age);
  if (
    age < 18 ||
    age > 55 ||
    (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))
  ) {
    alert("You must be between age 18 and 55.");
    return;
  }

  const email = document.getElementById("email").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const termsAccepted = document.getElementById("terms").checked;

  const data = {
    name,
    email,
    password,
    dob: dobValue,
    termsAccepted,
  };

  let savedData = localStorage.getItem("formData");

  let dataArray = savedData ? JSON.parse(savedData) : [];

  // Add new data to the array
  dataArray.push(data);

  // Store the updated data array back to localStorage
  localStorage.setItem("formData", JSON.stringify(dataArray));

  console.log("Data saved:", dataArray);

  renderTable();
});

function renderTable() {
  let savedData = localStorage.getItem("formData");
  let dataArray = savedData ? JSON.parse(savedData) : [];
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = ""; // Clear existing table rows

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

window.onload = renderTable;
