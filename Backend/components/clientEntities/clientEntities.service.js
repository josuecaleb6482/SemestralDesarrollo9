const bcrypt = require('bcryptjs');

const db = require('../../_helpers/db');

module.exports = {
    getBalance
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