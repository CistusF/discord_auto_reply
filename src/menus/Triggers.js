const items = {
    inputs: document.querySelectorAll("input[type=text]"),
    btn: document.querySelector("input[type=button]"),
    saveBtn: document.querySelector(".save"),
    triggers: document.querySelector(".triggers"),
    alert: document.querySelector('.alert'),
    alertBtns: document.querySelectorAll('.alert > button')
};

items.alertBtns[1].addEventListener("click", () => {
    items.alert.style.display = "none";
});

items.saveBtn.addEventListener("click", () => {
    alert("Still in progress, please try again later.");
});

const createItem = (recive, reply) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = recive;
    div.onclick = function () {
        items.alert.style.display = "block";
        items.alert.children[0].innerText = `Will you delete ${recive} command?`;
        items.alertBtns[0].addEventListener("click", () => {
            this.remove();
            delete db[recive];
            localStorage.setItem("commands", JSON.stringify(db));

            items.alert.style.display = "none";
        });
    };
    items.triggers.appendChild(div);
}

var db = localStorage.getItem('commands');
if (!db) {
    db = {};
} else {
    db = JSON.parse(db);
    for (recive in db) {
        createItem(recive, db[recive]);
    };
};

items.btn.addEventListener("click", () => {
    const recive = items.inputs[0];
    const reply = items.inputs[1];

    if (db["recive"] == recive.value) return alert("Trigger name is already in use.");

    if (!reply.value) return alert("Reply must not be empty.");

    createItem(recive.value, reply.value);

    db[recive.value] = reply.value;
    localStorage.setItem("commands", JSON.stringify(db));

    recive.value = "";
    reply.value = "";
});