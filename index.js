document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const table = document
        .getElementById("dataTable")
        .getElementsByTagName("tbody")[0];

    // Function to add a new row to the table
    function addRowToTable(data) {
        const newRow = table.insertRow();
        newRow.insertCell().textContent = data.name;
        newRow.insertCell().textContent = data.email;
        newRow.insertCell().textContent = data.password;
        newRow.insertCell().textContent = data.dob;
        newRow.insertCell().textContent = data.termsAccepted ? "Yes" : "No";
    }

    // Load saved data from localStorage and populate the table
    function loadTableData() {
        let savedData;
        try {
            savedData = JSON.parse(localStorage.getItem("formData"));
        } catch (e) {
            console.error("Error parsing saved data from localStorage:", e);
            savedData = [];
        }

        // Check if savedData is an array
        if (!Array.isArray(savedData)) {
            console.error("Saved data is not an array:", savedData);
            savedData = [];
        }

        savedData.forEach((entry) => addRowToTable(entry));
    }

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const dobInput = document.getElementById("dob");
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (
            age < 18 ||
            age > 55 ||
            (age === 55 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))
        ) {
            alert("You must be between age 18 and 55.");
            return;
        }

        // Collect form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const termsAccepted = document.getElementById("terms").checked;

        const data = {
            name,
            email,
            password,
            dob: dobInput.value,
            termsAccepted,
        };

        // Retrieve existing data from localStorage, or initialize an empty array
        let savedData;
        try {
            savedData = JSON.parse(localStorage.getItem("formData"));
        } catch (e) {
            console.error("Error parsing saved data from localStorage:", e);
            savedData = [];
        }

        // Check if savedData is an array
        if (!Array.isArray(savedData)) {
            console.error("Saved data is not an array:", savedData);
            savedData = [];
        }

        savedData.push(data);
        localStorage.setItem("formData", JSON.stringify(savedData));

        // Add the new data to the table
        addRowToTable(data);
    });

    // Load data when the page loads
    loadTableData();
});
