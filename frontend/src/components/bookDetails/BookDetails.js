import React from 'react';
import { Link } from 'react-router-dom'
const BookDetails = (props) => {
    // const book = props.getBook(props.id)
    return (
        <div className='container'>
            <Link to={"/books"} className='btn btn-primary mt-4 mb-4'>All Books</Link>
            <div>
                <div>
                    <table className='table-bordered table'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Available copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default BookDetails;