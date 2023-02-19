export const getTokenFromHeader = (req)=>{
       //pegar o token dos headers
       const token = req?.headers?.authorization?.split(' ')[1]

       if(token === undefined){
        return 'Token não encontrado'
       }else{
        return token
       }
}