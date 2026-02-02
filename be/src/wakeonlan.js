// wol
import { $ } from 'bun'
async function wakeOnLan(macAddress, ipAddress = '255.255.255.255', port = 9) {
    const macBytes = macAddress.split(/[:-]/).map((x) => parseInt(x, 16))
    const packet = new Uint8Array(102)
    packet.fill(0xff, 0, 6)
    for (let i = 0; i < 16; i++) {
        packet.set(macBytes, 6 + i * 6)
    }
    const socket = await Bun.udpSocket({})
    socket.setBroadcast(true)
    socket.send(packet, port, ipAddress)
    socket.close()
}

async function checkHostStatus(ip) {
    try {
        const result = await Promise.race([
            $`ping -c 1 ${ip}`.quiet(),
            Bun.sleep(200).then(() => {
                return false
            }),
        ])
        return result.exitCode === 0 && result.stdout.includes('1 packets received')
    } catch (error) {
        return false
    }
}

async function waitForHostOnline(ip, interval = 1000, maxAttempts = 10) {
    let attempts = 0
    while (attempts < maxAttempts) {
        const isOnline = await checkHostStatus(ip)
        if (isOnline) {
            return true
        }
        attempts++
        await Bun.sleep(interval)
    }
    return false
}
export { wakeOnLan, checkHostStatus, waitForHostOnline }
