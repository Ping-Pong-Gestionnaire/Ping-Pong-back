const ListeMachinePoste = require('../datamodel/listeMachinePoste.model');
const Habilitation = require("../datamodel/habilitation.model");
const {sequelize} = require("../datamodel/db");

exports.createListeMP= async (id_machine,  id_poste) => {

    async function createOperation(  id_machine, id_poste) {
        try {

            const newMachine = await ListeMachinePoste.create({  "machineIdMachine": id_machine,  "posteIdPoste" : id_poste });

        } catch (error) {
            console.error("Erreur lors de la création de la listeMachinePoste :", error);
        }
    }
    createOperation( id_machine, id_poste);
    return 'ok';

}

exports.suppListeMP = async (id_machine, id_poste) => {
    try{
        await ListeMachinePoste.destroy({ where: { "machineIdMachine": id_machine,  "posteIdPoste" : id_poste } });
        return 'ok'
    }catch(error){
        console.error("Erreur lors de la suppression de la listeMP :", error);
        return "Erreur lors de la suppression de l'habilitation."
    }

};

