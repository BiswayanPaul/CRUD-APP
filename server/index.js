const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()

app.use(cors(
    {
        origin: ["https://crud-app-frontend-78lnhgdsy-biswayanpaul.vercel.app/"],
        method: ["POST","GET"],
        credentials: true
    }
))
app.use(express.json())

mongoose.connect('mongodb+srv://biswayanpaul:biswayan@cluster0.rnhqocb.mongodb.net/crud?retryWrites=true&w=majority')


const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    hobby: String
}, {
    timestamps: true
})


const userModel = mongoose.model("user", schemaData)

// read
//http://localhost:3000/

app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

// create data || save data in mongodb
//http://localhost:3000/create
/*
    {
        "name":
        "email":
        "phone":
        "hobbies": 
    }
*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully", data: data })
})



// update data
//http://localhost:3000/update
/*
    {
        "id": 
        "name":
        "email":
        "phone":
        "hobbies": 
    }
*/
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: " data updated successfully ", data: data })
})

// delete
//http://localhost:3000/delete/id
/*
    { 
    }
*/

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({ _id: id });

    res.send({ success: true, message: " data deleted successfully ", data: data })

})


mongoose.connect("mongodb+srv://biswayanpaul:biswayan@cluster0.rnhqocb.mongodb.net/curd")
    .then(() => {
        console.log("connect to DB")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} `)
        })
    })
    .catch((err) => console.log(err))


