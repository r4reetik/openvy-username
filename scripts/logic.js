document.getElementById("inputUserName").addEventListener("input", () => {
    document.getElementById("displayResult").innerText = "";
    document.getElementById("inputUserName").value = document
        .getElementById("inputUserName")
        .value.replace(/[^a-z0-9_]/gi, "");
});

document.getElementById("inputUserName").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.getElementById("buttonCheck").click();
    }
});

document.getElementById("buttonCheck").addEventListener("click", () => {
    const urlAPI = "https://www.openvy.com/api/coming/usernamecheck";
    fetch(urlAPI, {
        method: "POST",
        body: JSON.stringify({
            username: document.getElementById("inputUserName").value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.message === "Available") {
                available();
            } else {
                notAvailable();
            }
        })
        .catch(function (err) {
            console.warn("Something went wrong.", err);
        });
});

const available = () => {
    document.getElementById("displayResult").innerText = "Available";
    document.getElementById("displayResult").classList.remove("text-danger");
    document.getElementById("displayResult").classList.add("text-success");
    document.getElementById("displayAppeal").removeAttribute("hidden");
};

const notAvailable = () => {
    document.getElementById("displayResult").innerText = "Not Available";
    document.getElementById("displayResult").classList.remove("text-success");
    document.getElementById("displayResult").classList.add("text-danger");
    document.getElementById("displayAppeal").setAttribute("hidden", true);
};
