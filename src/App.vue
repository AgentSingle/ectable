<script setup>
import { ref, onMounted } from 'vue';
import EcTable from '@/components/EcTable.vue';

const selectedItems = ref([
    {
        key: "Project Name", 
        id:0, 
        width: 30,
        value: [
            {value: ''}
        ],
    }, 
    {
        key: "Scope of work", 
        id:11, 
        width: 60,
        value: [
            {value: ''}
        ],
    },
]);

const allItems = ref([]);

const dynamicItems = [
    "Project Name",
    "Project Location",
    "Building Name",
    "Project Area (Sq. Ft)",
    "Project Level",
    "Structure Scope",
    "Model (Hrs.)",
    "No of Sheets",
    "Drawings hrs.",
    "Number of Pannels",
    "Total (Hrs.)",
    "Scope of work",
]

onMounted(()=>{
    allItems.value = dynamicItems.map((label, index) => ({
        key: label,
        id: index,
        width: 0,
        value: [
            {value: ''}
        ],
    }));
})
</script>

<template>
    <EcTable
    :selectedItems="selectedItems"
    :allItems="allItems"
    ></EcTable>
</template>

<style scoped>
</style>
