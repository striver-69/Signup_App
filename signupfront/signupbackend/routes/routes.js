const express=require('express')
const router=express.Router()
const signUpTemplateCopy=require('../models/SignUpModels')
const bcrypt=require('bcrypt')

router.post('/signup',(request,response)=>{
    const saltPassword= bcrypt.genSaltSync(10);
    const securePassword= bcrypt.hashSync(request.body.password,saltPassword)
    const signedUpUser=new signUpTemplateCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:securePassword
    })
    signedUpUser.save()
    .then((data)=> response.json(data))
    .catch((error)=>{
        response.json(error)
    })
})

module.exports=router