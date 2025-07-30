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

async function run() {
    const id = await getUserId();
    const name = await getUserInfo(id);
    showGreeting(name);
}

run();