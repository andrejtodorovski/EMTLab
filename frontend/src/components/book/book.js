import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'

class Book extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            size: 3
        }
    }
    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset)
        return (
            <div className='container'>
                <Link to={"/authors"} className='btn btn-primary mt-4 mb-4'>Authors</Link>
                <Link to={"/books/add"} className='btn btn-block btn-dark'>Add new Book</Link>
                <div>
                    <div>
                        <table className='table-bordered table'>
                            <thead className='table-dark'>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Category</th>
                                    <th scope='col'>Available copies</th>
                                    <th scope='col'>Author</th>
                                    <th scope='col'>Details</th>
                                    <th scope='col'>Delete</th>
                                    <th scope='col'>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactPaginate  previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={<a href="/#">...</a>}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                className='pagination m-4 justify-content-center'
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                activeClassName={'active'}  />
            </div>
        );
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((book, index) => {
            return (
            <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.category}</td>
                <td>{book.availableCopies}</td>
                <td>{book.author.name}</td>
                <td><Link to={`/books/${book.id}`} className='btn btn-danger'>Details</Link></td>
                <td><button title='Delete' className='btn btn-danger' onClick={()=>this.props.onDelete(book.id)}>Delete</button></td>
                <td><Link to={`/books/edit/${book.id}`} onClick={()=>this.props.onEdit(book.id)} className='btn btn-warning'>Edit</Link></td>
            </tr>);
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

// const Book = (props) => {
    // return (
    //     <div className='container'>
    //         <Link to={"/authors"} className='btn btn-primary mt-4 mb-4'>Authors</Link>
    //         <Link to={"/books/add"} className='btn btn-block btn-dark'>Add new Book</Link>
    //         <div>
    //             <div>
    //                 <table className='table-bordered table'>
    //                     <thead className='table-dark'>
    //                         <tr>
    //                             <th scope='col'>Name</th>
    //                             <th scope='col'>Category</th>
    //                             <th scope='col'>Available copies</th>
    //                             <th scope='col'>Author</th>
    //                             <th scope='col'>Details</th>
    //                             <th scope='col'>Delete</th>
    //                             <th scope='col'>Edit</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {props.books.map((book)=> {
    //                         return (
    //                         <tr key={book.id}>
    //                             <td>{book.name}</td>
    //                             <td>{book.category}</td>
    //                             <td>{book.availableCopies}</td>
    //                             <td>{book.author.name}</td>
    //                             <td><Link to={`/books/${book.id}`} className='btn btn-danger'>Details</Link></td>
    //                             <td><button title='Delete' className='btn btn-danger' onClick={()=>props.onDelete(book.id)}>Delete</button></td>
    //                             <td><Link to={`/books/edit/${book.id}`} onClick={()=>props.onEdit(book.id)} className='btn btn-warning'>Edit</Link></td>
    //                         </tr>)})}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // );

// }
// export default Book;
export default Book;