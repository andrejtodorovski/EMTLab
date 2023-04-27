import axios from '../axios/axios';

const ApiService = {
    getAllBooks: () => {
        return axios.get("/books");
    },
    getAllAuthors: () => {
        return axios.get("/authors");
    },
    getBook(id){
        return axios.get(`/books/${id}`);
    },
    getAllCategories: () => {
        return axios.get("/books/categories");
    },
    getAllCountries: () => {
        return axios.get("/countries");
    }
    ,
    deleteBook(id){
        return axios.delete(`/books/delete/${id}`);
    },
    addBook(name, category, authorId, availableCopies){
        return axios.post('/books/add',{
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        })
    },
    editBook(id,name, category, authorId, availableCopies){
        return axios.put(`/books/edit/${id}`,{
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        })
    },
    getAllBooksPagination: () => {
        return axios.get("/books/pagination", {
            params: {
                size: 3,
                page: 1
            }
        })
    },
    lendBook(id){
        return axios.put(`/books/rentBook/${id}`)
    }
}
export default ApiService