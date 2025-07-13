const students = [
    { id: 's123', name: 'Alice', GPA: 3.4 },
    { id: 's111', name: 'Alex', GPA: 2.4 },
    { id: 's456', name: 'Bob', GPA: 2.8 },
    { id: 's789', name: 'Carol', GPA: 3.7 }
];

/*********/
/* Map() */
/*********/

/*
let newArray = [];
for (let student of students) {
    newArray.push(student.name);
}
*/

//let newArray = students.map(student => student.name);
//let newArray = students.map(student => student.GPA);

let newArray = students.map(student => {
    if (student.GPA < 3.0) {
        return null;
        //return {};
        //return undefined;
        //return;
        //return '';
        //return NaN;
        //return 'Not Valid';
    }

    const id = student.id.replace('s', '');

    return {
        id: "student-" + id,
        name: student.name,
        status: "active",
        grade: student.GPA >= 3.0 ? 'A' : 'B'
    };
});

/*
const newArray = students.map(student =>
    `<tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
    </tr>`);
*/

console.log(newArray);

/************/
/* Filter() */
/************/

//let filteredArray = students.filter(student => student.GPA >= 3.0);
//let filteredArray = students.filter(student => student.name.startsWith('A'));
let filteredArray = students.filter(student => student.name.startsWith('A') && student.GPA >= 3.0);

console.log(filteredArray);

/************/
/* Reduce() */
/************/

// Calculate the total GPA of all students.
/*
let total = 0;
for (const student of students) {
    total = total + student.GPA;
}
*/

//let totalGPA = students.reduce((total, student) => total + student.GPA, 0);
//const avgGPA = totalGPA / students.length;
//console.log('Average GPA:', avgGPA.toFixed(2));

const cart = [
    { id: 1, name: 'Apple', price: 1.2, quantity: 3 },
    { id: 2, name: 'Banana', price: 0.5, quantity: 5 },
];

let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

console.log(totalPrice);