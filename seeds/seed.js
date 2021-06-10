const sequelize = require('../config/connection');
// const { User, Brief, Keyword, Organisation } = require('../models');

const { User, Brief, Collaborator } = require('../models');

const userData = require('./data/userData.json');
const briefData = require('./data/briefData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const organisations = await Organisation.bulkcreate(organisationsData);
    const briefs = await Brief.bulkCreate(briefData);
    const keywords = await Keyword.bulkcreate(keywordData);

    process.exit(0);
};

seedDatabase();
