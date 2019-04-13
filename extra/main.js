// var puppeteer = require('./node_modules/puppeteer/index');
// var fs = require('./node_modules/fs-extra');
// const hbs = require('handlebars')
// const path = require('path')
// const data = require('./database.json')
// const moment = require('moment')

// const compile = async (templateName) => {
//     const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//     const html = await fs.readFile(filePath, 'utf-8')
//     return hbs.compile(html)(data)
// }

// // hbs.registerHelper('dateFormat', function(value, format){
// //     return moment(value).formart(format)
// // })

// (async () => {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();

//         const content = await compile('invoice', data)

//         await page.setContent(content);
//         await page.emulateMedia('screen');
//         await page.pdf({
//             path: 'incoice.pdf',
//             format: 'A4',
//             printBackground: true
//         })

//         console.log('done')
//         await browser.close();
//         process.exit();
//     } catch(e){
//         console.log('our error', e)
//     }
// })();