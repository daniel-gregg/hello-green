// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();

const { User, Organisation, Brief, Keyword, OrganisationUser, Image } = require('../../models');

// **********************************************************************************
// Debug
router.get('/', async (req, res) => {
    try {
        // const briefData = await Brief.findAll({
        //     include: [
        //         {
        //             model: User,
        //             attributes: ['last_name', 'first_name'],
        //         },
        //     ],
        // });

        const debugData = await Organisation.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });

        // Serialize data so the template can read it
        const debug = debugData.map((dbg) => dbg.get({ plain: true }));
        console.clear();
        console.log(debug);

        res.render('debug', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            organisations: debug,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
