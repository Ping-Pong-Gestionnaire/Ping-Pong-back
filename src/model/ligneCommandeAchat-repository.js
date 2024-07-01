const Fournisseur = require('../datamodel/fournisseur.model');
const LigneC = require('../datamodel/ligneCommandeAchat.model');
const {sequelize} = require("../datamodel/db")


exports.createLigne= async ( libelle, qte, prix , id_gamme, id_commande ) => {
    async function createLigne(libelle, qte, prix , id_gamme, id_commande) {
        try {

            const newFourn = await LigneC.create({ libelle: libelle,qte: qte,prix: prix , id_gamme: id_gamme, id_commande: id_commande });

        } catch (error) {
            console.error('Erreur lors de la création de fournisseur :', error);
        }
    }

    createLigne( libelle, qte, prix , id_gamme, id_commande);
    return 'ok';

}

exports.modifLigne = async (id, libelle, qte, prix , id_gamme, id_commande) =>{

    try{
        const ligne = await sequelize.query(`UPDATE "lignescommandesA" 
                                            SET libelle= :libelle,qte= :qte,prix= :prix , id_gamme= :id_gamme, id_commande= :id_commande
                                            WHERE id_ligne = :id;`,
            { replacements: {libelle, qte, prix , id_gamme, id_commande, id}})
            .then(([results, metadata]) => {
                //console.log("Modification de gamme effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de gamme.'
    }

}

exports.suppLigne = async (id) => {
    try{
        await LigneC.destroy({ where: { id_ligne : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return 'Erreur lors de la suppression de gamme.'
    }

};

exports.getAll = async () => {
    try{
        const ligne = await LigneC.findAll({
            order: [
                ['libelle', 'ASC'],  // Ordre décroissant par createTime
                // Ordre décroissant par updateTime
            ]
        });
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return ligne;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les fournisseurs."
    }

}
exports.getOne = async (id) => {
    try{
        const ligne = await sequelize.query(`SELECT id_ligne, libelle, qte, prix , id_gamme, id_commande
                                            from "lignescommandesA"
                                            where  id_ligne = :id `, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        return ligne;
    }
    catch(error){
        console.log("Erreur sur la demande d'info de gamme" + error)
        return "Erreur lors de la demande d'information sur le fournisseurs."
    }


}

exports.getByCommande = async (id) => {
    try{
        const ligne = await sequelize.query(`SELECT id_ligne, libelle, qte, prix , id_gamme, id_commande
                                            from "lignescommandesA"
                                            where  id_commande = :id
                                            ORDER BY
                                                 id_ligne`, { replacements: { id }})
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