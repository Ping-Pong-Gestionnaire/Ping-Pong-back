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
        const operation = await Operation.findAll();
        //console.log('All poste:', JSON.stringify(postes, null, 2));
        return operation;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les operations."
    }

}
exports.getOne = async (id) => {
    try{
        const operation = await sequelize.query(`SELECT id_operation, libelle, "tempsRea", description, operations.id_machine, operations.id_poste, machines.nom as nommachine, postes.nom as nomposte
                                            from operations, machines, postes
                                            where  id_operation  = :id 
                                            and machines."id_machine" = operations."id_machine"
                                            and postes."id_poste" = operations."id_poste"`, { replacements: { id }})
            .then(([results, metadata]) => {
                return results[0];
            });
        console.log("operation = " + operation);
        return operation;
    }
    catch(error){
        console.log("Erreur sur la demande d'info d'operation" + error)
        return "Erreur lors de la demande d'information sur l'operation."
    }


}

exports.getByName = async (nom) => {
    nom = '%' + nom + '%';
    try{
        const operation = await sequelize.query(`SELECT id_operation, libelle, "tempsRea", description, operations.id_machine, operations.id_poste, machines.nom as nommachine, postes.nom as nomposte
                                            from operations, machines, postes
                                            where  operations.libelle like  :nom
                                            and machines."id_machine" = operations."id_machine"
                                            and postes."id_poste" = operations."id_poste"`, { replacements: { nom }})
            .then(([results, metadata]) => {
                return results;
            });
        console.log("operation = " + operation);
        return operation;
    }
    catch(error){
        console.log("Erreur sur la demande d'info d'operation" + error)
        return "Erreur lors de la demande d'information sur l'operation."
    }


}