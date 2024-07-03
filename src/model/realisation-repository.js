const {sequelize} = require("../datamodel/db")
const Operation = require("../datamodel/operation.model");
const Realisation = require("../datamodel/realisation.model");
const Poste = require("../datamodel/poste.model");

exports.createRealisation= async ( tempsRea, date, id_machine,  id_poste,  id_user, id_operation) => {

    async function createOperation(tempsRea, date,  id_machine, id_poste, id_user, id_operation ) {
        try {

            const rea= await Realisation.create({
                tempsRea : tempsRea, date: date, id_machine: id_machine, id_poste: id_poste, id_operation :id_operation,  id_user : id_user
            });

        } catch (error) {
            console.error("Erreur lors de la création de l'opération :", error);
        }
    }

    createOperation(tempsRea, date,  id_machine, id_poste, id_user, id_operation);
    return 'ok';


}

exports.getAll = async () => {

    try{
        const operation = await sequelize.query(`SELECT realisations."tempsRea",
                                                            date, 
                                                            id_realisation, 
                                                            machines.nom as "nomMachine",
                                                            postes.nom as "nomPoste",
                                                            users.login as user,
                                                            operations.libelle as nomOperation
                                            from realisations, users, postes, machines, operations
                                            where realisations.id_poste = postes.id_poste
                                            and realisations.id_machine = machines.id_machine
                                            and realisations.id_user = users.id_user
                                            and realisations.id_operation = operations.id_operation
                                            order by realisations.date desc`)
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


