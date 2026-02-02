<template>
    <a-row :gutter="20">
        <a-col :span="8">
            <a-card title="WakeOnLan">
                <a-card v-for="(host, key) in servers" hoverable :style="{ marginBottom: '20px' }" @click="wake(key)">
                    <div
                        :style="{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }">
                        <a-space>
                            <a-badge :status="host.status ? 'success' : 'normal'" />
                            <a-typography-text>{{ host.label }} {{ host.ip }}</a-typography-text>
                            <a-spin v-if="host.loading" />
                        </a-space>
                    </div>
                </a-card>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card title="IP info"> {{ ipInfo }}</a-card>
        </a-col>
        <a-col :span="8">
            <div>8 - 33.33%</div>
        </a-col>
    </a-row>
</template>
<script setup>
import * as api from '@/api/index'
import { ref } from 'vue'
const servers = ref([])
api.wol().then((res) => {
    servers.value = res.data
})

const wake = (host) => {
    servers.value[host].loading = true
    api.wake(host)
        .then((res) => {
            servers.value[host].status = res.data
        })
        .finally(() => {
            servers.value[host].loading = false
        })
}
let ipInfo = ref({})
api.ipInfo().then((res) => {
    ipInfo.value = res.data
})
</script>

<style scoped></style>
