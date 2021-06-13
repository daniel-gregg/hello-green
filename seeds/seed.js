const sequelize = require('../config/connection');
// const { User, Brief, Keyword, Organisation } = require('../models');

const { User, Organisation, Brief, Keyword, OrganisationUser } = require('../models');

const userData = require('./data/userData.json');
const briefData = require('./data/briefData.json');
const organisationData = require('./data/organisationData.json');
const keywordData = require('./data/keywordData.json');

const organisationUserData = require('./data/organisationUserData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const organisations = await Organisation.bulkCreate(organisationData);
    const keywords = await Keyword.bulkCreate(keywordData);
    const briefs = await Brief.bulkCreate(briefData);

    const userOrg = await OrganisationUser.bulkCreate(organisationUserData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
