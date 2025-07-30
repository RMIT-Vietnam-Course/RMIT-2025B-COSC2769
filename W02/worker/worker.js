function heavyTask() {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        for (let i = 0; i < 1e9; i++) {
            sum += i;
        }
    }

    return sum;
}

onmessage = function (e) {
    if (e.data === "start") {
        const sum = heavyTask();

        this.postMessage(sum)
    }
};