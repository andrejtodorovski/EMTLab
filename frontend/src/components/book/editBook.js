import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom' 
import { Link } from 'react-router-dom'
const EditBook = (props) => {
    const navigate = useNavigate();
    const [formData, updateFormData] = useState({
        name: '',
        category: '',
        authorId: -1,
        availableCopies: -1
    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const authorId = formData.authorId !== -1 ? formData.authorId : props.book.author.id
        const category = formData.category !== "" ? formData.category : props.book.category;
        const availableCopies = formData.availableCopies !== -1 ? formData.availableCopies : props.book.availableCopies; 
        props.onEditBook(props.book.id,name, category, authorId, availableCopies);
        navigate("/books");
    }  
    return (
        <div className="row mt-5">
            <div className="col-md-5">
                <Link to={"/books"} className='btn btn-primary mb-4'>Go back to all Books</Link>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                            //    value={props.book.name}
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" required className="form-control" onChange={handleChange}>
                        <option value="" disabled selected>Choose a category</option>
                        {props.categories.map((term) =>
                            {
                                if(props.book.category !== undefined && 
                                    props.book.category === term)
                                    return <option value={term} key={term} selected>{term}</option>
                                else
                                    return <option value={term} key={term}>{term}</option>
                            }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authorId" required className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if(props.book.author !== undefined && 
                                    props.book.author.id === term.id)
                                    return <option value={term.id} key={term.id} selected>{term.name}</option>
                                else
                                    return <option value={term.id} key={term.id}>{term.name}</option>
                             }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               onChange={handleChange}
                               min='0'
                               placeholder={props.book.availableCopies}
                            //    value={props.book.availableCopies}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default EditBook;