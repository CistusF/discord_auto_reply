const { Client, ActivityType, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds] });

const elements = {
    icon: document.querySelector(".icon"),
    name: document.querySelector(".name"),
    menus: document.querySelectorAll(".item"),
    menu: document.querySelector(".menu")
};

client.once("ready", () => {
    document.body.style.opacity = 1;
    elements.icon.src = client.user.displayAvatarURL();
    elements.name.innerText = client.user.tag;
    localStorage.setItem("name", client.user.tag);
    localStorage.setItem("ping", client.ws.ping);
    setInterval(() => {
        localStorage.setItem("ping", client.ws.ping);
    }, 5000);
    client.user.setActivity({
        name: "discord_auto_reply",
        type: ActivityType.Listening
    });
    elements.menu.src = "./menus/Main.html";
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    console.log("[Debug] Message created: " + message.author.tag);
    var db = localStorage.getItem("commands");
    if (!db) return;
    db = JSON.parse(db);
    const reply = db[message.content];
    console.log(reply);
    if (reply) {
        message.reply(reply);
    }
});

client.login(localStorage.getItem("token")).catch(() => {
    alert("An invalid token was provided.");
    location.href = "./index.html";
});

elements.menus.forEach(ele => {
    ele.addEventListener("click", () => {
        changeMenu(ele.innerText);
    });
});

const changeMenu = (id) => {
    const menu = elements.menu;
    menu.src = "./menus/" + id + ".html";
};