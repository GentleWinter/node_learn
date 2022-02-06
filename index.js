const customExpress = require('./config/customExpress.js');
const conexao = require('./infra/conexao.js');
const Tabelas = require('./infra/tabelas.js');


conexao.connect(erro => {
    if(erro){
        console.log('Deu ruim: ',erro);
    }
    console.log('Devidamente conectado');
    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('listen to port 3000'));
})