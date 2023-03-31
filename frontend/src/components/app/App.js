import { Component, React } from 'react';
import Book from '../book/book';
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import ApiService from '../../service/apiService';
import Author from '../author/author';
import BookDetails from '../bookDetails/BookDetails';
import AddBook from '../book/addBook';
import EditBook from '../book/editBook';

class App extends Component {
  constructor(){
    super();
    this.state = {
      books: [],
      authors: [],
      selectedBook: {},
      categories: []
    }
  }
  render(){
    return (
      <Router>
        <main>
          <div className='container'>
            <Routes>
              <Route exact path="/books" element={
                <Book 
                  books={this.state.books} 
                  onDelete={this.deleteBook}
                  onEdit={this.getBook}/>}>
              </Route>
              <Route exact path="/books/add" element={
                <AddBook 
                  authors={this.state.authors}
                  categories={this.state.categories}
                  onAddBook={this.addBook}/>}>
              </Route>
              <Route exact path="/books/edit/:id" element={
                <EditBook 
                  authors={this.state.authors}
                  categories={this.state.categories}
                  onEditBook={this.editBook}
                  book={this.state.selectedBook}/>}>
              </Route>
              <Route exact path="/authors" element={<Author authors={this.state.authors}/>}></Route>
              <Route index element={<Book books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook}/>}></Route>
              <Route exact path='/books/:id' element={<BookDetails id={window.location.pathname.split("/")[2]}/>}></Route>
            </Routes>
          </div>
        </main>
      </Router>
    );
  }
  loadBooks = () => {
    ApiService.getAllBooks().then((res)=>{
      this.setState({
        books: res.data
      });
    })
    this.loadCategories()
  }
  loadCategories = () => {
    ApiService.getAllCategories().then((res)=>{
      this.setState({
        categories: res.data
      });
    })
  }
  loadAuthors = () => {
    ApiService.getAllAuthors().then((res)=>{
      this.setState({
        authors: res.data
      });
    })
  }
  getBook = (id) => {
    ApiService.getBook(id).then((res)=>{
      this.setState({
        selectedBook: res.data
      })
    })
  }
  deleteBook = (id) => {
    ApiService.deleteBook(id)
    .then(() =>{
        this.loadBooks();
      }
    )
  }
  addBook = (name, country, authorId, availableCopies) => {
    ApiService.addBook(name,country,authorId,availableCopies).then(()=>{
      this.loadBooks();
    })
  }
  editBook = (id, name, country, authorId, availableCopies) => {
    ApiService.editBook(id, name,country,authorId,availableCopies).then(()=>{
      this.loadBooks();
    })
  }
  componentDidMount() {
    this.loadBooks();
    this.loadAuthors();
  }
}

export default App;
