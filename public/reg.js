
document.addEventListener("DOMContentLoaded", function () {

     console.log("JS Loaded");

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    console.log("Form submitted"); 

    const formData = {
        full_name: document.querySelector("input[name='full_name']").value,
        mobile: document.querySelector("input[name='mobile']").value,
        email: document.querySelector("input[name='email']").value,
        password: document.querySelector("input[name='password']").value
    };

    console.log("Data:", formData);

     // Name validation
        if (!/^[A-Za-z ]+$/.test(formData.full_name)) {
            alert("Name should contain only letters");
            return;
        }

        // Mobile validation (10 digits only)
        if (!/^\d{10}$/.test(formData.mobile)) {
            alert("Mobile number must be exactly 10 digits");
            return;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert("Enter a valid email address");
            return;
        }

        // Password validation (min 6 chars)
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        document.getElementById("registerForm").reset();
        //form.reset();
    })
    .catch(err => console.log(err));

    
});

});
