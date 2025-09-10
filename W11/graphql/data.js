export const students = [
    { id: 1, name: "Alice", major: "IT", GPA: 3.3 },
    { id: 2, name: "Bob", major: "SE", GPA: 3.2 },
    { id: 3, name: "Carol", major: "SE", GPA: 2.8 },
    { id: 4, name: "David", major: "IT", GPA: 3.1 },
];

export const scores = [
    { course_id: 1, student_id: 1, score: 3.3 },
    { course_id: 1, student_id: 2, score: 3.1 },
    { course_id: 1, student_id: 3, score: 2.7 },
    { course_id: 2, student_id: 1, score: 3.6 },
    { course_id: 2, student_id: 4, score: 3.4 },
];

export const courses = [
    { id: 1, name: "Full Stack", credits: 12 },
    { id: 2, name: "Databases", credits: 12 },
    { id: 3, name: "Capstone Project", credits: 24 },
];

export const getStudents = () => students;
export const findStudent = (id) => students.find(s => s.id === id);
export const getStudentName = (id) => findStudent(id).name;
export const getStudentScores = (id) => scores.filter((sc) => sc.student_id === id);
export const findCourses = (name) => courses.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
export const findCourse = (id) => courses.find(c => c.id === id);
export const getCourseName = (id) => findCourse(id).name;
export const getStudentsByCourse = (courseId) =>
    scores.filter((sc) => sc.course_id === courseId).map((sc) => findStudent(sc.student_id));