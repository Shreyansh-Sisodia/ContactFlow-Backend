const express=require('express')
const router=express.Router()
const {getContacts, createContact, editContact, deleteContact}=require('../controller/contactController')
const validateToken=require('../middleware/validateTokenHandler')

// router.use(validateToken)

router.get('/api/contacts/getContacts',validateToken,getContacts)

router.post('/api/contacts/createContact',validateToken, createContact)

router.put('/api/contacts/editContact/:id',validateToken,editContact)

router.delete('/api/contacts/deleteContact/:id',validateToken, deleteContact)

module.exports=router