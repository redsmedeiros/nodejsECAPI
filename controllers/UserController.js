//importações
import User  from '../model/User.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js';
import { verifyToken } from '../utils/verifyToken.js';

//@desc Register user
//@route POST /api/v1/users/register
//@access Private/admin

export const registerUserCtrl = expressAsyncHandler(async(req, res)=>{
    
    //receber do corpo da requisição as variaveis do form
    const { fullname, email, password } = req.body

    //verificar se o usuario existe no banco
    const userExist = await User.findOne({email: email})

    if(userExist){
        throw new Error('Usuário já cadastrado')
    }

    //criptografar password
    const salt = await bcrypt.genSalt(10)
    const hashedPasswors = await bcrypt.hash(password, salt)

    //criar usuário no banco
    const user = await User.create({
        fullname: fullname,
        email: email,
        password: hashedPasswors
    })

    res.status(201).json({
        status: 'success',
        message: 'Usuário cadastrado com sucesso',
        data: user
    })
}
)

//@desc Login user
//@route POST /api/v1/users/login
//@access Public

export const loginUserCtrl = expressAsyncHandler(async (req, res)=>{

    //receber os dados de login do usuario
    const { email , password } = req.body

    //verificar usuario no banco
    const userFound = await User.findOne({email: email})

    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status: 'success',
            message: 'Login realizado com sucesso',
            userFound: userFound,
            token: generateToken(userFound?._id)
        })
       
    }else{
       throw new Error('Login inválido')
    }

})

//@desc Get user profile
//@route POST /api/v1/users/profile
//@access Private

export const getUserProfileCtrl = expressAsyncHandler(async (req, res)=>{
    
 const token = getTokenFromHeader(req)

 const verified = verifyToken(token)

 console.log(verified)


})