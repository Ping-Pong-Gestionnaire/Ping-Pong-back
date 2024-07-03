const LigneC = require('../datamodel/ligneCommandeAchat.model');
const CommandeA = require('../datamodel/commandeAchat.model');
const {sequelize} = require("../datamodel/db")


exports.createCommande= async ( statut, datelivPrev, dateLivReel, id_fourn, matricule ) => {
    async function createCommande( statut, datelivPrev, dateLivReel, id_fourn, matricule ) {
        try {

            const newFourn = await CommandeA.create({ statut: statut, "dateLivPrev": datelivPrev, "dateLivReel": dateLivReel, id_fourn: id_fourn, matricule: matricule  });

        } catch (error) {
            console.error('Erreur lors de la création de fournisseur :', error);
        }
    }

    createCommande(  statut, datelivPrev, dateLivReel, id_fourn, matricule);
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
        const commande = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", fournisseurs.id_fourn, nom, matricule
                                            from "commandesA" , fournisseurs
                                            where  id_commande = :id 
                                            and "commandesA".id_fourn = fournisseurs.id_fourn `, { replacements: { id }})
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

    id = '%' + id + '%';

    try{
        const ligne = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", id_fourn, matricule
                                            from "commandesA"
                                            where lower(matricule) like lower(:id)
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

exports.getByStatut = async (statut, fourn) => {
    if(statut == "0000"){
        statut = '%%';
    }
    else{
        statut = '%' + statut + '%';
    }

    if(fourn == "0000"){
        fourn = '%%';
    }
    else{
        fourn = '%' + fourn + '%';
    }


    try{
        const ligne = await sequelize.query(`SELECT id_commande,  statut, "dateLivPrev", "dateLivReel", fournisseurs.id_fourn, nom
                                            from "commandesA", fournisseurs
                                            where  lower(statut) like lower(:statut)
                                            and "commandesA".id_fourn = fournisseurs.id_fourn
                                            and lower(fournisseurs.nom ) like lower(:fourn)
                                            ORDER BY
                                                 "commandesA"."createdAt"`, { replacements: { statut, fourn }})
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

exports.getByMois = async (mois) => {

    try{
        const ligne = await sequelize.query(`SELECT id_commande, statut, "dateLivPrev", "dateLivReel", fournisseurs.id_fourn, nom, matricule
                                             FROM "commandesA"
                                                      JOIN fournisseurs ON "commandesA".id_fourn = fournisseurs.id_fourn
                                             WHERE DATE_TRUNC('month', "commandesA"."updatedAt") = DATE_TRUNC('month', TO_DATE(:mois, 'YYYY-MM-DD'))
                                               AND statut != 'En cours'
                                             ORDER BY "dateLivPrev"`, { replacements: { mois }})

            .then(([results, metadata]) => {
                return results;
            });
        return ligne;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de fournisseurs" + error)
        return "Erreur lors de la demande d'information sur les lignes commandes."
    }
}

