// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();

const { User, Organisation, Brief, Keyword, OrganisationUser } = require('../../models');

// **********************************************************************************
// Debug
router.get('/', async (req, res) => {
    try {
        const briefData = await Brief.findAll({
            include: [
                {
                    model: User,
                    attributes: ['last_name', 'first_name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const projectBriefs = briefData.map((brief) => brief.get({ plain: true }));
        console.log(projectBriefs)

        res.render('debug', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            briefs: projectBriefs,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
