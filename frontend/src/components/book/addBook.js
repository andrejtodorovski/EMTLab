import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom' 
import { Link } from 'react-router-dom'
const AddBook = (props) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = useState({
        name: '',
        category: '',
        authorId: 1,
        availableCopies: 1
    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const authorId = formData.authorId;
        const category = formData.category;
        const availableCopies = formData.availableCopies;
        props.onAddBook(name, category, authorId, availableCopies);
        navigate("/books");
    }

    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <Link to={"/books"} className='btn btn-primary mt-4 mb-4'>Books</Link>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" required className="form-control" onChange={handleChange} defaultValue="">
                        <option value="" disabled>Choose a category</option>
                            {props.categories.map((term) =>
                                <option value={term} key={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" required className="form-control" onChange={handleChange} defaultValue="">
                        <option value="" disabled>Choose an Author</option>
                            {props.authors.map((term) =>
                                <option value={term.id} key={term.id}>{term.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               required
                               onChange={handleChange}
                               min='0'
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    );

}
export default AddBook;