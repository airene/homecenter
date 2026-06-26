async function getWanIP() {
    try {
        const response = await fetch('https://ip.3322.net/')
        return (await response.text()).trim()
    } catch (error) {
        console.error('获取外网 IP 失败:', error)
        return '无法获取外网 IP'
    }
}

export { getWanIP }
