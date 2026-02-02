import { getNetworkTraffic } from '../src/wireguard.js'

const traffic = await getNetworkTraffic('192.168.1.7')
console.log(`Interface: ${traffic.interface}`)
console.log(`Received: ${(traffic.receivedBytes / 1024 / 1024).toFixed(2)} MB`)
console.log(`Sent: ${(traffic.sentBytes / 1024 / 1024).toFixed(2)} MB`)
