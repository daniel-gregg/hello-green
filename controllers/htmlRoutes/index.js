// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();
const { User, Organisation, Brief, Keyword, OrganisationUser, Image } = require('../../models');
const { findByPk } = require('../../models/image');

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
                {
                    model: User,
                    attributes: ['prefix', 'first_name', 'last_name'],
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

// Here we've add our isAuthenticated middleware to this route.
// User can update their owned project briefs
router.get('/brief/:briefId/edit', async (req, res) => {  //withAuth, add this in after the first argument when ready
    try {
        const briefData = await Brief.findByPk(req.params.briefId);
        const brief = await briefData.get({ plain: true })

        const image = await Image.findByPk(brief.image_id)

        console.log(brief)
        console.log(image.dataValues.path)

        res.render('briefForm', {
            brief,
            type: 'edit',
            imagepath: image.dataValues.path,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err)
    }

})

//Add new brief:
router.get('/brief/new', withAuth, async (req, res) => {  //withAuth, add this in after the first argument when ready
    try {

        
        res.render('briefForm', {
            new: true,
            type: 'new',
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch(err) {
        console.log(err)
    }

})

router.get('/dashboard', withAuth, async (req, res) => {  //withAuth, add this in after the first argument when ready
    try {

        const briefData = await Brief.findAll({
            where: {
                'owner_id': req.session.user.id
            },
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });

        // Serialize data so the template can read it
        const briefs = briefData.map((brf) => brf.get({ plain: true }));

        res.render('dashboard', {
            briefs: briefs,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.log(err);
    }
});


//Update bio:
router.get('/bio/edit', withAuth, async (req, res) => {  //withAuth, add this in after the first argument when ready
    console.log(req.session.user)

    //Find image for avatar from images using user.image_id
    const image = await Image.findByPk(req.session.user.image_id)

    //Find organisation using user.id

    try {
        res.render('bioupdate', {
            imagepath: image.dataValues.path,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch(err) {
        console.log(err)
    }

})

//Update bio:
router.put('/bio/edit', withAuth, async (req, res) => {  //withAuth, add this in after the first argument when ready
    console.log(req.session.user.id)

    const result = await User.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            organisation: req.body.organisation,
            text: req.body.text,
        },
        {where: {id: req.session.user.id}},
      )
      
     })


//withAuth, add this in after the first argument when ready
router.get('/login', async (req, res) => {
    res.render('login');

});


router.get('/logout', async (req, res) => {
    req.session.loggedIn = false;
    req.session.user = null;
    res.redirect(200, '/');
});


module.exports = router;
