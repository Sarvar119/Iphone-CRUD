const express = require('express')

const router = express.Router()

let DataBase = {
    products:[
        {
            id: 101,
    category_id: 1,
    title: "iphone 10 pro 256gbs",
    description: "iphone 10",
    cover_photo_url: "https://maplestore.in/wp-content/uploads/2020/10/iPhone-12-Pro.jpg",
    created_at: "2022-03-26T09:08:44.000000Z",
    updated_at: "2022-03-26T09:08:44.000000Z"
},
{
    id: 102,
category_id: 2,
title: "iphone 12 pro 256gbs",
description: "iphone 12pro",
cover_photo_url: "https://maplestore.in/wp-content/uploads/2020/10/iPhone-12-Pro.jpg",
created_at: "2022-03-26T09:08:44.000000Z",
updated_at: "2022-03-26T09:08:44.000000Z"
},
{
    id: 103,
category_id: 3,
title: "iphone 13 pro 256gbs",
description: "iphone13pro",
cover_photo_url: "https://maplestore.in/wp-content/uploads/2020/10/iPhone-12-Pro.jpg",
created_at: "2022-03-26T09:08:44.000000Z",
updated_at: "2022-03-26T09:08:44.000000Z"
}
        
    ]
}
// CREATED
router.post('/', (req, res) => {
    let iphone = req.body

    if (!iphone.category_id) {
        res.status(400).send("Enter the isbn of the book!")
        return
    }

    if (!iphone.title) {
        res.status(400).send("Enter the title of the book!")
        return
    }

    if (!iphone.description) {
        res.status(400).send("Enter the gener of the book!")
        return
    }

    if (!iphone.cover_photo_url) {
        res.status(400).send("Enter the  description of the book!")
        return
    }

    for (i = 0; i < DataBase.products.length; i++) {
        let element = DataBase.products[i]

        if (iphone.id == element.id) {
            res.status(400).send("This ID already exicst");
            return
        }
    }
    iphone.created_at = new Date()
    DataBase.products.push(iphone)
    res.status(201).send("Successfully created")
})
router.get('/',(req,res) => {
    res.json(DataBase.products)
    })

// READ
router.get('/:name', (req, res) => {
    let search = req.params.name

    if (!search) {
        res.json("require.name")
    }

    // products ismi orqali aniqlaymiz filter bilan
    let list = DataBase.products.filter(e => (e.title + " " + e.description).toLowerCase().includes(search.toLowerCase()))

    if (list.length == 0) {
        res.status(404).send("products not found")
        return
    }
    res.json(list)
})

router.get('/:description', (req, res) => {   // URLda kiritilgan ID Malumotlar omborida bor yoki yoqligi
    const elementBody = req.params.description
    const iphone = DataBase.products.find(element => element.id == elementBody)

    if (!iphone) {
        res.status(401).send("This ID not found")
        return
    }
    res.status(200).json(iphone)
})



// DELETE
router.delete('/:id', (req, res) => {
    let elementID = req.params.id
    let iphone = DataBase.products.find(element => element.id == elementID)

    if (!iphone) {
        res.status(400).send("this id of the iphone is not found")
        return
    }

    DataBase.products = DataBase.products.filter(element => element.id != elementID)

    res.status(200).send("iphone was deleted")
})

module.exports = router