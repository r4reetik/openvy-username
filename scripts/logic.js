document.getElementById("inputUserName").addEventListener("input", () => {
    document.getElementById("displayResult").innerText = "";
    document.getElementById("inputUserName").value = document.getElementById("inputUserName").value.replace(/[^a-z0-9_]/gi, "");
});

document.getElementById("inputUserName").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.getElementById("buttonCheck").click();
    }
});

document.getElementById("buttonCheck").addEventListener("click", () => {
    document.getElementById("loader").removeAttribute("hidden");
    document.getElementById("overlay").removeAttribute("hidden");
    const urlAPI = "https://openvy.com/api/alpha-waitlist/checkusername";
    fetch(urlAPI + "?userName=" + document.getElementById("inputUserName").value)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.isUserNameAvailable) {
                available();
            } else {
                notAvailable();
            }
            document.getElementById("loader").setAttribute("hidden", true);
            document.getElementById("overlay").setAttribute("hidden", true);
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
    window.scrollTo(0, document.body.scrollHeight);
};

const notAvailable = () => {
    document.getElementById("displayResult").innerText = "Not Available";
    document.getElementById("displayResult").classList.remove("text-success");
    document.getElementById("displayResult").classList.add("text-danger");
    document.getElementById("displayAppeal").setAttribute("hidden", true);
    window.scrollTo(0, document.body.scrollHeight);
};
