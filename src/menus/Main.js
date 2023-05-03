const elements = {
    title: document.querySelector('.title'),
    ping: document.querySelector('.ping'),
    logoutBtn: document.querySelector('.logoutBtn'),
    alert: document.querySelector('.alert'),
    alertBtns: document.querySelectorAll('.alert > button'),
};

elements.title.innerText = `Logined to ${localStorage.getItem("name")}`;
elements.logoutBtn.addEventListener("click", () => {
    elements.alert.style.display = "block"
});
elements.alertBtns[0].addEventListener("click", () => {
    localStorage.clear();
    window.parent.location.href = "../index.html";
});
elements.alertBtns[1].addEventListener("click", () => {
    elements.alert.style.display = "none"
});

const showPing = () => {
    elements.ping.innerText = `Ping : ${localStorage.getItem("ping")}ms`;
}

setInterval(showPing, 5000);