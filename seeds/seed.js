const sequelize = require('../config/connection');
// const { User, Brief, Keyword, Organisation } = require('../models');

const { User, Organisation, Brief, Keyword } = require('../models');

const userData = require('./data/userData.json');
const briefData = require('./data/briefData.json');
const organisationData = require('./data/organisationData.json');
const keywordData = require('./data/keywordData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    
    const organisations = await Organisation.bulkCreate(organisationData);
    const keywords = await Keyword.bulkCreate(keywordData);
    const briefs = await Brief.bulkCreate(briefData);
    
    process.exit(0);
};

seedDatabase();
