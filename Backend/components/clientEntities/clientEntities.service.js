const bcrypt = require('bcryptjs');

const db = require('../../_helpers/db');

module.exports = {
    getBalance,
    update
};

async function getBalance(idServ,account) {
    try {
        return await db.ClientEntitie.findAll({
            where : {
                idServ : idServ,
                cuenta : account
            },
            include : {
                model : db.Clientes
            }
        })
          

    } catch (error) {
        return(error)
    }
}

async function update(params) {
    console.log(params)
    try {
        return await db.ClientEntitie.update(
            {
                saldoActual: params.saldoActual
            },
            { 
                where: 
                {
                    cuenta : params.account
                }
            }
        )         

    } catch (error) {
        return(error)
    }
}