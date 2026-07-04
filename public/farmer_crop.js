document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("farmerCropForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = {
            full_name: document.querySelector("input[name='full_name']").value,
            mobile: document.querySelector("input[name='mobile']").value,
            email: document.querySelector("input[name='email']").value,
            area: document.querySelector("input[name='area']").value,
            soil_type: document.querySelector("select[name='soil_type']").value,
            irrigation: document.querySelector("select[name='irrigation']").value,
            season: document.querySelector("select[name='season']").value
        };

        console.log("Sending:", formData);

        fetch("http://localhost:3000/getCrop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("cropResult").innerText =
               ` Recommended Crop : ${data.crop_name}`;

        })
        .catch(err => console.log(err));
    });

});