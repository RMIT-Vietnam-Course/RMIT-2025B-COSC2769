function getUserId(callback) {
    console.log("1. Waiting for getUserId...");

    setTimeout(() => {
        console.log("2. getUserId done.");
        callback(1);
    }, 1500);
}

function getUserInfo(id, callback) {
    console.log(`3. Waiting for getUserInfo for ID ${id}...`);

    setTimeout(() => {
        console.log("4. getUserInfo done.");
        callback("Alice");
    }, 1000);
}

function showGreeting(name) {
    console.log(`5. Hello ${name}!`);
}

function run() {
    getUserId(id => {
        getUserInfo(id, name => {
            showGreeting(name);
        });
    });
}

run();