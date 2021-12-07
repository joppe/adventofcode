let age = 3;
let count = 1;

for (let i = 1; i <= 256; i += 1) {
    if (age === 0) {
        age = 6;
        count += 1;
    } else {
        age -= 1;
    }

    console.log(i, age, count);
}
