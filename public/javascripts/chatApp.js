// eslint-disable-next-line no-undef
var socket = io();

/** @type {String} Name of the user */
var username = "";

/** @type {Boolean} True if text is bold */
var textBold = false;

/** @type {Stirng} New message color */
var textColor = "";

/* Store DOM elements to work with them */
var chat = document.getElementById("chat");
var login = document.getElementById("login");
var loginForm = document.getElementById("loginForm");
var loginInput = document.getElementById("loginInput");
var messages = document.getElementById("messages");
var chatForm = document.getElementById("form");
var chatInput = document.getElementById("input");

/* Do not press boldButton. Press send sendButton instead */
chatInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        document.getElementById("sendButton").click();
    }
});

/* Change textBold when boldButton is pressed */
var boldButton = document.getElementById("boldButton");
boldButton.addEventListener("click", (e) => {
    e.preventDefault();
    textBold = !textBold;
    if (textBold) {
        boldButton.style.color = "#000";
        boldButton.style.backgroundColor = "#999";
        chatInput.style.fontWeight = "bold";
    } else {
        boldButton.style.color = "#fff";
        boldButton.style.backgroundColor = "#333";
        chatInput.style.fontWeight = "normal";
    }
});

/* Change textColor when a new color is selected */
var colorInput = document.getElementById("colorInput");
colorInput.addEventListener("change", () => {
    textColor = colorInput.value;
    chatInput.style.color = textColor;
});

/** Event to store username and change view to chat */
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (loginInput.value) {
        username = loginInput.value;
        loginInput.value = "";
        socket.emit("user registered", username);
        chat.style.display = "initial";
        login.style.display = "none";
        chatInput.focus();
    }
});

/** Event to send message */
chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (chatInput.value) {
        socket.emit("chat message", {
            bold: textBold,
            color: textColor,
            message: chatInput.value
        });
        chatInput.value = "";
    }
});

/** Event to recive message and print it */
socket.on("chat message", function (msg) {
    let item = document.createElement("li");
    let messageUsername = document.createElement("strong");
    messageUsername.textContent = msg.user + ": ";
    let messageText = null;
    if (msg.bold) {
        messageText = document.createElement("strong");
    } else {
        messageText = document.createElement("span");
    }
    
    messageText.textContent = msg.message;
    messageText.style.color = msg.color;

    item.append(messageUsername, messageText);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});