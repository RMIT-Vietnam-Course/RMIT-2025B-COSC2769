// npm install graphql-http

const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
} = require("graphql");

const {
    findStudent,
    getStudentName,
    getStudentScores,
    findCourses,
    getStudentsByCourse,
    getCourseName,
    getStudents,
} = require("./data");

const ScoreType = new GraphQLObjectType({
    name: "Score",
    fields: {
        course_name: {
            type: GraphQLString,
            resolve: (sc) => getCourseName(sc.course_id)
        },
        student_name: {
            type: GraphQLString,
            resolve: (sc) => getStudentName(sc.student_id),
        },
        score: { type: GraphQLFloat },
    },
});

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        major: { type: GraphQLString },
        total: { type: GraphQLFloat, resolve: (s) => s.GPA },
        scores: {
            type: new GraphQLList(ScoreType),
            resolve: (s) => getStudentScores(s.id),
        },
    },
});

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        credits: { type: GraphQLInt },
        students: {
            type: new GraphQLList(StudentType),
            resolve: (c) => getStudentsByCourse(c.id),
        },
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            students: {
                type: new GraphQLList(StudentType),
                resolve: () => getStudents(),
            },
            student: {
                type: StudentType,
                args: { id: { type: GraphQLInt } },
                resolve: (parent, args) => findStudent(args.id),
            },
            courses: {
                type: new GraphQLList(CourseType),
                args: { name: { type: GraphQLString } },
                resolve: (parent, args) => findCourses(args.name),
            },
        },
    }),
});

const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

app.all("/graphql", createHandler({ schema }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));