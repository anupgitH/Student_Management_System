import { useEffect, useState } from "react";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

import {
    searchStudents,
    getStudentsPage
} from "../service/studentService";

function Students() {

    // =========================
    // STATE
    // =========================

    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [keyword, setKeyword] = useState("");

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");

    const [direction, setDirection] = useState("asc");


    // =========================
    // LOAD STUDENTS
    // =========================

    const loadStudentsPage = async () => {

        try {

            const response = await getStudentsPage(
                page,
                5,
                sortBy,
                direction
            );

            setStudents(response.data.content);

            setTotalPages(response.data.totalPages);

        } catch (error) {

            console.error(
                "Failed to load students:",
                error
            );

        }
    };


    // =========================
    // LOAD WHEN PAGE / SORT
    // CHANGES
    // =========================

    useEffect(() => {

        if (keyword.trim() === "") {
            loadStudentsPage();
        }

    }, [page, sortBy, direction]);


    // =========================
    // SEARCH
    // =========================

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            setPage(0);

            return;
        }

        try {

            const response = await searchStudents(
                keyword.trim()
            );

            setStudents(response.data);

            setTotalPages(1);

            setPage(0);

        } catch (error) {

            console.error(
                "Search error:",
                error
            );

        }
    };


    // =========================
    // CLEAR SEARCH
    // =========================

    const handleClearSearch = () => {

        setKeyword("");

        setPage(0);

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (student) => {

        setSelectedStudent(student);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // STUDENT SAVED
    // =========================

    const handleStudentSaved = () => {

        setSelectedStudent(null);

        setKeyword("");

        setPage(0);

    };


    // =========================
    // DELETE
    // =========================

    const handleStudentDeleted = () => {

        loadStudentsPage();

    };


    // =========================
    // PREVIOUS
    // =========================

    const handlePrevious = () => {

        if (page > 0) {

            setPage(page - 1);

        }

    };


    // =========================
    // NEXT
    // =========================

    const handleNext = () => {

        if (page < totalPages - 1) {

            setPage(page + 1);

        }

    };


    // =========================
    // SORT
    // =========================

    const handleSortByChange = (e) => {

        setSortBy(e.target.value);

        setPage(0);

    };


    const handleDirectionChange = (e) => {

        setDirection(e.target.value);

        setPage(0);

    };


    // =========================
    // UI
    // =========================

    return (

        <div>

            {/* HEADER */}

            <h1>
                Student Management System
            </h1>


            {/* FORM */}

            <StudentForm
                selectedStudent={selectedStudent}
                onStudentSaved={handleStudentSaved}
            />


            <hr />


            {/* SEARCH */}

            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(e.target.value)
                    }
                    onKeyDown={(e) => {

                        if (e.key === "Enter") {
                            handleSearch();
                        }

                    }}
                />

                <button onClick={handleSearch}>
                    Search
                </button>

                <button onClick={handleClearSearch}>
                    Clear
                </button>

            </div>


            {/* SORTING */}

            <div className="sort-container">

                <label>
                    Sort By:
                </label>

                <select
                    value={sortBy}
                    onChange={handleSortByChange}
                >

                    <option value="id">
                        ID
                    </option>

                    <option value="name">
                        Name
                    </option>

                    <option value="email">
                        Email
                    </option>

                    <option value="age">
                        Age
                    </option>

                    <option value="course">
                        Course
                    </option>

                </select>


                <select
                    value={direction}
                    onChange={handleDirectionChange}
                >

                    <option value="asc">
                        Ascending
                    </option>

                    <option value="desc">
                        Descending
                    </option>

                </select>

            </div>


            {/* STUDENTS */}

            <h2>
                Students
            </h2>


            <div className="table-container">

                <StudentTable
                    students={students}
                    onStudentDeleted={
                        handleStudentDeleted
                    }
                    onEdit={handleEdit}
                />

            </div>


            {/* PAGINATION */}

            {!keyword.trim() && (

                <div className="pagination">

                    <button
                        disabled={page === 0}
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>


                    <span>
                        Page {page + 1} of {totalPages}
                    </span>


                    <button
                        disabled={
                            totalPages === 0 ||
                            page >= totalPages - 1
                        }
                        onClick={handleNext}
                    >
                        Next
                    </button>

                </div>

            )}

        </div>

    );
}

export default Students;