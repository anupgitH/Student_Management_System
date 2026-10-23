import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

// GET ALL
export const getStudents = () => {
    return axios.get(API_URL);
};

// CREATE
export const addStudent = (student) => {
    return axios.post(API_URL, student);
};

// UPDATE
export const updateStudent = (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
};

// DELETE
export const deleteStudent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// GET BY ID
export const getStudentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// SEARCH
export const searchStudents = (keyword) => {
    return axios.get(`${API_URL}/search`, {
        params: {
            keyword: keyword
        }
    });
};

// PAGINATION + SORTING
export const getStudentsPage = (
    page,
    size,
    sortBy,
    direction
) => {

    return axios.get(`${API_URL}/page`, {
        params: {
            page: page,
            size: size,
            sortBy: sortBy,
            direction: direction
        }
    });
};