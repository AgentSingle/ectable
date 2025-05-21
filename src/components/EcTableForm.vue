<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { 
    arryShorting, 
    defaultWidthSetter,
    changeWidthOnIncrement,
    changeWidthOnDecrement
} from '@/components/ecAlgo.js';

let props = defineProps({
    EcTableKeyItems: Object,
    EcTableSelectedItems: Object,
})

const emit = defineEmits(['ecTableFromResponse'])
const selectedOptions = ref([]);

onMounted(()=>{
    selectedOptions.value=props.EcTableSelectedItems;
})

watch(selectedOptions, (newValue, oldValue)=>{
    let newArr = [];
    if(oldValue.length>0){
        if(newValue.length>oldValue.length){
            newArr = changeWidthOnIncrement(oldValue, newValue);
        }else if(newValue.length<oldValue.length){
            newArr = changeWidthOnDecrement(oldValue, newValue);
        }
    }else if(oldValue.length==0){
        newArr = defaultWidthSetter(selectedOptions.value);
    }

    const sorted = arryShorting(newArr);
    emit('ecTableFromResponse', sorted)
})

</script>

<template>
    <div class="SelectorWrapper">
        <!-- {{  props.EcTableKeyItems }} -->
        <div class="Selector" v-for="(item, index) in props.EcTableKeyItems.Items" v-bind:key="index">
            <input 
            type="checkbox" 
            :name="`${index}_${selectedOptions}`" 
            :value="item" 
            v-model="selectedOptions">
            <span>{{ index+1 }}. {{ item.key }} {{ item.isSelected }}</span>
        </div>
    </div>
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