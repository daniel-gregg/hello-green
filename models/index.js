const User = require('./user');
const Brief = require('./brief');
const Collaborator = require('./collaborator');
// const Organisation = require('./organisation');
// const Image = require('./image');
// const Keyword = require('./keyword');
// const OrganisationUser = require('./organisationUser');
// const BriefKeyword = require('./briefKeyword');

User.hasMany(Brief);
Brief.belongsTo(User, { foreignKey: 'owner_id' });

Brief.belongsToMany(User, { through: Collaborator, foreignKey: 'brief_id' });
User.belongsToMany(Brief, { through: Collaborator, foreignKey: 'user_id' });




// image_id: {
//     type: DataTypes.INTEGER,
//     references: {
//         model: 'images',
//         key: 'id',
//     },


module.exports = {
    User,

    // Image,
    // Organisation,
    Brief,
    // Keyword,
    // OrganisationUser,
    // BriefKeyword,
    Collaborator,
};
