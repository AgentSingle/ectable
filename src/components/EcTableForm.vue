<script setup>
import { ref, onMounted, reactive, watch, defineEmits } from 'vue';
let props = defineProps({
    EcTableKeyItems: Object,
    EcTableSelectedItems: Object,
})

const emit = defineEmits(['ecTableFromResponse'])
const EcTableForm = () =>{
    // console.warn('submit')
}

const selectedOptions = ref([]);

onMounted(()=>{
    selectedOptions.value=props.EcTableSelectedItems;
    emit('ecTableFromResponse', selectedOptions.value)
})

watch(selectedOptions, ()=>{
    // console.warn(selectedOptions.value)
    // console.warn(props.EcTableKeyItems)
    const sorted = selectedOptions.value.sort((a, b) => a.id - b.id);
    console.warn(100/sorted.length);
    emit('ecTableFromResponse', sorted)
})

</script>

<template>
    <form @submit.prevent="EcTableForm">
        <div class="SelectorWrapper">
            <!-- {{  props.EcTableKeyItems }} -->
            <div class="Selector" v-for="(item, index) in props.EcTableKeyItems.Items" v-bind:key="index">
                <input 
                type="checkbox" 
                :name="`${index}_${selectedOptions}`" 
                :value="item" 
                v-model="selectedOptions" 
                :selected="item.selected">
                <span>{{ index+1 }}. {{ item.key }} {{ item.selected }}</span>
            </div>
        </div>
    </form>
</template>

<style scoped>
.SelectorWrapper{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 0.5rem;
}
.Selector{
    display: grid;
    grid-template-columns: 24px 1fr;
    grid-gap: 5px;
}
.Selector input{
    width: 20px;
}
.Selector span{
    text-align: left;
}
</style>