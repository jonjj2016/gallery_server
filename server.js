global.fetch = require('node-fetch');
const config = require('universal-config');
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const express = require('express');
var cors = require('cors');

const unsplash = new Unsplash({
    accessKey: '0b324f67b9dec587c38b4dda215760d30f46f7b52f7b3a91a1c85d8881ac5847',
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/photos', (req, res) => {
    let search = req.query.start == 1 ? 'random' : req.query.searchField;
    if (req.query.start == 1 && !req.query.searchField) {
        search = 'random';
    } else if (!req.query.searchField) {
        search = 'random';
    } else {
        search = req.query.searchField;
    }

    unsplash.search
        .photos(search, req.query.start || 1, req.query.count || 10)
        .then(toJson)
        .then((json) => {
            res.json(json);
        });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`app is runing on port ${PORT}`);
});