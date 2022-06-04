var fs = require('fs'),
    request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');


const url = '';
var img_url = ''


async function download(uri, filename, callback) {
    request.head(url, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


rp(url)
    .then(async function (html) {
        const $ = await cheerio.load(html);
        //success!
        const uri_list = await $('.thumb-container.image .desktop-thumb img.static')
        console.log('uri_list.length ', uri_list.length)
        for (let index = 0; index < uri_list.length; index++) {
            const element = uri_list[index];
                const single = element.attribs.src.split('/')
                const name = single[single.length - 1]
                console.log('name', name);
                await download(img_url + name, name, () => {
                    console.log('done', name);
                }, error => {
                    console.log('error download');
                });
        }
    })
    .catch(function (err) {
        console.log('error', err);
    });
