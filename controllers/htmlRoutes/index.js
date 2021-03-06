// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();
const { User, Organisation, Brief, Keyword, OrganisationUser, Image } = require('../../models');
const { briefsCardInfo, usersCardInfo, orgsCardInfo, userInfoByPk } = require('../../utils/cardsDataQueries');
const { findByPk } = require('../../models/image');

router.get('/', async (req, res) => {
    try {
        res.render('index', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            briefs: await briefsCardInfo({ limit: 3 }),
            users: await usersCardInfo({ limit: 3 }),
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/users', async (req, res) => {
    try {
        res.render('users', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            users: await usersCardInfo(),
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
            briefs: await briefsCardInfo(),
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/organisations', async (req, res) => {
    try {
        res.render('organisations', {
            user: req.session.user,
            loggedIn: req.session.loggedIn,
            organisations: await orgsCardInfo(),
        });
    } catch (err) {
        console.log(err);
    }
});

// Here we've add our isAuthenticated middleware to this route.
// User can update their owned project briefs
router.get('/brief/:briefId/edit', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready
    try {
        const briefData = await Brief.findByPk(req.params.briefId);
        const brief = await briefData.get({ plain: true });
        const image = await Image.findByPk(brief.image_id);

        res.render('briefForm', {
            brief,
            type: 'edit',
            imagepath: image.dataValues.path,
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/brief/:briefId/', async (req, res) => {
    try {
        const briefData = await Brief.findByPk(req.params.briefId, {
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

        res.render('briefOverview', {
            brief: await briefData.get({ plain: true }),
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
});

//Add new brief:
router.get('/new', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready
    try {
        res.render('briefForm', {
            type: 'new',
            user: req.session.user,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready
    try {
        console.log(req.session.user);
        const briefData = await Brief.findAll({
            where: {
                owner_id: req.session.user.id,
            },
            include: [
                {
                    model: Image,
                    attributes: ['path', 'description'],
                },
            ],
        });
        console.log(req.session.user);
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
router.get('/bio/edit', withAuth, async (req, res) => {
    const userInfo = await userInfoByPk(req.session.user.id);

    try {
        res.render('bioupdate', {
            user: userInfo,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
    }
});

//Update bio:
router.put('/bio/edit', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready
    console.log(req.session.user.id);
    console.log('getting to the put stage...');
    console.log(req.body);

    const result = await User.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            organisation: req.body.organisation,
            text: req.body.text,
        },
        { where: { id: req.session.user.id } }
    );

    res.status(200).json(result);
});

//Update brief:
router.put('/brief/:briefId/edit', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready

    const result = await Brief.update(
        {
            title: req.body.title,
            shortSummary: req.body.shortSummary,
            summary: req.body.summary,
            content: req.body.content,
        },
        { where: { id: req.body.briefId } }
    );
    res.status(200).json(result);
});

//Post new brief:
router.post('/brief/new', withAuth, async (req, res) => {
    //withAuth, add this in after the first argument when ready

    const result = await Brief.create({
        title: req.body.title,
        shortSummary: req.body.shortSummary,
        summary: req.body.summary,
        content: req.body.content,
        owner_id: req.session.user.id,
    });

    res.status(200).json(result);
});

//withAuth, add this in after the first argument when ready
router.get('/login', async (req, res) => {
    res.render('login');
});

// Route for logging user out
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
