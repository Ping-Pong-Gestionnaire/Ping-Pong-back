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
        const rea = await Realisation.findAll();
        return rea;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les postes."
    }

}


