// Login
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "teacher" && pass === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}

// Mark Attendance
function markAttendance(status) {
    let name = document.getElementById("studentName").value;

    if (name === "") {
        alert("Enter student name");
        return;
    }

    let data = JSON.parse(localStorage.getItem("attendance")) || {};

    if (!data[name]) {
        data[name] = { present: 0, total: 0 };
    }

    if (status === "Present") {
        data[name].present++;
    }

    data[name].total++;

    localStorage.setItem("attendance", JSON.stringify(data));

    alert("Attendance Marked!");
    showRecords();
}

// Show Records
function showRecords() {
    let data = JSON.parse(localStorage.getItem("attendance")) || {};
    let list = document.getElementById("records");

    if (!list) return;

    list.innerHTML = "";

    for (let name in data) {
        let li = document.createElement("li");
        li.innerText = name + " - " + data[name].present + "/" + data[name].total;
        list.appendChild(li);
    }
}

window.onload = showRecords;

// Student Check
function checkAttendance() {
    let name = document.getElementById("studentSearch").value;
    let data = JSON.parse(localStorage.getItem("attendance")) || {};

    if (!data[name]) {
        document.getElementById("result").innerText = "No record found";
        return;
    }

    let percent = (data[name].present / data[name].total) * 100;

    document.getElementById("result").innerText =
        "Attendance: " + percent.toFixed(2) + "%";
}