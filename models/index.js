const Image = require('./image');

const User = require('./user');
const Brief = require('./brief');
const Organisation = require('./organisation');
const Keyword = require('./keyword');
const OrganisationUser = require('./organisationUser');


Image.hasOne(Organisation, {
    foreignKey: 'image_id',
    onDelete: 'CASCADE',
});
Organisation.belongsTo(Image, { foreignKey: 'image_id', });

Image.hasOne(Brief, {
    foreignKey: 'image_id',
    onDelete: 'CASCADE',
});
Brief.belongsTo(Image, { foreignKey: 'image_id', });

Image.hasOne(User, {
    foreignKey: 'image_id',
    onDelete: 'CASCADE',
});
User.belongsTo(Image, { foreignKey: 'image_id', });



User.hasMany(Brief);
Brief.belongsTo(User, { foreignKey: 'owner_id' });

//  these models are implicity defined by the through tables
// BriefKeyword: sequelize.models.brief_keyword 
// Collaborator: sequelize.models.collaborators 

Brief.belongsToMany(User, { through: 'collaborators', foreignKey: 'brief_id' });
User.belongsToMany(Brief, { through: 'collaborators', foreignKey: 'user_id' });

Brief.belongsToMany(Keyword, { through: 'brief_keyword', foreignKey: 'brief_id' });
Keyword.belongsToMany(Brief, { through: 'brief_keyword', foreignKey: 'kw_id' });

User.belongsToMany(Organisation, { through: OrganisationUser, foreignKey: 'user_id' });
Organisation.belongsToMany(User, { through: OrganisationUser, foreignKey: 'org_id' });

module.exports = {
    Image,
    User,
    Organisation,
    Brief,
    Keyword,
    OrganisationUser,
};
