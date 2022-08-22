const express = require('express')

const router = express.Router()

//Categories CRUD
let DataBase = {
    categories:[
        {
            id: 1,
            title: "Iphone1",
            description: "Smartphone made by Apple that combines a computer iPod digital camera and cellular phone into one device with a touchscreen interface",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        },
        {
            id: 2,
            title: "Iphone2",
            description: "Smartphone made by Apple that combines a computer iPod digital camera and cellular phone into one device with a touchscreen interface",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        },
        {
            id: 3,
            title: "Iphone3",
            description: "Smartphone made by Apple that combines a computer iPod digital camera and cellular phone into one device with a touchscreen interface",
            created_at: "2022-03-26T09:08:44.000000Z",
            updated_at: "2022-03-26T09:08:44.000000Z"
        }
    ]
}
// Created
router.post('/', (req, res) => {
    let categories = req.body
console.log(!categories.title)
    if (!categories.title) {
        res.status(400).send("Enter your firstname!")
        return
    }

    if (!categories.description) {
        res.status(400).send("Enter your lastname!")
        return
    }
 console.log(DataBase.categories[0])
    for (i = 0; i < DataBase.categories.length; i++) {
        let element = DataBase.categories[i]

        if (categories.id == element.id) {
            res.status(400).send("This ID already exicst");
            return
        }
    }
    categories.created_at = new Date()
    DataBase.categories.push(categories)
    res.status(201).send("Successfully created")
})
router.get('/',(req,res) => {
res.json(DataBase.categories)
})



// Read Search
router.get('/:name', (req, res) => {
    let search = req.params.name

    if (!search) {
        res.json("require.name")
    }

    // categories ismi orqali aniqlaymiz filter bilan
    let list = DataBase.categories.filter(e => (e.title + " " + e.description).toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("categories not found")
        return
    }
    res.json(list)
})

router.get('/:id', (req, res) => {   // URLda kiritilgan ID Malumotlar omborida bor yoki yoqligi
    const elementID = req.params.id
    const categories = DataBase.categories.find(element => element.id == elementID )
    if (!categories) {
        res.status(401).send("This categories is not found")
        return
    }

    res.status(200).json(categories)
})
// Delete 
router.delete('/:id', (req,res) => {
    let id = req.params.id
    let categories = DataBase.categories.find(element => element.id == id)

    if (!categories) {
        res.status(400).send("This categories is not found");
        return
    }
    DataBase.categories = DataBase.categories.filter(element => element.id != id)

    res.status(200).send("categories was deleted")
})

module.exports = router
