function randomNumber() {
    return Math.floor(Math.random() * 10);
}

function f1() {
    return new Promise(resolve => setTimeout(() => resolve(randomNumber()), 1000));
}

function f2() {
    return new Promise(resolve => setTimeout(() => resolve(randomNumber()), 1000));
}

async function calcSum() {
    const num1 = await f1();
    console.log(`First number: ${num1}.`);

    const num2 = await f2();
    console.log(`Second number: ${num2}.`);

    console.log(`Sum of ${num1} and ${num2} is ${num1 + num2}.`);
}

calcSum();