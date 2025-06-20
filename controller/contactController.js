const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel')


const getContacts= asyncHandler(async (req,res) => {
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})


const createContact=asyncHandler(async (req,res) => {
    console.log("The request body is: ",req.body)
    const {name,email,phone}=req.body
    if (!name || !email || !phone) {
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create ({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact)
})


const editContact=asyncHandler(async (req,res) => {
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact cannot be found")
    }

    if (req.user.id!==contact.user_id.toString()){
        res.status(403)
        throw new Error("User not authorized")
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
  
    res.status(200).json(updatedContact)
})


const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found");
    }

    if(req.user.id!==contact.user_id.toString()){
        res.status(403)
        throw new Error("User not authorized")
    }

    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({ message: "Contact deleted successfully" });

});


module.exports={ getContacts, createContact, editContact, deleteContact}