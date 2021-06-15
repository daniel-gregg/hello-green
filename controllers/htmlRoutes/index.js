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

        const briefData = await Brief.findAll({
            limit: 4,
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });
        // Serialize data so the template can read it
        const briefs = briefData.map((brf) => brf.get({ plain: true }));

        const userData = await User.findAll({
            limit: 4,
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });
        // Serialize data so the template can read it
        const users = userData.map((u) => u.get({ plain: true }));

        res.render('index', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            briefs: briefs,
            users: users,
        });



    } catch (err) {
        console.log(err);
    }
});


router.get('/users', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });
        // Serialize data so the template can read it
        const users = userData.map((u) => u.get({ plain: true }));

        res.render('users', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            users: users,
        });
    } catch (err) {
        console.log(err);
    }
});



router.get('/briefs', async (req, res) => {
    try {

        const briefData = await Brief.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });

        // Serialize data so the template can read it
        const briefs = briefData.map((brf) => brf.get({ plain: true }));
        console.clear();
        console.log(briefs);

        res.render('briefs', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            briefs: briefs,
        });

    } catch (err) {
        console.log(err);
    }
});



router.get('/organisations', async (req, res) => {
    try {
        const orgData = await Organisation.findAll({
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });

        // Serialize data so the template can read it
        const organisations = orgData.map((o) => o.get({ plain: true }));
        console.clear();
        console.log(organisations);

        res.render('organisations', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            organisations: organisations,
        });

    } catch (err) {
        console.log(err);
    }
});




module.exports = router;
