

// Load Data
let currentId = null;

     function loadData() {
    fetch("http://localhost:3000/getAllFarmers")
    .then(res => res.json())
    .then(data => {

        let rows = "";
        let rabi = 0;
        let kharif = 0;

        data.forEach(f => {

            if (f.season && f.season.toLowerCase() === "rabi") rabi++;
            if (f.season && f.season.toLowerCase() === "kharif") kharif++;

            rows += `
                <tr>
                    <td>${f.full_name}</td>
                    <td>${f.area} acres</td>
                    <td>${f.soil_type}</td>
                    <td>${f.season}</td>
                    <td>${f.crop_name ? f.crop_name : "Not Assigned"}</td>
                    <td>
                        <button class="edit-btn" onclick="editData(${f.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteData(${f.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("tableBody").innerHTML = rows;

        // Update dashboard cards
        document.getElementById("totalFarmers").innerText = data.length;
        document.getElementById("rabiCount").innerText = rabi;
        document.getElementById("kharifCount").innerText = kharif;
    })
    .catch(err => {
        console.error("Error fetching data:", err);
    });
}   
// Delete
function deleteData(id) {
    if (confirm("Are you sure you want to delete this record?")) {

        // First get farmer name
        fetch("http://localhost:3000/getAllFarmers")
        .then(res => res.json())
        .then(data => {

            const farmer = data.find(f => f.id === id);
            const name = farmer ? farmer.full_name : "Farmer";

            // Now delete
            fetch(`http://localhost:3000/deleteFarmer/${id}`, {
                method: "DELETE"
            })
            .then(res => res.text())
            .then(() => {

                // Show custom popup
                document.getElementById("deleteName").innerText = name;
                document.getElementById("deletePopup").style.display = "flex";

                loadData(); // refresh table
            });

        });
    }
}


function editData(id) {
    currentId = id;

    fetch("http://localhost:3000/getAllFarmers")
    .then(res => res.json())
    .then(data => {

        const farmer = data.find(f => f.id === id);

        document.getElementById("editName").value = farmer.full_name;
        document.getElementById("editArea").value = farmer.area;
        document.getElementById("editSoil").value = farmer.soil_type;
        document.getElementById("editSeason").value = farmer.season;

        document.getElementById("editModal").style.display = "block";
    });
}

function updateFarmer() {

    const updatedData = {
        full_name: document.getElementById("editName").value,
        mobile: "9999999999",
        email: "test@test.com",
        area: document.getElementById("editArea").value,
        soil_type: document.getElementById("editSoil").value,
        irrigation: "yes",
        season: document.getElementById("editSeason").value
    };

    fetch(`http://localhost:3000/updateFarmer/${currentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        closeModal();
        loadData();
    })
    .catch(err => {
        console.error("Update error:", err);
    });
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}
