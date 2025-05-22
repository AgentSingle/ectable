<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import EcTableForm from '@/components/EcTableForm.vue';
import EcTableHeader from '@/components/EcTableHeader.vue';
import {
    widthAdjuster
} from '@/components/ecAlgo.js';

const props = defineProps({
    selectedItems: Array,
    allItems:Array,
})

const EcTableTableObj = reactive({
    Items:[]
});

const selectedContent = reactive({
    Items: [],
});

watch(props, ()=>{
    const updatedData = props.allItems.map(item => {
        const match = props.selectedItems.find(d => d.key === item.key);
        return match ? match : item;
    });

    EcTableTableObj.Items = updatedData;
});


const EcTableResponse = (e)=>{
    selectedContent.Items=e;
}

const addRow = (index) =>{
    let childObj = {
        value: ''
    }
    selectedContent.Items[index].value.push(childObj);
}
const pushRow = (index, childIndex) =>{
    let childObj = {
        value: ''
    }
    selectedContent.Items[index].value.splice(childIndex, 0, childObj);
}

const removeRow = (index, childIndex) =>{
    selectedContent.Items[index].value.splice(childIndex, 1);
}

const EcTableInputForm = () =>{

}

const ecTableHeaderResponse = (e)=>{
    let respArrayItem = widthAdjuster(
        selectedContent.Items, 
        e.widthParcent,
        e.index
    );
}

</script>

<template>
    <div class="TableWrapper" :style="{width: `${parentConainerWidth}px`}">
        <EcTableForm 
        @ecTableFromResponse="EcTableResponse"
        :EcTableKeyItems="EcTableTableObj"
        :EcTableSelectedItems="props.selectedItems"
        ></EcTableForm>

        
        <form @submit.prevent="EcTableInputForm">

            <div class="EcTableWrapper">

                <!-- TABLE HEAD -->
                <div class="EcTableHeader">
                    <div
                        class="EcTableHeaderItems" 
                        v-for="(item, index) in selectedContent.Items"
                        :style="{'width': item.width + '%'}"
                    >
                    <!-- {{ item.width  }} -->
                        <EcTableHeader
                        :EcTableHeaderContent="item"
                        :contentIndex="index"
                        :TotalItems="selectedContent.Items.length"
                        @EcTableHeaderResponse="ecTableHeaderResponse"
                        class="EcTableHeaderContent"
                        ></EcTableHeader>
                    </div>
                </div>

                <!-- TABLE BODY -->
                <div class="EcTableBody">
                    <div class="EcTableRow">
                        <div 
                            class="EcTableBodyItems"
                            v-for="(item, index) in selectedContent.Items" v-bind:key="index"
                            :style="{'width': item.width + '%'}"
                        >

                            <div v-if="item.value.length>1" class="EcTableBodyChildItemsWrapper">
                                <div 
                                class="EcTableBodyChildItems" v-for="(childItem, childIndex) in item.value" v-bind:key="childItem">
                                    <textarea 
                                    class="EcTableCustomTextArea" 
                                    :name="`${index}_${childIndex}`"
                                    style="width: 100%; height: 100%;"  v-model="childItem.value"></textarea>
                                    <button type="button"
                                    class="EcTableBodyChildItemsBtn"
                                    @click="removeRow(index, childIndex)">-</button>
                                    <button type="button" class="EcTableBodyChildItemsBtnAdd"
                                    @click="pushRow(index, childIndex)"
                                    >+</button>
                                </div>
                            </div>

                            <div v-else-if="item.value.length==1" class="EcTableBodyChildItemsWrapper">
                                <div 
                                class="EcTableBodyChildItems"
                                v-for="(childItem, childIndex) in item.value" v-bind:key="childIndex">
                                    <textarea 
                                    class="EcTableCustomTextArea" 
                                    :name="`${index}_${childIndex}`" 
                                    style="width: 100%; height: 100%;" v-model="childItem.value"></textarea>
                                    <button type="button"
                                    class="EcTableBodyChildItemsBtn"
                                    @click="removeRow(index, childIndex)">-</button>

                                    <button type="button" class="EcTableBodyChildItemsBtnAdd"
                                    @click="pushRow(index, childIndex)"
                                    >+</button>
                                </div>
                            </div>

                            
                            <button type="button" class="EcTableBodyItemsBtn"
                            @click="addRow(index)"
                            >+</button>
                        <!-- {{ item.key }} -->
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>

</template>


<style scoped>
.TableWrapper{
    width: 100%;
    min-width: 800px;
}

.EcTableWrapper{
    display: grid;
}
.EcTableHeader{
    margin-top: 15px;
    display: flex;
}
.EcTableHeaderItems{
    height: auto;
    border: 1px solid black;
    position: relative;
}
.EcTableHeaderContent{
    background-color: white;
}
</style>


<style scoped>
.EcTableBody{
    display: flex;
    flex-direction: column;
    min-height: 250px;
}
.EcTableRow{
    height: 100%;
    display: flex;
    flex-direction: row;
}
.EcTableBodyItems{
    height: auto;
    border: 1px solid black;
    position: relative;
    background-color: grey;
}
.EcTableBodyItemsBtn{
    position: absolute;
    bottom: -7.5px;
    right: 0;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background-color: #dededf;
    border: none;
    color: green;
}
</style>


<style scoped>
.EcTableBodyChildItemsWrapper{
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, minmax(20px, 1fr));
}
.EcTableBodyChildItems{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    border-bottom: 1px solid black;
    box-sizing: border-box;
}
.EcTableBodyChildItems textarea{
    width: calc(100% - 15px);
    min-height: 100%;
    height: auto;
    padding: 2px;
    box-sizing: border-box;
    border: none;
    resize: none;
}

.EcTableBodyChildItems textarea:focus{
    outline: 0;
}

.EcTableBodyChildItemsBtn{
    position: absolute;
    /* left: 0; */
    bottom: 7.5px;
    right: 0;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background-color: #dededf;
    border: none;
    color: red;
    /* opacity: 0; */
}
.EcTableBodyChildItemsBtn:hover{
    opacity: 1;
}
.EcTableBodyChildItemsBtnAdd{
    position: absolute;
    top: -7.5px;
    right: 0;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background-color: #dededf;
    border: none;
    color: green;
    /* opacity: 0; */
}
.EcTableBodyChildItemsBtnAdd:hover{
    opacity: 1;
}
</style>