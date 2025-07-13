function getUserId() {
    console.log("1. Waiting for getUserId...");

    setTimeout(() => {
        console.log("2. getUserId done.");
        return 1;
    }, 1500);
}

function getUserInfo(id) {
    console.log(`3. Waiting for getUserInfo for ID ${id}...`);

    setTimeout(() => {
        console.log("4. getUserInfo done.");
        return "Alice";
    }, 1000);
}

function showGreeting(name) {
    console.log(`5. Hello ${name}!`);
}

function run() {
    const id = getUserId();
    const name = getUserInfo(id);
    showGreeting(name);
}

run();