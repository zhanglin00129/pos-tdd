function readInputList(inputs){
  var realInputs = {};
  for(var i = 0;i<inputs.length;++i){
    var realInputsItem = splitByDelimiter(inputs[i],'-');
    if(realInputs.hasOwnProperty(realInputsItem[0])){
      realInputs[realInputsItem[0]]+= realInputsItem[1];
    }else{
      realInputs[realInputsItem[0]]= realInputsItem[1];
    }
  }
  return realInputs;
}

function splitByDelimiter(input,delimiter){
    var result = input.split(delimiter);
    result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);

    return result;
}

function isPromotionItem(barcode){
    var flag = 0;
    var promotions = loadPromotions();

    for(var i=0;i<promotions.length;++i){
      if(promotions[i].type=='BUY_TWO_GET_ONE_FREE'){
        for(var j = 0;j<promotions[i].barcodes.length;++j){
          if(barcode == promotions[i].barcodes[j]){
            flag = 1;
            break;
          }
        }
      }
    }
    return flag;
}

function getFreeNum(barcode,shoppingNum){
  return isPromotionItem(barcode)?Math.floor(shoppingNum/3):0;
}

function getDetailList(realInputs){
    var detailList = {};
    var k = 0;
    for(var item in realInputs){
      detailList[k] = getInfoFromAllItem(item);
      detailList[k].shoppingNum = realInputs[item];
      detailList[k].freeNum = getFreeNum(item,detailList[k].shoppingNum);
      detailList[k].paidNum = detailList[k].shoppingNum-detailList[k].freeNum;
      k++;
    }
    return detailList;
}

function getInfoFromAllItem(barcode){
    var allItems = loadAllItems();
    for(var i=0;i<allItems.length;++i){
       if(barcode == allItems[i].barcode){
       return allItems[i];
       }
    }
}

function getTitle(){
    return ("***<没钱赚商店>购物清单***\n");
}

function getSplitLine(){
    return ("----------------------\n");
}

function getStarsLine(){
    return ("**********************");
}

function printInventory(inputs){
  var realInputs = readInputList(inputs);
  var detailList = getDetailList(realInputs);
  var item = new printItemInfo(detailList);
  var printInfo = getTitle()+
                  item.shoppingItem()+
                  getSplitLine()+
                  item.promotionItem()+
                  getSplitLine()+
                  item.sumAndSaveItem()+
                  getStarsLine();
  console.log(printInfo);
}
