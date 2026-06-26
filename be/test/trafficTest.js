import { getNetworkTraffic } from '../src/wireguard.js'

const traffic = await getNetworkTraffic('192.168.1.7')
console.log(`Interface: ${traffic.interface}`)
console.log(`Received: ${traffic.receivedBytes}`)
console.log(`Sent: ${traffic.sentBytes}`)
