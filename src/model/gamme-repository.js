const Gamme = require('../datamodel/gamme.model');
const {sequelize} = require("../datamodel/db")
const Poste = require("../datamodel/poste.model");

// les types :
// PRE : matiere premiere
// VEN : vendable
// INT : intermédiare

exports.createGamme= async ( libelle, prix, type, qte, id_user) => {

    const gamme = await this.isExisting(libelle);
    console.log(gamme)

    if( gamme === undefined ){
        async function createMachine(libelle, prix, type, qte, id_user) {
            try {

                const newMachine = await Gamme.create({ libelle : libelle, prix: prix, type: type, qte: qte,  id_user : id_user });

            } catch (error) {
                console.error('Erreur lors de la création de gamme :', error);
            }
        }

        createMachine(libelle, prix, type, qte,  id_user);
        return 'ok';
    }
    else{
        return 'Nom de gamme déjà pris.';
    }

}

exports.isExisting = async (libelle) => {

    const gamme = await sequelize.query('SELECT libelle from gammes where libelle =  :libelle', { replacements: { libelle }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return gamme;
}

exports.modifGamme = async (id, libelle, prix, type,qte,  id_user) =>{

    try{
        const machine = await sequelize.query(`UPDATE gammes 
                                            SET libelle= :libelle, prix = :prix, "type" = :type, "qte" = :qte , id_user = :id_user
                                            WHERE id_gamme = :id;`,
            { replacements: { libelle, prix , type,qte,  id_user, id}})
            .then(([results, metadata]) => {
                 //console.log("Modification de gamme effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de gamme.'
    }

}

exports.suppGamme = async (id) => {
    try{
        await Gamme.destroy({ where: { id_gamme : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return 'Erreur lors de la suppression de gamme.'
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
    type = '%' + type + '%';
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  lower(type) like lower(:type)
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
                                            where  LOWER(libelle) like  LOWER(:nom)
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
exports.getByNameAndType = async (nom, type) => {
    nom = '%' + nom + '%';
    type = '%' + type + '%';
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, users.id_user, users.login
                                            from gammes, users
                                            where  LOWER(libelle) like  LOWER(:nom)
                                            and  LOWER(type) like  LOWER(:type)
                                            and gammes."id_user" = users."id_user"`, { replacements: { nom, type }})
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