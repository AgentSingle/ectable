<script setup>
import { reactive, ref, onMounted } from 'vue';
import EcTableForm from '@/components/EcTableForm.vue';

const defaultObj = ref([
{key: "Project Name", value: []}, {key: "Scope of work", value: []},
]);

const EcTableTableObj = reactive({
    Items:[]
})
// const EcTableHeaderArr = ref([
//     "Project Name",
// ]);
// const EcTableBodyArr = ref([
// {key: "Project Name", value: []}, {key: "Scope of work", value: []},
// ]);

const selectedContent = reactive({
    Items: [],
})

const dynamicItems = [
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
]

onMounted(()=>{
    const output = dynamicItems.map(label => ({
        key: label,
        width: ``,
        value: []
    }));
    output.unshift(defaultObj.value[0]);
    output.push(defaultObj.value[1]);
    // console.warn(output)

    EcTableTableObj.Items = output;
})

const EcTableResponse = (e)=>{
    selectedContent.Items=e;
    // console.warn(e)
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
</script>

<template>
    <div class="TableWrapper">
        <EcTableForm 
        @ecTableFromResponse="EcTableResponse"
        :EcTableKeyItems="EcTableTableObj"
        ></EcTableForm>

        <div class="EcTableWrapper">

            <!-- TABLE HEAD -->
            <div class="EcTableHeader">
                <div 
                    class="EcTableHeaderItems" 
                    v-for="(item, index) in selectedContent.Items" v-bind:key="index"
                    :style="[{'min-width': item.width}]"
                >
                    {{ item.key }}

                    <div class="DimensionChanger"></div>
                </div>
            </div>

            <!-- TABLE BODY -->
            <div class="EcTableBody">
                <div class="EcTableRow">
                    <div 
                        class="EcTableBodyItems"
                        v-for="(item, index) in selectedContent.Items" v-bind:key="index"
                    >

                        <div v-if="item.value.length>1" class="EcTableBodyChildItemsWrapper">
                            <div 
                            class="EcTableBodyChildItems" v-for="(childItem, childIndex) in item.value" v-bind:key="childItem">
                                <textarea class="EcTableCustomTextArea" name="" :id="childIndex" style="width: 100%; height: 100%;"  v-model="childItem.value"></textarea>
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
                                <textarea class="EcTableCustomTextArea" name="" :id="childIndex" style="width: 100%; height: 100%;" v-model="childItem.value"></textarea>
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
    justify-content: space-evenly;
}
.EcTableHeaderItems{
    width: 100%;
    height: auto;
    border: 1px solid black;
    position: relative;
}
.DimensionChanger{
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-top: 15px solid orange;
    top: -16px;
    right: -1px;
    opacity: 0;
    /* cursor: pointer; */
}
.DimensionChanger:hover{
    opacity: 1;
}
.EcTableHeaderItems:last-child .DimensionChanger{
    display: none;
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
    justify-content: space-evenly;
}
.EcTableBodyItems{
    width: 100%;
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
    padding: 0;
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