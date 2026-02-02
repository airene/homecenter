import { Hono } from 'hono'
import { cors } from 'hono/cors'
import conf from './config.toml'
import { ddns } from './ddns.js'
import * as wol from './wakeonlan.js'
import { getWanIP } from './utils.js'
import { getNetworkTraffic } from './wireguard.js'

const app = new Hono()
app.use('/*', cors())
app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.get('/ipInfo', async (c) => {
    return c.json({ status: 'success', data: { ip: await getWanIP(), traffic: await getNetworkTraffic('10.0.3.2') } })
})

// wol
const wols = conf.wol
let servers = {}
wols.map((item) => {
    servers[[item.label]] = item
})

app.get('/wol', async (c) => {
    for (let key in servers) {
        servers[key].status = await wol.checkHostStatus(servers[key].ip)
    }
    return c.json({ status: 'success', data: servers })
})
app.post('/wake/:host', async (c) => {
    try {
        let host = c.req.param('host')
        await wol.wakeOnLan(servers[host].mac)
        let res = await wol.waitForHostOnline(servers[host].ip)
        return c.json({ status: 'success', data: res })
    } catch (error) {
        return c.json({ status: 'failed', error: error.message })
    }
})
// wol end

async function runTask() {
    try {
        await ddns()
    } catch (error) {
        console.error('任务出错:', error)
    }
    setTimeout(runTask, conf.task.duration * 1000)
}
if (Bun.env.RUN_MODE !== 'development') {
    await runTask()
}

export default {
    port: 9876,
    fetch: app.fetch,
}
