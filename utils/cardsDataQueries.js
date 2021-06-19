const { User, Organisation, Brief, Keyword, OrganisationUser, Image } = require('../models/index');

// wrapper functions for data input for the handlebars partials. Since thise data is 
// being called in multiple places on the website; it makes sense to refactor these specific 
//  model queries out. 

const briefsCardInfo = async (options = {}) => {
    try {
        const briefData = await Brief.findAll({
            ...options,
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
                {
                    model: User,
                    attributes: ['prefix', 'first_name', 'last_name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const briefs = briefData.map((brf) => brf.get({ plain: true }));
        return briefs;
    } catch (err) {
        console.log(err);
    }
};

const usersCardInfo = async (options = {}) => {
    try {
        const userData = await User.findAll({
            ...options,
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });
        // Serialize data so the template can read it
        return userData.map((u) => u.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }
}


const orgsCardInfo = async (options = {}) => {

    try {
        const orgData = await Organisation.findAll({
            ...options,
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });

        // Serialize data so the template can read it
        return orgData.map((o) => o.get({ plain: true }));
    } catch (err) {
        console.log(err);
    }

}


module.exports = {
    briefsCardInfo,
    usersCardInfo,
    orgsCardInfo
};
