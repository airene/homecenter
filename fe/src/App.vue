<template>
    <a-config-provider :locale="enUS">
        <router-view></router-view>
    </a-config-provider>
</template>

<script setup>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
</script>
