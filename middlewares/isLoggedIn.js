import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIN = (req, res, next)=>{
    //pegar o token
    const token = getTokenFromHeader(req)
    //verificar o token
    const decodedUser = verifyToken(token)

    if(!decodedUser){
        throw new Error('Token expirado')
    }else{

        //colocar o id do user no obj do corpo da requisição
        req.userAuthId = decodedUser?.id
        next()
    }
    
}