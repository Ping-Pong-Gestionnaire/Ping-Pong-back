const LigneC = require('../datamodel/ligneCommandeAchat.model');
const CommandeA = require('../datamodel/commandeAchat.model');
const {sequelize} = require("../datamodel/db")


exports.createCommande= async ( statut, datelivPrev, dateLivReel, id_fourn ) => {
    async function createCommande( statut, datelivPrev, dateLivReel, id_fourn ) {
        try {

            const newFourn = await CommandeA.create({ statut: statut, "dateLivPrev": datelivPrev, "dateLivReel": dateLivReel, id_fourn: id_fourn  });

        } catch (error) {
            console.error('Erreur lors de la création de fournisseur :', error);
        }
    }

    createCommande(  statut, datelivPrev, dateLivReel, id_fourn);
    return 'ok';

}

exports.modifCommande = async (id, statut, datelivPrev, dateLivReel, id_fourn) =>{

    try{
        const ligne = await sequelize.query(`UPDATE "commandesA" 
                                            SET statut= :statut, "dateLivPrev"= :datelivPrev, "dateLivReel"= :dateLivReel, id_fourn= :id_fourn
                                            WHERE id_commande = :id;`,
            { replacements: { statut, datelivPrev, dateLivReel, id_fourn, id}})
            .then(([results, metadata]) => {
                //console.log("Modification de gamme effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de gamme.'
    }

}

exports.suppCommande = async (id) => {
    try{
        await CommandeA.destroy({ where: { id_commande : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return 'Erreur lors de la suppression de gamme.'
    }

};

exports.getAll = async () => {
    try{
        const commande = await CommandeA.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return commande;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les fournisseurs."
    }

}
exports.getOne = async (id) => {
    try{
        const commande = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", id_fourn
                                            from "commandesA"
                                            where  id_commande = :id `, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        return commande;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur le fournisseurs."
    }


}

exports.getById = async (id) => {

    try{
        const ligne = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", id_fourn
                                            from "commandesA"
                                            where  id_commande = :id
                                            ORDER BY
                                                 "createdAt"`, { replacements: { id }})
            .then(([results, metadata]) => {
                return results;
            });
        return ligne;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de fournisseurs" + error)
        return "Erreur lors de la demande d'information sur le fournisseur."
    }
}

exports.getByStatut = async (statut) => {
    statut = '%' + statut + '%';

    try{
        const ligne = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", id_fourn
                                            from "commandesA"
                                            where  lower(statut) like :statut 
                                            ORDER BY
                                                 "createdAt"`, { replacements: { statut }})
            .then(([results, metadata]) => {
                return results;
            });
        return ligne;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de fournisseurs" + error)
        return "Erreur lors de la demande d'information sur le fournisseur."
    }
}