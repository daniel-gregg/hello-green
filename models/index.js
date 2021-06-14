const User = require('./user');
const Brief = require('./brief');
const Organisation = require('./organisation');
const Keyword = require('./keyword');
const OrganisationUser = require('./organisationUser');

User.hasMany(Brief);
Brief.belongsTo(User, { foreignKey: 'owner_id' });

Brief.belongsToMany(User, { through: 'collaborators', foreignKey: 'brief_id' });
User.belongsToMany(Brief, { through: 'collaborators', foreignKey: 'user_id' });

Brief.belongsToMany(Keyword, { through: 'brief_keyword', foreignKey: 'brief_id' });
Keyword.belongsToMany(Brief, { through: 'brief_keyword', foreignKey: 'kw_id' });

User.belongsToMany(Organisation, { through: OrganisationUser, foreignKey: 'user_id' });
Organisation.belongsToMany(User, { through: OrganisationUser, foreignKey: 'org_id' });

module.exports = {
    User,

    // // Image,
    Organisation,
    Brief,
    Keyword,
    OrganisationUser,
    // // BriefKeyword,
    // Collaborator,
};
