//importações
import User  from '../model/User.js';
import bcrypt from 'bcryptjs';

//@desc Register user
//@route POST /api/v1/users/register
//@access Private/admin

export const registerUserCtrl = async(req, res) => {
    
    //receber do corpo da requisição as variaveis do form
    const { fullname, email, password } = req.body

    //verificar se o usuario existe no banco
    const userExist = await User.findOne({email: email})

    if(userExist){
        res.json({message: 'Usuário já existe!'})
        return;
    }

    //criptografar password
    const salt = await bcrypt.genSalt(10)
    const hashedPasswors = await bcrypt.hash(password, salt)

    //criar usuário no banco
    const user = await User.create({
        fullname: fullname,
        email: email,
        password: password
    })

    res.status(201).json({
        status: 'success',
        message: 'Usuário cadastrado com sucesso',
        data: user
    })
}