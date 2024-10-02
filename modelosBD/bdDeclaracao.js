import {Sequelize} from 'sequelize';
import mysql from 'mysql2/promise';
import bdSenha from './bdSenha.js';


async function criaBD() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',  
        password: bdSenha
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS `bytecafeprodutos`');
    await connection.end();
}


const ssequelize = new Sequelize('bytecafeprodutos','root',bdSenha,{
    host:'localhost',
    dialect: 'mysql' 
});


async function iniciaBanco() {
    await criaBD(); 
    await ssequelize.sync();
}

iniciaBanco().then(() => {
    console.log('Banco de dados sincronizado');
}
).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});


export default ssequelize;