import React from 'react';
import { Link } from 'react-router-dom'
const Category = (props) => {
    return (
        <div className='container'>
            <div>
                <div>
                    <table className='table-bordered table'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.categories.map((c)=> {
                            return (
                            <tr key={c}>
                                <td>{c}</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default Category;