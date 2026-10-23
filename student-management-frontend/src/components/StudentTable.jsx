import { deleteStudent } from "../service/studentService";

function StudentTable({ students, onStudentDeleted, onEdit }) {

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this student?")) {
            return;
        }

        try {

            await deleteStudent(id);

            alert("Student deleted successfully!");

            onStudentDeleted();

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete student");

        }
    };

    return (
        <table>

            <thead>

                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Action</th>
                </tr>

            </thead>

            <tbody>

                {students.length === 0 ? (

                    <tr>
                        <td colSpan="6">
                            No students found
                        </td>
                    </tr>

                ) : (

                    students.map((student) => (

                        <tr key={student.id}>

                            <td>
                                {student.id}
                            </td>

                            <td>
                                {student.name}
                            </td>

                            <td>
                                {student.email}
                            </td>

                            <td>
                                {student.age}
                            </td>

                            <td>
                                {student.course}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        onEdit(student)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(student.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>
    );
}

export default StudentTable;