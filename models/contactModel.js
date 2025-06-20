const mongoose=require('mongoose')

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    name:{type:String,
        required: true,
        unique: false
    },

    email:{type:String,
        required: true,
        unique: true
    },

    phone:{type:String,
        required:false,
        unique:true
    }
},

{
    timestamps: true
})

module.exports=mongoose.model("Contact",contactSchema)