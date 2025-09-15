var express = require('express')
var router = express.Router();

const User = require('../models/user')

router.post("/cadastrar", async function (req, res, next) {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        gender: req.body.gender,
        accountType: req.body.accountType,
        notification: req.body.notification
    })

    try {
        const userSave = await newUser.save()
        console.log(userSave)

        res.status(201).json({
            success: "Usuário salvo com sucesso!",
            userSave: userSave
        })
    } catch (err) {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao salvar o usuário" ,
            error: err
        })
    }
})

router.get('/find', async (req, res) => {
    try {
        const email = req.query.email
        const password = req.query.password

        const user = await User.findOne({ email: email, password: password}, { _id: 1, firstName: 1})
        if(user) {
            return res.status(200).json({
                success: "Usuário recuperado com sucesso!",
                user: user
            })
        }
        console.log('nao encontrado')
        return res.status(404).json({
            errorTitle: "Server-side: Usuário não encontrado" ,
            error: "Nenhum usuário encontrado"
        })
    }
    catch (err) {
        console.log('erro')
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao buscar o usuário" ,
            error: err
        })
    }
})

module.exports = router