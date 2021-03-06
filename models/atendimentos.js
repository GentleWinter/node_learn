const req = require("express/lib/request");
const moment = require(`moment`);
const { conexao } = require("../infra/tabelas");

class Atendimentos {
    adiciona(atendimentos, res){
        const dataCriacao = moment().format(`YYYY-MM-DD HH:MM:ss`);
        const data = moment(atendimentos.data, `DD/MM/YYYY HH:MM:ss`).format(`YYYY-MM-DD HH:MM:ss`);
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimentos.cliente.length >= 5;

        const validacoes = [
            {
                nome: `data`,
                valido: dataEhValida,
                mensagem: `Data deve ser igual ou posterior à atual`
            },
            {
                nome: `cliente`,
                valido: clienteEhValido,
                mensagem: `Nome de cliente deve conter mais de 5 caracteres`
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        }
        else{
            const atendimentoDatado = {...atendimentos, dataCriacao, data}
    
            const sql = `INSERT INTO atendimentos SET ?`;
        
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro);
                }
                else{
                    res.status(201).json({atendimentoDatado});
                }

            });
        }
    }

    lista(res){
        const sql = `SELECT * FROM Atendimentos`;

        conexao.query(sql, (erro, resultados)=> {
            if(erro){
                res.status(500).json(erro);
            } else{
                res.status(200).json(resultados);
            }
        });
    }

    buscaId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultados) =>{
            const atendimeto = resultados[0];
            if(erro){
                res.status(500).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, `DD/MM/YYYY HH:MM:ss`).format(`YYYY-MM-DD HH:MM:ss`);
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json({...valores, id});
            }
        });
    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=?`;

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimentos;