const Revision = require('./revision');
const fetch = require('node-fetch');
const wikiEndpoint = 'https://en.wikipedia.org/w/api.php';

exports.get_new_revisions = async (title, timestamp) => {
    parameters = [
        'action=query',
        'format=json',
        'prop=revisions',
        'titles='+title,
        'rvstart='+timestamp,
        'rvdir=newer',
        'rvlimit=max',
        'rvprop=sha1|timestamp|parsedcomment|user|size|userid|ids|anon'
    ];

    const url = wikiEndpoint + '?' + parameters.join('&');

    const res = await fetch(url);
    const json = await res.json();
    pages = json.query.pages;
    return pages[Object.keys(pages)[0]].revisions;
}