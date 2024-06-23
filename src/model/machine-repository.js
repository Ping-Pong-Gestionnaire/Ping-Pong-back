const Machine = require('../datamodel/machine.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require("bcryptjs");
const Poste = require("../datamodel/poste.model");


exports.createMachine= async (nom, id_poste) => {

    const machine = await this.isExisting(nom);
    console.log(machine)

    if( machine === undefined ){
        async function createMachine(nom, id_poste) {
            try {
                if(id_poste === ""){
                    const newMachine = await Machine.create({ nom : nom });
                }
                else{
                    const newMachine = await Machine.create({ nom : nom, id_poste : id_poste });
                }

            } catch (error) {
                console.error('Erreur lors de la création de machineeee :', error);
            }
        }

        createMachine(nom, id_poste);
        return 'ok';
    }
    else{
        return 'Nom de machine déjà pris.';
    }

}

exports.isExisting = async (nom) => {

    const machine = await sequelize.query('SELECT nom from machines where nom =  :nom', { replacements: { nom }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return machine;
}

exports.modifMachine = async (id, nom, id_poste) =>{

    try{
        const machine = await sequelize.query(`UPDATE machines 
                                            SET nom= :nom, id_poste = :id_poste
                                            WHERE id_machine = :id;`,
            { replacements: { nom, id_poste , id}})
            .then(([results, metadata]) => {
                // console.log("Modification de poste effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de machine.'
    }

}
exports.suppPosteMachine = async (id) =>{

    try{
        const machine = await sequelize.query(`UPDATE machines 
                                            SET  id_poste = null
                                            WHERE id_machine = :id;`,
            { replacements: {id}})
            .then(([results, metadata]) => {
                console.log("Modification de poste effectuée.", results);
            });
        return 'ok';
    } catch (error) {
        //console.error('Erreur lors de la modification de machine:', error);
        return 'Erreur lors de la modification de machine.' + error
    }

}

exports.suppMachine = async (id) => {
    try{
        await Machine.destroy({ where: { id_machine : id } });
        return 'ok'
    }catch(error){
        //console.error('Erreur lors de la suppression de machine :', error);
        return 'Erreur lors de la suppression de machine.'
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
        const machine = await sequelize.query(`SELECT id_machine, machines.nom, machines.id_poste, postes.nom as nomposte
                                            from machines
                                            LEFT JOIN postes  ON machines.id_poste = postes.id_poste
                                            where  id_machine = :id`, { replacements: { id }})
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
exports.getSansPoste = async () => {
    try{
        const machine = await sequelize.query(`SELECT id_machine, nom, id_poste
                                            from machines 
                                            where  id_poste is null `)
            .then(([results, metadata]) => {
                return results;
            });
        console.log("machine = " + machine);
        return machine;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les machines."
    }

}

exports.getByName = async (nom) => {
    nom = '%' + nom + '%';
    try{
        const operation = await sequelize.query(`SELECT id_machine, nom, id_poste
                                                 from machines
                                                 where  lower(nom) like :nom  `, { replacements: { nom }})
            .then(([results, metadata]) => {
                return results;
            });
        console.log("machine = " + operation);
        return operation;
    }
    catch(error){
        console.log("Erreur sur la demande d'info machine" + error)
        return "Erreur lors de la demande d'information sur les machines."
    }

}