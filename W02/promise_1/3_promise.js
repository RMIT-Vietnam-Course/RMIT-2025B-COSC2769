function getUserId() {
    console.log("1. Waiting for getUserId...");

    return new Promise(resolve => {
        setTimeout(() => {
            console.log("2. getUserId done.");
            resolve(1);
        }, 1500);
    });
}

function getUserInfo(id) {
    console.log(`3. Waiting for getUserInfo for ID ${id}...`);

    return new Promise(resolve => {
        setTimeout(() => {
            console.log("4. getUserInfo done.");
            resolve("Alice");
        }, 1000);
    });
}

function showGreeting(name) {
    console.log(`5. Hello ${name}!`);
}

function run() {
    getUserId()
        .then(id => getUserInfo(id))
        .then(name => showGreeting(name));
}

run();