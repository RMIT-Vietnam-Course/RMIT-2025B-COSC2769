const webSocket = require('ws');

const PORT = 3003;
const wss = new webSocket.Server({ port: PORT });

let clients = [];
let round = 1;
let moves = [null, null];

function broadcast(msg) {
    clients.forEach(ws => ws.readyState === webSocket.OPEN && ws.send(msg));
}

function winner(m1, m2) {
    if (m1 === m2) return 0;

    if (m1 === 'R' && m2 === 'S') return 1;
    if (m1 === 'S' && m2 === 'P') return 1;
    if (m1 === 'P' && m2 === 'R') return 1;

    return 2;
}

function startRound() {
    moves = [null, null];
    broadcast(`Round ${round}.`);
}

wss.on('connection', (ws) => {
    if (clients.length >= 2) {
        ws.close();
        return;
    }

    clients.push(ws);

    if (clients.length === 2) {
        startRound();
    }

    ws.on('message', (raw) => {
        if (clients.length < 2) return;

        const clientIndex = clients.indexOf(ws);
        if (clientIndex === -1) return;

        const msg = String(raw).trim().toUpperCase();

        if (!['R', 'P', 'S'].includes(msg)) return;

        if (moves[clientIndex] == null) {
            moves[clientIndex] = msg;
        }

        if (moves[0] && moves[1]) {
            const result = winner(moves[0], moves[1]);

            let announce = '';
            if (result === 0) announce = `Round ${round}: Draw. Round ${round + 1}.`;
            if (result === 1) announce = `Round ${round}: Player 1 wins. Round ${round + 1}.`;
            if (result === 2) announce = `Round ${round}: Player 2 wins. Round ${round + 1}.`;

            round += 1;

            broadcast(announce);
            startRound();
        }
    });

    ws.on('close', () => {
        clients = clients.filter(c => c !== ws);
        round = 1;
        moves = [null, null];
    });
});

console.log(`RPS server on ws://localhost:${PORT}`);