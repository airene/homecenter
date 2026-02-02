<template>
    <a-result status="404" title="404" subtitle="Whoops, that page is gone.">
        <template #extra>
            <a-space>
                <a-button type="primary" @click="$router.push('/')">Go Home</a-button>
            </a-space>
        </template>
    </a-result>
</template>
<script></script>
