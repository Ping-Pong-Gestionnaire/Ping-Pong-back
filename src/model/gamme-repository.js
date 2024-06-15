const Gamme = require('../datamodel/gamme.model');
const {sequelize} = require("../datamodel/db")
const Poste = require("../datamodel/poste.model");

// les types :
// PRE : matiere premiere
// VEN : vendable
// INT : intermédiare

exports.createGamme= async ( libelle, prix, type, id_user) => {

    const gamme = await this.isExisting(libelle);
    console.log(gamme)

    if( gamme === undefined ){
        async function createMachine(libelle, prix, type, id_user) {
            try {

                const newMachine = await Gamme.create({ libelle : libelle, prix: prix, type: type, id_user : id_user });

            } catch (error) {
                console.error('Erreur lors de la création de gamme :', error);
            }
        }

        createMachine(libelle, prix, type, id_user);
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

exports.modifGamme = async (id, libelle, prix, type, id_user) =>{

    try{
        const machine = await sequelize.query(`UPDATE gammes 
                                            SET libelle= :libelle, prix = :prix, "type" = :type, id_user = :id_user
                                            WHERE id_gamme = :id;`,
            { replacements: { libelle, prix , type, id_user, id}})
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