<script setup>
import { ref, onMounted, reactive, watch, defineEmits } from 'vue';
let props = defineProps({
    EcTableKeyItems: Object,
})

const emit = defineEmits(['ecTableFromResponse'])
const EcTableForm = () =>{
    // console.warn('submit')
}

const selectedOptions = ref([]);


watch(selectedOptions, ()=>{
    console.warn(selectedOptions.value)
    emit('ecTableFromResponse', selectedOptions.value)
})

</script>

<template>
    <form @submit.prevent="EcTableForm">
        <div class="SelectorWrapper">
            <!-- {{  props.EcTableKeyItems }} -->
            <div class="Selector" v-for="(item, index) in props.EcTableKeyItems.Items" v-bind:key="index">
                <input type="checkbox" :value="item" v-model="selectedOptions">
                <span>{{ index+1 }}. {{ item.key }}</span>
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