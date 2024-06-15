const {sequelize} = require("../datamodel/db")
const Operation = require("../datamodel/operation.model");

exports.createOperation= async ( libelle, tempsRea, description,  id_machine,  id_poste) => {

    const operation = await this.isExisting(libelle);
    console.log(operation)

    if( operation === undefined ){
        async function createOperation(libelle, tempsRea,description,  id_machine, id_poste) {
            try {

                const newMachine = await Operation.create({ libelle : libelle, tempsRea: tempsRea, description: description, id_machine: id_machine,  id_poste : id_poste });

            } catch (error) {
                console.error("Erreur lors de la création de l'opération :", error);
            }
        }

        createOperation(libelle, tempsRea,description,  id_machine, id_poste);
        return 'ok';
    }
    else{
        return "Nom d'opération déjà pris.";
    }

}

exports.isExisting = async (libelle) => {

    const gamme = await sequelize.query('SELECT libelle from operations where libelle =  :libelle', { replacements: { libelle }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return gamme;
}

exports.modifOperation = async (id, libelle, tempsRea, description , id_machine,  id_poste) =>{

    try{
        const operation = await sequelize.query(`UPDATE operations 
                                            SET libelle= :libelle, "tempsRea" = :tempsRea, description = :description, "id_machine" = :id_machine , id_poste = :id_poste
                                            WHERE id_operation = :id;`,
            { replacements: { libelle, tempsRea ,description,  id_machine, id_poste, id}})
            .then(([results, metadata]) => {
                //console.log("Modification de gamme effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        console.error("Erreur lors de la modification d'opération:", error);
        return 'Erreur lors de la modification d"opération.'
    }

}

exports.suppOperation = async (id) => {
    try{
        await Operation.destroy({ where: { id_operation : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return "Erreur lors de la suppression de l'opération."
    }

};
exports.getAll = async () => {
    try{
        const gamme = await Gamme.findAll();
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return gamme;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les gammes."
    }

}
exports.getOne = async (id) => {
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  id_gamme = :id 
                                            and gammes."id_user" = users."id_user"`, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        console.log("gamme = " + gamme);
        return gamme;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur la gamme."
    }


}

exports.getByType = async (type) => {
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  type = :type
                                            and gammes."id_user" = users."id_user"`, { replacements: { type }})
            .then(([results, metadata]) => {
                return results;
            });
        console.log("gamme = " + gamme);
        return gamme;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur la gamme."
    }


}

exports.getByUser = async (id_user) => {
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  gammes.id_user = :id_user
                                            and gammes."id_user" = users."id_user"`, { replacements: { id_user }})
            .then(([results, metadata]) => {
                return results;
            });
        console.log("gamme = " + gamme);
        return gamme;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur la gamme."
    }


}

exports.getByName = async (nom) => {
    nom = '%' + nom + '%';
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  libelle like  :nom
                                            and gammes."id_user" = users."id_user"`, { replacements: { nom }})
            .then(([results, metadata]) => {
                return results;
            });
        console.log("gamme = " + gamme);
        return gamme;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur la gamme."
    }


}