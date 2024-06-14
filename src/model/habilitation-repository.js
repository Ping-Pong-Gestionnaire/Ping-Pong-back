const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");
const Poste = require("../datamodel/poste.model");
const User = require('../datamodel/user.model');
const Habilitation = require('../datamodel/habilitation.model');


exports.createHabilitation= async (id_user, id_poste) => {

    const habilitation = await this.isExisting(id_user, id_poste);
    console.log(habilitation)

    if( habilitation === undefined ){
        async function createHabilitation(id_user, id_poste) {
            try {
                 const newMachine = await Habilitation.create({ userIdUser : id_user, posteIdPoste : id_poste });
            } catch (error) {
                console.error("Erreur lors de la création de l'habilitation :", error);
            }
        }

        createHabilitation(id_user, id_poste);
        return 'ok';
    }
    else{
        return "L'habilitation à déjà été attribué.";
    }

}

exports.isExisting = async (id_user, id_poste) => {

    const habilitation = await sequelize.query('SELECT "userIdUser", "posteIdPoste" from habilitations where  "userIdUser" =  :id_user  and "posteIdPoste" = :id_poste', { replacements: { id_user, id_poste }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return habilitation;
}


exports.suppHabilitation = async (id_user, id_poste) => {
    try{
        await Habilitation.destroy({ where: { "userIdUser" : id_user , "posteIdPoste" : id_poste} });
        return 'ok'
    }catch(error){
        console.error("Erreur lors de la suppression d'habilitation :", error);
        return "Erreur lors de la suppression de l'habilitation."
    }

};
exports.getAll = async () => {
    try{
        const machine = await Machine.findAll();
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return machine;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les machines."
    }

}
exports.getOne = async (id) => {
    try{
        const machine = await sequelize.query(`SELECT id_machine, nom, id_poste
                                            from machines 
                                            where  id_machine = :id `, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        console.log("machine = " + machine);
        return machine;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les machines."
    }


}