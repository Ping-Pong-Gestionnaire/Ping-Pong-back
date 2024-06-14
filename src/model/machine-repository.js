const Machine = require('../datamodel/machine.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");


exports.createMachine= async (nom, id_poste) => {

    const machine = await this.isExisting(nom);
    console.log(machine)

    if( machine === undefined ){
        async function createMachine(nom, id_poste) {
            try {
                if(id_poste === ""){
                    const newMachine = await Machine.create({ nom : nom });
                }
                else{
                    const newMachine = await Machine.create({ nom : nom, id_poste : id_poste });
                }

            } catch (error) {
                console.error('Erreur lors de la création de machineeee :', error);
            }
        }

        createMachine(nom, id_poste);
        return 'ok';
    }
    else{
        return 'Nom de machine déjà pris.';
    }

}

exports.isExisting = async (nom) => {

    const machine = await sequelize.query('SELECT nom from machines where nom =  :nom', { replacements: { nom }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return machine;
}

exports.modifMachine = async (id, nom, id_poste) =>{

    try{
        const machine = await sequelize.query(`UPDATE machines 
                                            SET nom= :nom, id_poste = :id_poste
                                            WHERE id_machine = :id;`,
            { replacements: { nom, id_poste , id}})
            .then(([results, metadata]) => {
                // console.log("Modification de poste effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de machine.'
    }

}