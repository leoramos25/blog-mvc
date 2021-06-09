const app = require('./app');

require('dotenv').config({path:'variables.env'})

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log('Servidos rodando na porta: '+ server.address().port)
});