const express = require('express');
const mysql = require('mysql')
const app = express();
const port = 8080;

const config = {
    host:"db",
    user:"root",
    password:"some_password",
    database:"nodedb",
    charset: "utf8mb4"
};
const pool = mysql.createPool(config);

const createTableSql = `
    CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )`;

    pool.query(createTableSql), (err) =>{
        if(err){
            console.error('Erro ao criar a tabela ' + err.stack);
            return;
        } 

        console.log('Tabela people criada ou já existente');
    }

    pool.query(`INSERT INTO people(name) VALUES('Arboleda')`, (err) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.stack);
        } else{
            console.log('Registro inserido com sucesso.');
        }
    });
    
    


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const selectSql = `SELECT * FROM people`;

    pool.query(selectSql, (err, results) => {
        if (err) {
            console.error('Erro na consulta: ' + err.stack);
            res.status(500).send('Erro ao consultar o banco de dados');
            return;
        }
    
        //Escrevendo o FullCycle
        res.write(`<h1>Full Cycle Rocks!!!</h1>`);
        //Escrevendo a lista de pessoas
        res.write(`<h2>Lista de Pessoas:</h2>`);

        //For para listar os nomes
        results.forEach(row =>{
            res.write(`<li>${row.name}</li>`);
        })

        res.write(`</ul>`);
        res.end();
    });
});

app.listen(port, () => {
    console.log(`Express listening on port ` + port); 
    
});
