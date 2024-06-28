const ListeMachinePoste = require('../datamodel/listeMachinePoste.model');

exports.createOperation= async (id_machine,  id_poste) => {

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