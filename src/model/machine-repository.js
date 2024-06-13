const Machine = require('../datamodel/machine.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");


exports.createMachine= async (nom, id_poste) => {

    const machine = await this.isExisting(nom);
    console.log(machine)

    if( machine === undefined ){
        async function createMachine(nom, id_poste) {
            try {
                const newMachine = await Machine.create({ nom : nom, id_poste : id_poste });
                console.log('Nouveau poste crée.:', newMachine);
            } catch (error) {
                console.error('Erreur lors de la création de poste :', error);
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
