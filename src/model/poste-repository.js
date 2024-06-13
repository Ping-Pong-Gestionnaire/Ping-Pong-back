const Poste = require('../datamodel/poste.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");

exports.createPoste = async (nom) => {

    const poste = await this.isExisting(nom);
    console.log(poste)

    if( poste === undefined ){
        async function createPoste(nom) {
            try {
                const newPoste = await Poste.create({ nom });
                console.log('Nouveau poste crée.:', newPoste);
            } catch (error) {
                console.error('Erreur lors de la création de poste :', error);
            }
        }

        createPoste(nom);
        return 'ok';
    }
    else{
        return 'Nom de poste déjà pris.';
    }

}

exports.isExisting = async (nom) => {

    const user = await sequelize.query('SELECT nom from postes where nom =  :nom', { replacements: { nom }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return user;
}