import React from 'react';
import { Link } from 'react-router-dom'
const Country = (props) => {
    return (
        <div className='container'>
            <div>
                <div>
                    <table className='table-bordered table'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Continent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.countries.map((c)=> {
                            return (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.continent}</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
export default Country;