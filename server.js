const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'})

//Database connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser:true, useUnifiedTopology:true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERRO: ' + error.message);
});

//Loading all models Models
require('./models/Post');

const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log('Servidor rodando na porta: '+ server.address().port)
});