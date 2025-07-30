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

async function checkScore(isPass) {
    try {
        const message = await getScore(isPass);
        console.log("Then:", message);
    } catch (error) {
        console.log("Catch:", error);
    } finally {
        console.log("Finally: Always runs.");
    }
}

checkScore(false);