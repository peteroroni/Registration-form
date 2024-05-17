document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"),
          nextBtn = form.querySelector(".nextBtn"),
          backBtn = form.querySelector(".backBtn"),
          firstInputs = form.querySelectorAll(".form.first input, .form.first select"),
          submitBtn = form.querySelector(".submit");

    nextBtn.addEventListener("click", () => {
        let allFilled = true;
        firstInputs.forEach(input => {
            if (input.value === "") {
                allFilled = false;
            }
        });

        if (allFilled) {
            form.classList.add('secActive');
        } else {
            alert("Please fill in all fields.");
        }
    });

    backBtn.addEventListener("click", () => form.classList.remove('secActive'));

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
