import React from 'react';
import { Link } from 'react-router-dom'
const Author = (props) => {
    return (
        <div className='container'>
                <Link to={"/books"} className='btn btn-primary mt-4 mb-4'>Books</Link>
            <div>
                <div>
                    <table className='table-bordered table'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Surname</th>
                                <th scope='col'>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.authors.map((author)=> {
                            return (
                            <tr key={author.id}>
                                <td>{author.name}</td>
                                <td>{author.surname}</td>
                                <td>{author.country.name}</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default Author;