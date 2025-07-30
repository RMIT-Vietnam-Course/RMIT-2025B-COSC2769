
document.addEventListener("DOMContentLoaded", () => {
    // Get references to form and input elements.
    const contactForm = document.getElementById("contactForm");
    const message = document.getElementById("message");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const descriptionField = document.getElementById("description");

    // Handle form submission.
    contactForm.onsubmit = function (event) {
        event.preventDefault(); // Prevent default form submission.
        message.innerText = "";

        // Get trimmed values from inputs.
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const description = descriptionField.value.trim();
        const purposeInput = document.querySelector('input[name="purpose"]:checked');

        // Validate form fields.
        const errors = validateForm(name, email, purposeInput, description);
        setMessage(message, errors);

        // If no errors, add entry to table and show success message.
        if (errors.length === 0) {
            const entry = {
                name,
                email,
                purpose: capitalizeFirst(purposeInput.value),
                description
            };

            addToTable(entry);
            contactForm.reset();
            setMessage(message, ["Contact submitted successfully!"], true);
        }
    };
});

// Display messages (errors as bullets, success as plain text).
function setMessage(element, messages, isSuccess = false) {
    if (!isSuccess && messages.length > 0) {
        element.innerHTML = messages.map(msg => `&bull; ${msg}`).join("<br>");
    } else {
        element.innerText = messages.join("\n");
    }

    element.classList.toggle("message-success", isSuccess);
    element.classList.toggle("message-error", !isSuccess);
}

// Capitalize the first letter of a string.
function capitalizeFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function validateForm(name, email, purpose, description) {
    const errors = [];

    // Name: 03-10 letters, no spaces or symbols.
    if (!/^[A-Za-z]{3,10}$/.test(name)) {
        errors.push("Name must be 03–10 letters only, no spaces or symbols.");
    }

    // Email: Allow dot in local part, multi-part TLDs.
    if (!/^[a-z](\.?[a-z0-9]){1,63}@[a-z0-9]{2,50}(\.[a-z]{2,10}){1,3}$/.test(email)) {
        errors.push("Email format invalid.");
    }

    // Purpose: Must be selected.
    if (!purpose) {
        errors.push("Please select contact purpose.");
    }

    // Description: Cannot be empty.
    if (description === "") {
        errors.push("Description cannot be empty.");
    }

    return errors;
}

// Add a new contact entry to the submitted contacts table.
function addToTable(entry) {
    const table = document.getElementById("dataTable");
    const row = table.insertRow();

    row.insertCell(0).innerText = entry.name;
    row.insertCell(1).innerText = entry.email;
    row.insertCell(2).innerText = entry.purpose;
    row.insertCell(3).innerText = entry.description;
}
