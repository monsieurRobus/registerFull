const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/6.x/avataaars/svg?seed=gigger%F0%9F%A4%98'
    },        
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    confirmation: {
        type: String,
        default: ''
    }},
    {
        timestamps: true
    }
)


UserSchema.pre('save', async function(next) {

    try {
        if(this.isNew)
            {
                this.password = await bcrypt.hash(this.password, 10)
                next()
            }
    }
    catch(error)
    {
        next("Error hashing password",error)
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User