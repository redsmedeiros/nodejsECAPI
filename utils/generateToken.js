import jwt  from "jsonwebtoken";

const generateToken = (id)=>{
    return jwt.sign({id}, 'skjdfasjennda', { expiresIn: '3d'})
}

export default generateToken;