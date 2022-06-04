var fs = require('fs'),
    request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');


const url = 'https://motherless.com/GID5AF19B?page=5';
var img_url = 'https://cdn5-images.motherlessmedia.com/images/'


async function download(uri, filename, callback) {
    request.head(url, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);
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

        // await uri_list.map(async e => {
        //     console.log('attr', e.attribs);
        // })
        // && x.attribs.src.includes('-small')
        // uri_list.filter(x => x.attribs)
        //         .filter(y => y.attribs.hasOwnProperty('src') )
        //         .map(uri => {

        //     // let uri = "https://cdn5-thumbs.motherlessmedia.com/thumbs/6B84F76-small.jpg"
        //     
        // })


        // $('.desktop-thumb a img')[3]//.attribs.alt
        // const wikiUrls = $($('.desktop-thumb.medium a')[0] +' img')[1].attribs.src

        // for (let i = 0; i < 45; i++) {
        // wikiUrls.push($('big > a', html)[i].attribs.href);
        // }
        // console.log(wikiUrls);
        // console.log($.html());
    })
    .catch(function (err) {
        //handle error
        console.log('error', err);
    });




// download('https://cdn5-images.motherlessmedia.com/images/F8F520C.jpg', 'F8F520C.jpg', () => {
//     console.log('done');
// }, error => {
//     console.log('error download');
// });

// // 'https://cdn5-thumbs.motherlessmedia.com/thumbs/F008621-zoom.jpg'
// // 'https://cdn5-images.motherlessmedia.com/images/F008621.jpg'
// // 'https://cdn5-thumbs.motherlessmedia.com/thumbs/F8F520C-zoom.jpg'