import * as UserEventEmitter from "events";

export class UserEvents extends UserEventEmitter.EventEmitter {
    createPost(content) {
        console.log("Post is Created.");
        this.emit("postCreated")
    }
} 