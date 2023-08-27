import React from 'react'
import "../App.css"
const Formtable = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
    return (
        <div className="addContainer bg-light mx-auto p-2 my-css-div">

            <form onSubmit={handleSubmit} >
                <div className="d-flex mb-3">
                    <button onClick={handleClose} type="button" className="btn-close ms-auto p-2" aria-label="Close"></button>
                </div>


                <div className="mb-3 d-flex justify-content-center">
                    <label htmlFor="name" className="form-label mx-3">Name:</label>
                    <input onChange={handleOnChange} value={rest.name} type="text" className="form-control my-css-input-text mx-3 my-2" id="name" name="name" />
                </div>


                <div className="mb-3 d-flex justify-content-center">
                    <label htmlFor="email" className="form-label mx-3">Email:</label>
                    <input onChange={handleOnChange} value={rest.email} type="email" name="email" className="form-control my-css-input-text mx-3 my-2" id="email" aria-describedby="emailHelp" />
                </div>


                <div className="mb-3 d-flex justify-content-center">
                    <label htmlFor="phone" className="form-label mx-3">Phone: </label>
                    <input onChange={handleOnChange} value={rest.phone} type="number" name="phone" className="form-control my-css-input-text mx-3 my-2" id="phone" />
                </div>


                <div className="mb-3 d-flex justify-content-center">
                    <label htmlFor="hobbies" className="form-label mx-3">Hobby: </label>
                    <input onChange={handleOnChange} value={rest.hobby} type="text" name="hobby" className="form-control my-css-input-text mx-3 my-2" id="hobbies" />
                </div>


                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>


            </form>
        </div>
    )
}

export default Formtable