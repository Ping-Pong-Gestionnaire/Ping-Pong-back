const User = require('../datamodel/user.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require('bcryptjs');
const md5 = require('md5');


exports.createUsers = async (login, mdp) => {
    const  sel = bcrypt.genSaltSync(12);
    const mdphash = bcrypt.hashSync(mdp , sel);

    const user = await this.isUser(login);
    console.log(user)
    if( user === undefined ){
        async function createUser(login, mdphash) {
            try {
                const newUser = await User.create({ login, mdp: mdphash });
                console.log('New user created:', newUser);
            } catch (error) {
                console.error('Error creating new user:', error);
            }
        }

        createUser(login, mdphash);
        return 'ok';
    }
    else{
        return 'Login déjà pris.';
    }

}

exports.isUser = async (nom_uti) => {

    const user = await sequelize.query('SELECT id_user, login, mdp from users where login =  :nom_uti', { replacements: { nom_uti }})
        .then(([results, metadata]) => {
            return results[0];
        });

    return user;
}


exports.modifUsers = async (id, mdp) =>{

    try{
        const  sel = bcrypt.genSaltSync(12);
        const mdphash = bcrypt.hashSync(mdp , sel);

        const user = await sequelize.query(`UPDATE users 
                                            SET mdp = '${mdphash}'
                                            WHERE id_user = ${id};`)
            .then(([results, metadata]) => {
                console.log("Modification effectuée.", results);
            });

        return 'ok';
    } catch (error) {
        console.error('Erreur lors de la modification :', error);
        return 'Erreur lors de la modification.'
    }

}

exports.suppUser = async (id_user) => {
    try{
        await User.destroy({ where: { id_user } });
        return 'ok'
    }catch(error){
        console.error('Erreur lors de la suppression de compte :', error);
        return 'Erreur lors de la suppression de compte.'
    }

};

exports.getAll = async () => {
    try{

        // Find all users
        const users = await User.findAll();
        console.log('All users:', JSON.stringify(users, null, 2));
        return users;
    }
    catch(error){
        return "Erreur lors de la demande d'information sur les compte" + error
    }

}
exports.getOne = async (id) => {
    try{
        const user = await sequelize.query(`SELECT id_user, login, mdp, nom, prenom,  email 
                                            from users 
                                            where  id_user = ${id} `)
            .then(([results, metadata]) => {
                return results[0];
            });
        console.log("user = " + user);
        return user;
    }
    catch(error){
        return "Erreur lors de la demande d'information."
    }


}



/*
exports.createUser = async (login, mdp) => {
    if(mdp == "" || login =="")
    {
        return "Merci de renseigner tous les champs."
    }else{
        const hashedPassword = generateHashedPassword(mdp);
        const user = login;
        user.id_user = uuid.v4();
        user.mdp = hashedPassword;
        await User.create(user);
        return "ok"
    }
};

exports.getUserByNom = async (nom_user) => {
    return await User.findOne({where : {nom_user}});
}

exports.createUser = async (body) => {
    const hashedPassword = generateHashedPassword(body.mdp_user);
    const user = body;
    user.id_user = uuid.v4();
    user.mdp_user = hashedPassword;
    await User.create(user);
};

exports.updateUser = async (id_user, data) => {
    const foundUser = await User.findOne({ where: { id_user } });

    if (!foundUser) {
        throw new Error('Pas de user');
    }

    await User.update(
        {
            label_user: data.label_user || foundUser.label_user,
            mdp_user: data.mdp_user ? generateHashedPassword(data.mdp_user) : foundUser.mdp_user,
        },
        { where: { id_user } },
    );
};


exports.deleteUser = async (id_user) => {
    await User.destroy({ where: { id_user } });
};

 */
