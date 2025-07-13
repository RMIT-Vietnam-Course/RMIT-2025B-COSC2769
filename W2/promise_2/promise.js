function getScore(isPass) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isPass) {
                resolve("You passed!");
            } else {
                reject("You failed.");
            }
        }, 1000);
    });
}

function checkScore(isPass) {
    getScore(isPass)
        .then(message => console.log("Then:", message))
        .catch(error => console.log("Catch:", error))
        .finally(() => console.log("Finally: Always runs."));
}

checkScore(false);