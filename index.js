const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, "binary", (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

async function route(url) {
    let view = '404.html';
    switch (url) {
        case '/':
            view = 'index.html';
            break;
        case '/index':
            view = 'index.html';
            break;
        case '/todo':
            view = 'todo.html';
            break;
        case '/404':
            view = '404.html';
            break;
        default:
            break;
    }
    let html = await render(view);
    return html;
}

app.use( async (ctx) => {
    let url = ctx.request.url;
    let html = await route(url);
    ctx.body = html;
});


function getSyncTime() {
    return new Promise((resolve, reject) => {
        try {
            let startTime = new Date().getTime();
            setTimeout(() => {
                let endTime = new Date().getTime();
                let data = endTime - startTime;
                resolve(data);
            }, 500);
        } catch (err) {
            reject(err)
        }
        })
}

async function getSyncData() {
    let time = await getSyncTime();
    let data = `entTime - startTime=${time}`;
    return data;
}

async function getData() {
    let data = await getSyncData();
    console.log(data)
}


app.listen(3000, ()=> {
    console.log('the server is starting at port 3000');
});