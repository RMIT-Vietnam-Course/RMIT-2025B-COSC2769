// npm install -g typescript
// tsc sub_1.ts -> node sub_1.js
// npm install -g ts-node  # Optional for running TypeScript files without compiling.

function maxNum(arr: number[]): number {
    return Math.max(...arr);
}

console.log(maxNum([3, 6, 1, 9, 4]));