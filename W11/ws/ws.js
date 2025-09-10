const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

// Assume there are two chat rooms.
const room1 = new Set();
const room2 = new Set();

const rooms = [room1, room2];

wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", function message(data) {
        data = `${data}`;  // Convert to string.

        // Special command.
        if (data.startsWith("COMMAND: ")) {
            if (data.endsWith("JOIN 1")) {
                room1.add(ws);
                room2.delete(ws);
            } else if (data.endsWith("JOIN 2")) {
                room2.add(ws);
                room1.delete(ws);
            }

            return;
        }

        rooms.forEach((room) => {
            if (room.has(ws)) {
                room.forEach((socket) => socket.send(data));
            }
        });
    });
});