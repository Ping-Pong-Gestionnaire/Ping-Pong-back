const Fournisseur = require('../datamodel/fournisseur.model');
const {sequelize} = require("../datamodel/db")



exports.createFourn= async ( nom, tel ,email) => {

    const founr = await this.isExisting(nom);

    if( founr === undefined ){
        async function createFounr(nom, tel, email) {
            try {

                const newFourn = await Fournisseur.create({ nom : nom, tel: tel, email: email });

            } catch (error) {
                console.error('Erreur lors de la création de fournisseur :', error);
            }
        }

        createFounr( nom, tel ,email);
        return 'ok';
    }
    else{
        return 'Nom de fournisseur déjà pris.';
    }

}

exports.isExisting = async (nom) => {

    const fourn = await sequelize.query('SELECT nom from fournisseurs where nom =  :nom', { replacements: { nom }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return fourn;
}

exports.modifFourn = async (id, nom, tel, email) =>{

    try{
        const fourn = await sequelize.query(`UPDATE fournisseurs 
                                            SET nom= :nom, tel = :tel, email = :email
                                            WHERE id_fourn = :id;`,
            { replacements: {nom, tel , email, id}})
            .then(([results, metadata]) => {
                //console.log("Modification de gamme effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de gamme.'
    }

}

exports.suppFourn = async (id) => {
    try{
        await Fournisseur.destroy({ where: { id_fourn : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return 'Erreur lors de la suppression de gamme.'
    }

};

exports.getAll = async () => {
    try{
        const fourn = await Fournisseur.findAll({
            order: [
                ['nom', 'ASC'],  // Ordre décroissant par createTime
                   // Ordre décroissant par updateTime
            ]
        });
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return fourn;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les fournisseurs."
    }

}
exports.getOne = async (id) => {
    try{
        const fourn = await sequelize.query(`SELECT id_fourn, nom, tel, email
                                            from fournisseurs
                                            where  id_fourn = :id `, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        return fourn;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur le fournisseurs."
    }


}

exports.getByName = async (nom) => {
    nom = '%' + nom + '%';
    try{
        const fourn = await sequelize.query(`SELECT id_fourn, nom, tel, email
                                            from fournisseurs
                                            where  lower(nom) like lower(:nom)
                                            ORDER BY
                                                 nom`, { replacements: { nom }})
            .then(([results, metadata]) => {
                return results;
            });
        return fourn;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de fournisseurs" + error)
        return "Erreur lors de la demande d'information sur le fournisseur."
    }


}

exports.getGamme = async (id) => {
    try{
        const gamme = await sequelize.query(`SELECT id_gamme, libelle, prix, type, qte, id_fourn
                                            from gammes
                                            where  id_fourn = :id`, { replacements: { id }})
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