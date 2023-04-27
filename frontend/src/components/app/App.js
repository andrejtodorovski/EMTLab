import { Component, React } from "react";
import Book from "../book/book";
import Country from "../countries/countries";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ApiService from "../../service/apiService";
import Author from "../author/author";
import BookDetails from "../bookDetails/BookDetails";
import AddBook from "../book/addBook";
import EditBook from "../book/editBook";
import { Link } from 'react-router-dom';
import Category from "../categories/categories";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      authors: [],
      selectedBook: {},
      categories: [],
      countries: [],
      selectedAuthor: {},
      selectedCountry: {},
    };
  }
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand bg-dark navbar-dark mb-5">
            <div className="container">
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">
              <ul className="d-flex flex-row list-unstyled">
                <li><Link to={"/books"} className='nav-link'>Books</Link></li>
                <li><Link to={"/countries"} className='nav-link'>Countries</Link></li>
                <li><Link to={"/authors"} className='nav-link'>Authors</Link></li>
                <li><Link to={"/categories"} className='nav-link'>Category</Link></li>

              </ul>
                </div>
                </div>
            </div>
          </nav>
        <main>
          <div className="container">
            <Routes>
              <Route
                exact
                path="/books"
                element={
                  <Book
                    books={this.state.books}
                    onDelete={this.deleteBook}
                    onEdit={this.getBook}
                    onLendBook={this.lendBook}
                  />
                }
              ></Route>
              <Route
                exact
                path="/books/add"
                element={
                  <AddBook
                    authors={this.state.authors}
                    categories={this.state.categories}
                    onAddBook={this.addBook}
                  />
                }
              ></Route>
              <Route
                exact
                path="/books/edit/:id"
                element={
                  <EditBook
                    authors={this.state.authors}
                    categories={this.state.categories}
                    onEditBook={this.editBook}
                    book={this.state.selectedBook}
                  />
                }
              ></Route>
              <Route
                exact
                path="/authors"
                element={<Author authors={this.state.authors} />}
              ></Route>
              <Route
                exact
                path="/countries"
                element={<Country countries={this.state.countries} />}
              ></Route>
              <Route
                exact
                path="/categories"
                element={<Category categories={this.state.categories} />}
              ></Route>
              <Route
                index
                element={
                  <Book
                    books={this.state.books}
                    onDelete={this.deleteBook}
                    onEdit={this.getBook}
                    onLendBook={this.lendBook}
                  />
                }
              ></Route>
              <Route
                exact
                path="/books/:id"
                element={
                  <BookDetails
                    id={window.location.pathname.split("/")[2]}
                    getBook={this.getBook}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </main>
        </div>
      </Router>
    );
  }
  loadBooks = () => {
    ApiService.getAllBooks().then((res) => {
      this.setState({
        books: res.data,
      });
    });
    this.loadCategories();
  };
  loadCategories = () => {
    ApiService.getAllCategories().then((res) => {
      this.setState({
        categories: res.data,
      });
    });
  };
  loadAuthors = () => {
    ApiService.getAllAuthors().then((res) => {
      this.setState({
        authors: res.data,
      });
    });
  };
  loadCountries = () => {
    ApiService.getAllCountries().then((res) => {
      this.setState({
        countries: res.data,
      });
    });
  };
  lendBook = (id) => {
    ApiService.lendBook(id).then((res) => {
      this.loadBooks();
    })
  }
  getBook = (id) => {
    ApiService.getBook(id).then((res) => {
      this.setState({
        selectedBook: res.data,
      });
    });
  };
  deleteBook = (id) => {
    ApiService.deleteBook(id).then(() => {
      this.loadBooks();
    });
  };
  addBook = (name, country, authorId, availableCopies) => {
    ApiService.addBook(name, country, authorId, availableCopies).then(() => {
      this.loadBooks();
    });
  };
  editBook = (id, name, country, authorId, availableCopies) => {
    ApiService.editBook(id, name, country, authorId, availableCopies).then(
      () => {
        this.loadBooks();
      }
    );
  };
  componentDidMount() {
    this.loadBooks();
    this.loadAuthors();
    this.loadCountries();
  }
}

export default App;
