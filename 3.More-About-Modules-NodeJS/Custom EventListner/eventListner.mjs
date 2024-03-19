import { UserEvents } from "./index.mjs";

const userEvent = new UserEvents;

function updateDB() {
    console.log("Database has updated.");
}

function sendNoti() {
    console.log("Notification has sent.");
}

function updateTimeLine() {
    console.log("Timeline has updated.");
}

userEvent.addListener("postCreated", updateDB);
userEvent.addListener("postCreated", sendNoti);
userEvent.addListener("postCreated", updateTimeLine);

userEvent.createPost("This is my first post.")