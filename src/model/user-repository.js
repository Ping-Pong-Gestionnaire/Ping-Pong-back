const User = require('../datamodel/user.model');
const {sequelize} = require("../datamodel/db")
const bcrypt = require('bcryptjs');
const md5 = require('md5');


exports.createUsers = async (login, mdp) => {
    const  sel = bcrypt.genSaltSync(12);
    const mdphash = bcrypt.hashSync(mdp , sel);

    const user = await this.loginUsers(login);

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
        return 'logindejause';
    }

}

exports.loginUsers = async (login) => {

    const user = await sequelize.query(`SELECT id_user, login, mdp  
                                            from users 
                                            where  login = "${login}" `)
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
    }

}

exports.getUsers = async () => {
    return await User.findAll();
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
