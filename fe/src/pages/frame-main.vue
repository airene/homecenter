<template>
    <div class="layout">
        <a-layout>
            <a-layout-header>
                <div class="main-content">
                    <a-row :gutter="20">
                        <a-col :span="4">
                            <div class="logo">HomeCenter</div>
                        </a-col>
                        <a-col :span="18">
                            <a-menu mode="horizontal" :default-selected-keys="['1']">
                                <a-menu-item key="1">Dashboard</a-menu-item>
                                <a-menu-item key="2">Solution</a-menu-item>
                            </a-menu>
                        </a-col>
                        <a-col :span="2">
                            <span @click="toggleTheme"> <icon-sun-fill v-if="isDark" size="20" /><icon-moon v-else size="20" /></span>
                        </a-col>
                    </a-row>
                </div>
            </a-layout-header>
            <a-layout>
                <a-layout-content>
                    <div class="main-content" style="margin-top: 20px">
                        <router-view></router-view>
                    </div>
                </a-layout-content>
                <a-modal></a-modal>
            </a-layout>
        </a-layout>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let isDark = ref(false)
const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme')
    }
}
const router = useRouter()
</script>
<style scoped>
h2 {
    padding: 13px 0 0 20px;
    margin: 0;
}

.layout,
.layout :deep(.arco-layout) {
    height: 100%;
}

/*
.layout :deep(.arco-layout-sider) {
    width: 206px;
    height: 100%;
}

.layout :deep(.arco-layout-has-sider) {
    height: calc(100% - 54px);
}
*/

.layout :deep(.arco-layout-header) {
    height: 59px;
    border-bottom: 1px solid var(--color-border-2);
    background: var(--color-bg-2);
}

.layout :deep(.arco-layout-content) {
    overflow: auto;
    /*background: var(--color-bg-1);*/
}

.logo {
    width: 120px;
    color: var(--color-text-1);
    height: 30px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
}
</style>
