const sequelize = require('../config/connection');
// const { User, Brief, Keyword, Organisation } = require('../models');

const { User } = require('../models');

const userData = require('./data/userData.json');
// const briefData = require('./data/briefData.json');

// const keywordData = require('./data/keywordData.json');
// const organisationsData = require('./data/organisationsData.json');
// const projectData = require('./projectData.json');



const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });


    // const organisations = await Organisation.bulkcreate(organisationsData);
    // const briefs = await Brief.bulkcreate(briefData);
    // const keywords = await Keyword.bulkcreate(keywordData);

    // for (const project of projectData) {
    //     await Project.create({
    //         ...project,
    //         user_id: users[Math.floor(Math.random() * users.length)].id,
    //     });
    // }

    process.exit(0);
};


seedDatabase();
