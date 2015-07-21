var express = require('express');

var knex = require('./db/connect')();
var Treeize = require('treeize');

var app = express();

app.use(express.static('public'));

app.get('/api/users', function(req, res) {
    knex('users')
        .join('users_subreddits', 'users.id', 'users_subreddits.user_id')
        .join('subreddits', 'subreddits.id', 'users_subreddits.subreddit_id')
        .where('subreddits.name', 'like', '%hate')
        .select('users.name as name', 'subreddits.name as subreddits:name')
        .then(function(users) {
            var tree = new Treeize();
            users = tree.grow(users).getData();
            res.json(users);
        })
        .catch(function(err) {
            res.sendStatus(400);
        });
});

app.listen(8080, function() {
    console.log('Listening on http://localhost:8080');
});

