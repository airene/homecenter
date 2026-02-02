import { $ } from 'bun'
async function getNetworkTraffic(ip) {
    const output = await $`/usr/sbin/netstat -ib | grep ${ip}`.text()
    const [name, mtu, network, address, ipkts, ierrs, ibytes, opkts, operrs, obytes] = output.trim().split(/\s+/)
    return {
        interface: name,
        receivedBytes: (parseInt(ibytes) / 1024 / 1024).toFixed(1) + ' MB',
        sentBytes: (parseInt(obytes) / 1024 / 1024).toFixed(1) + ' MB',
    }
}

export { getNetworkTraffic }
