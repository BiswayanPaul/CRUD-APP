import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from "./components/formtable";

axios.defaults.baseURL = "https://crud-app-veya.onrender.com/"


function App() {
  let i = 1;
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hobby: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    phone: "",
    hobby: "",
    _id: ""
  })

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const [dataList, setDataList] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("/create", formData)
    console.log(data);
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getfetchData()
    }
  }

  const getfetchData = async () => {

    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(() => {
    getfetchData()
  }, [])

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getfetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update/", formDataEdit)
    if (data.data.success) {
      getfetchData()
      alert(data.data.message)
      setEditSection(false)
    }

  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }
  return (
    <>
      <div className="container my-css-div">
        <div className="my-css-btn">
          <button onClick={() => setAddSection(true)} type="button" className="btn btn-primary my-css-btn">Add</button>
        </div>


        {
          addSection && (
            <Formtable
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
              handleClose={() => setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editSection && (
            <Formtable
              handleOnChange={handleEditOnChange}
              handleSubmit={handleUpdate}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }


        <div className="rounded">
          <table className="table rounded my-3">
            <thead>
              <tr >
                <th className="bg-dark text-light" scope="col">#</th>
                <th className="bg-dark text-light" scope="col">Name</th>
                <th className="bg-dark text-light" scope="col">Email</th>
                <th className="bg-dark text-light" scope="col">Mobile</th>
                <th className="bg-dark text-light" scope="col">Hobby</th>
                <th className="bg-dark text-light" scope="col">

                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((el) => {
                    return (
                      <tr>
                        <td>{i++}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                        <td>{el.hobby}</td>
                        <td>
                          <button onClick={() => handleEdit(el)} type="button" className="btn btn-warning mx-3 my-3">Edit</button>
                          <button onClick={() => handleDelete(el._id)} type="button" className="btn btn-danger mx-3 my-3">Delete</button>
                        </td>
                      </tr>
                    )
                  }))
                  :
                  (
                    <p style={{ textAlign: "center" }}> No Data </p>
                  )
              }
            </tbody>
          </table>
        </div>

      </div >

    </>
  );
}

export default App;
