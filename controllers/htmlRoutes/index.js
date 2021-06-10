// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
// Requiring our custom middleware for checking if a user is logged in
const withAuth = require('../../utils/withAuth');
const router = express.Router();

router.get('/', (req, res) => {
    projectBriefs = [
        {
        "imageUrl" : "https://picsum.photos/200",
        "imgDescription" : "A placeholder Image",
        "title": "Project Example 1",
        "date": "03/07/1984",
        "shortSummary": "This is wayyyyy to short for a summary!",
        "authors" : [
            {"firstName": "Daniel", "lastName": "Gregg", "owner": true},
            {"firstName": "Tim", "lastName": "McKeaveney", "owner": false},
            ],
        },
        {
        "imageUrl" : "https://picsum.photos/200",
        "imgDescription" : "A placeholder Image",
        "title": "Project Example 1",
        "date": "03/07/1984",
        "shortSummary": "This is wayyyyy to short for a summary!",
        "authors" : [
            {"firstName": "Daniel", "lastName": "Gregg", "owner": true},
            {"firstName": "Tim", "lastName": "McKeaveney", "owner": false},
            ],
        },
        {
        "imageUrl" : "https://picsum.photos/200",
        "imgDescription" : "A placeholder Image",
        "title": "Project Example 1",
        "date": "03/07/1984",
        "shortSummary": "This is wayyyyy to short for a summary!",
        "authors" : [
            {"firstName": "Daniel", "lastName": "Gregg", "owner": true},
            {"firstName": "Tim", "lastName": "McKeaveney", "owner": false},
            ],
        },
        ]

    peopleCards = [
        {
            "imageUrl" : "https://placeimg.com/640/480/people",
            "imgDescription" : "A person placeholder image",
            "prefix" : "Professor",
            "firstName": "Spaniel",
            "lastName": "Boone",
            "text": "Spaniel Boone is a frontierDog who wears a coonskin hat",
            "posts" : [
                {"title":"Brief1","date":"date1"},
                {"title":"Brief2","date":"date2"},
            ],
        },
        {
            "imageUrl" : "https://placeimg.com/640/480/people",
            "imgDescription" : "A person placeholder image",
            "prefix" : "Professor",
            "firstName": "Spaniel",
            "lastName": "Boone",
            "text": "Spaniel Boone is a frontierDog who wears a coonskin hat",
            "posts" : [
                {"title":"Brief1","date":"date1"},
                {"title":"Brief2","date":"date2"},
            ],
        },
        {
            "imageUrl" : "https://placeimg.com/640/480/people",
            "imgDescription" : "A person placeholder image",
            "prefix" : "Professor",
            "firstName": "Spaniel",
            "lastName": "Boone",
            "text": "Spaniel Boone is a frontierDog who wears a coonskin hat",
            "posts" : [
                {"title":"Brief1","date":"date1"},
                {"title":"Brief2","date":"date2"},
            ],
        },
    ]
    res.render('index', {
        user: req.session.user,
        loggedIn: req.session.loggedIn,
        briefs: projectBriefs,
        people: peopleCards,
    });
});

router.get('/login', (req, res) => {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
        res.redirect('/dashboard');
    }
    res.render('login', {
        user: req.session.user,
        loggedIn: req.session.loggedIn,
    });
});

// Route for logging user out
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204);
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

/* router.get('/signup', (req, res) => {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
        res.redirect('/dashboard');
    }
    res.render('signup', {
        user: req.session.user,
        loggedIn: req.session.loggedIn,
    });
}); */

/* // Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get('/dashboard', withAuth, (req, res) => {
    console.log(req.session.user);
    res.render('dashboard', {
        user: req.session.user,
        loggedIn: req.session.loggedIn,
    });
}); */

module.exports = router;
