const Koa = require('koa');
const app = new Koa();

app.use( async (ctx) => {
    let url = ctx.request.url;
    ctx.body = `<h1>hello koa</h1><p>${url}</p>`;
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

getData();

app.listen(3000);