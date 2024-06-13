const Poste = require('../datamodel/poste.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");
const User = require("../datamodel/user.model");

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

exports.modifPoste = async (id, nom) =>{

    try{
        const poste = await sequelize.query(`UPDATE postes 
                                            SET nom= :nom
                                            WHERE id_poste = :id;`,
                                    { replacements: { nom, id }})
            .then(([results, metadata]) => {
               // console.log("Modification de poste effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        console.error('Erreur lors de la modification de poste:', error);
        return 'Erreur lors de la modification de poste.'
    }

}

exports.suppPoste = async (id_poste) => {
    try{
        await Poste.destroy({ where: { id_poste } });
        return 'ok'
    }catch(error){
        console.error('Erreur lors de la suppression de poste :', error);
        return 'Erreur lors de la suppression de poste.'
    }

};