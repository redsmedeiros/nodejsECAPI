//importações
import http from 'http';
import app from './app/app.js';

//criar o servidor
const PORT = process.env.PORT || 7000
const server = http.createServer(app)

//escutar o servidor
server.listen(PORT, ()=> console.log(`servidor rodando na porta ${PORT}`))