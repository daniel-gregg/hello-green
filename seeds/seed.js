const sequelize = require('../config/connection');

const { User, Organisation, Brief, Keyword, OrganisationUser } = require('../models');

const userData = require('./data/userData.json');
const briefData = require('./data/briefData.json');
const organisationData = require('./data/organisationData.json');
const keywordData = require('./data/keywordData.json');
const organisationUserData = require('./data/organisationUserData.json');

const collaboratorData = require('./data/collaboratorData.json');



const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const organisations = await Organisation.bulkCreate(organisationData);
    const keywords = await Keyword.bulkCreate(keywordData);
    const briefs = await Brief.bulkCreate(briefData);

    const userOrg = await OrganisationUser.bulkCreate(organisationUserData);

    const collaborators = await sequelize.models.collaborators.bulkCreate(collaboratorData);



    process.exit(0);
};

seedDatabase();
