var express = require('express')
var router = express.Router();

const Message = require('../models/message')

router.get('/', async function (req, res, next) {
    try {
        const messageList = await Message.aggregate([
            { 
                $lookup: {
                    from: "users",               // Nome da coleção de usuários
                    localField: "user",          // Campo que contém o ObjectId do usuário na coleção de mensagens
                    foreignField: "_id",         // Campo que contém o ObjectId na coleção de usuários
                    as: "userDetails"  
                }
            },
            {
                $unwind: {                      // Se você quiser "desdobrar" a matriz de userDetails
                    path: "$userDetails",
                    preserveNullAndEmptyArrays: true // Mantém mensagens sem usuário
                }
            }
        ])


        res.status(200).json({
            success: "Mensagens recuperadas com sucesso",
            messageList: messageList
        })
    }
    catch (err) {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao buscar as mensagens" ,
            error: err
        })
    }
})

router.post('/', async function (req, res, next) {
    const messageObj = new Message({
        content: req.body.content,
        user: req.body.userId
    })

    try {
        const messageSave = await messageObj.save()
        console.log(messageSave)

        res.status(201).json({
            success: "Mensagem salva com sucesso",
            messageSave: messageSave
        })
    } catch (err) {
        return res.status(500).json({
            errorTitle: "Server-side: Erro ao salvar a mensagem" ,
            error: err
        })
    }
})
router.delete('/:id', async function (req, res, next) {
    try {
        const messageId = req.params.id; 
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).json({
                errorTitle: "Mensagem não encontrada",
                error: "A mensagem com o ID especificado não foi encontrada"
            });
        }

        res.status(200).json({
            success: "Mensagem deletada com sucesso",
            deletedMessage: deletedMessage
        });
    } catch (err) {
        return res.status(500).json({
            errorTitle: "Erro ao deletar a mensagem",
            error: err
        });
    }
});

router.post('/:id', async function(req,res,next){
    try{
        const messageId = req.params.id;
        const updateData = req.body;

        const updateMessage = await Message.updateOne(
            {
                _id : messageId
            },
            {
                $set:{content : updateData.content}
            },
        );


        // const aaae = await Message.findOne({_id : messageId})
        // console.log(aaae);

        if (!updateMessage){
            return res.status(404).json({
                errorTitle: "Mensagem não encontrada",
                error: "A mensagem com o Id em especifico não foi encontrada",
            });
        }
        res.status(200).json({
            success: "Mensagem atualizada",
            updateMessage: updateMessage
        });
    }
    catch (err){
        res.status(500).json({
            errorTitle: "Erro ao atualizar a mensagem",
            error: err
        });
    }
})

module.exports = router