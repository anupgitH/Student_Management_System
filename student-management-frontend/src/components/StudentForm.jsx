import { useEffect, useState } from "react";
import {
    addStudent,
    updateStudent
} from "../service/studentService";

function StudentForm({ selectedStudent, onStudentSaved }) {

    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: "",
        course: ""
    });

    useEffect(() => {

        if (selectedStudent) {

            setStudent({
                name: selectedStudent.name,
                email: selectedStudent.email,
                age: selectedStudent.age,
                course: selectedStudent.course
            });

        }

    }, [selectedStudent]);

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = {
                ...student,
                age: Number(student.age)
            };

            if (selectedStudent) {

                await updateStudent(
                    selectedStudent.id,
                    data
                );

                alert("Student updated successfully!");

            } else {

                await addStudent(data);

                alert("Student added successfully!");
            }

            setStudent({
                name: "",
                email: "",
                age: "",
                course: ""
            });

            onStudentSaved();

        } catch (error) {

            console.error(error);
            alert("Failed to save student");
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={student.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
            />

            <input
                type="number"
                name="age"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
            />

            <input
                type="text"
                name="course"
                placeholder="Course"
                value={student.course}
                onChange={handleChange}
            />

            <button type="submit">

                {selectedStudent
                    ? "Update Student"
                    : "Add Student"}

            </button>

        </form>
    );
}

export default StudentForm;