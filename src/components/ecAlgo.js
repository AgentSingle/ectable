const calculateTotalWidth = (arr)=>{
    let totalWidth = arr.reduce((total, obj) => {
        return total + obj['width'];
    }, 0);
    return totalWidth;
}

const findUniqueItems = (baseArray, itemsToExclude)=> {
    return baseArray.filter(item1 =>
        !itemsToExclude.some(item2 =>
        JSON.stringify(item1) === JSON.stringify(item2)
        )
    );
}


export const arryShorting = (arr)=>{
    let sorted = arr.sort((a, b) => a.id - b.id);
    return sorted;
};


export const defaultWidthSetter = (arr) =>{
    let newArr = arr.map(item => ({
        ...item,
        width: 100/arr.length,
    }))
    return newArr;
}

export const changeWidthOnIncrement = (oldItems, newItems) =>{
    let outputArr = [];
    let uniqueItem = findUniqueItems(newItems, oldItems);

    let standerDivision = 100/newItems.length;
    let newArr = newItems;
    let oldArr = oldItems;
    if(newArr.length>1){
        let subtractWidth = standerDivision/oldItems.length;
        // console.warn(subtractWidth)
        for(let i=0; i<oldArr.length; i++){
            let obj = oldArr[i];
            if(obj.width == 0){
                obj.width = standerDivision;
            }else{
                obj.width = obj.width - subtractWidth;
            }
            outputArr.push(obj);
        }
        let uniqueObj = uniqueItem[0];
        uniqueObj.width = standerDivision;
        outputArr.push(uniqueObj);
    }
    if(newArr.length==1){
        outputArr = defaultWidthSetter(newItems);
    }
    else{
        outputArr = defaultWidthSetter(newItems);
    }
    return outputArr;
    
}

export const changeWidthOnDecrement = (oldItems, newItems) =>{
    let uniqueItem = findUniqueItems(oldItems, newItems);
    let uniqueItemWidth = uniqueItem[0].width;

    let newArr = newItems;
    if(newArr.length> 1){
        for(let i=0; i<newArr.length; i++){
            let itemWidth = newArr[i].width;
            if(itemWidth!=0){
              let adjustedWidth = uniqueItemWidth/newItems.length;
              newArr[i].width = newArr[i].width + adjustedWidth;
            }
        }
    }else{
        newArr = defaultWidthSetter(newArr);
    }
    return newArr;
}


export const widthAdjuster = (arrayItem, newParcentageWidth, widthChangedIndex) =>{
    if(arrayItem.length<=1){
        return;
    }
    let item = arrayItem[widthChangedIndex];
    let oldWidth = item.width;
    let newWidth = newParcentageWidth;
    let widthDifferance = newWidth - oldWidth;

    if(arrayItem[widthChangedIndex +1]!=undefined){
        let preWidth = arrayItem[widthChangedIndex +1].width;
        let reWidth = preWidth - widthDifferance;
        arrayItem[widthChangedIndex +1].width = reWidth;
        item.width = newParcentageWidth;
    }else if(arrayItem[widthChangedIndex - 1]!=undefined){
        let preWidth = arrayItem[widthChangedIndex - 1].width;
        let reWidth = preWidth + widthDifferance;
        arrayItem[widthChangedIndex -1].width = reWidth;
        item.width = newParcentageWidth;
    } else{
        return;
    }
}