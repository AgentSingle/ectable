<script setup>
import { ref, reactive, watch, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['EcTableHeaderResponse'])
let props = defineProps({
  EcTableHeaderContent: Object,
  contentIndex: Number,
  TotalItems: Number,
})


// =============================================================
const dragger = ref(null);
const parentDragger = ref(null);
const dragging = ref(false);
const offset = reactive({ x: 0 });

let parentWidthInPercent = ref(props.EcTableHeaderContent.width);
let parentWidthInPixle = ref(props.EcTableHeaderContent.width);

onMounted(()=>{
  const parentRect = parentDragger.value.getBoundingClientRect();
  parentWidthInPixle.value = parentRect.width;
})

const handlePointerDown = (e) =>{
    offset.x = 0;
    dragging.value = true;

    const childRect = dragger.value.getBoundingClientRect();

    offset.x = e.clientX - childRect.left;
    
    window.addEventListener('pointermove', onDrag);
    window.addEventListener('pointerup', stopDrag);
}

const onDrag = (e) => {
    if (!dragging.value) return;

    const parentRect = parentDragger.value.getBoundingClientRect();
    let x = e.clientX - parentRect.left - offset.x;
    

    const childRect = dragger.value.getBoundingClientRect();
    // x = Math.max(0, Math.min(x, parentRect.width - childRect.width + 1));

    dragger.value.style.left = `${x}px`;

    // console.warn(`${parentDragger.value.innerText}`,x)

    let newWidth = (x+childRect.width);

    if (x>0){
      let newParentWidthInPercent = (parentWidthInPercent.value * newWidth)/ parentWidthInPixle.value;

      parentWidthInPercent.value = newParentWidthInPercent;
      parentWidthInPixle.value = newWidth;

      let respObj = {
        widthParcent: newParentWidthInPercent,
        pixleWidth: parentWidthInPixle.value,
        index: props.contentIndex
      }
      emit('EcTableHeaderResponse', respObj)
    }
}

const stopDrag = () => {
  dragging.value = false;
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', stopDrag);
}

// watch(parentDragger, ()=>{
//   console.warn(parentDragger.value)
//   offset.x = 0;
// })

</script>

<template>

  <div 
    class="EcTableHeaderContent" 
    ref="parentDragger"
    >
      {{ props.EcTableHeaderContent.key }}
      <!-- {{ props.EcTableHeaderContent.width }} -->
      <!-- {{ props.contentIndex }} {{ props.TotalItems }} -->
      <div 
        class="movable"
        ref="dragger"
        v-if="(props.contentIndex != (props.TotalItems -1))"
        @pointerdown="handlePointerDown"
      ></div>
  </div>
</template>

<style scoped>
.EcTableHeaderContent{
  width: 100%;
  user-select: none;
  touch-action: none;
  box-sizing: border-box;
  overflow: hidden;
}

.movable {
    position: absolute;
    top: -15px;
    left: calc(100% - 14px); 
    height: 15px;
    width: 15px;
    z-index: 10;
    background-color: #eeeeee;
    cursor: pointer;
}
.movable::after{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-top: 15px solid gray;
}
</style>