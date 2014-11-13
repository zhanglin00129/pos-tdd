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

function Item(detailList){
  this.detailList = detailList;
}

Item.prototype.shoppingItem = function(){
  var detailList = this.detailList;
  var sumPrice = 0;
  var shoppingItemInfo = '';
  for(var i in detailList ){
    shoppingItemInfo +="名称："+detailList[i].name+"，数量："+detailList[i].shoppingNum+detailList[i].unit+
                        "，单价："+detailList[i].price.toFixed(2)+"(元)，小计："+
                        (detailList[i].price*detailList[i].paidNum).toFixed(2)+"(元)\n";
    sumPrice += detailList[i].price*detailList[i].paidNum;
  }
  return shoppingItemInfo;
};

Item.prototype.sumAndSaveItem = function(){
  detailList = this.detailList;
  var sumPrice = 0;
  var savePrice = 0;
  for(var i in detailList ){
     sumPrice += detailList[i].price*detailList[i].paidNum;
     if(detailList[i].freeNum>0){
       savePrice += detailList[i].price*detailList[i].freeNum;
     }
  }
  return "总计："+sumPrice.toFixed(2)+"(元)\n"+
         "节省：" +savePrice.toFixed(2)+"(元)\n";
};

Item.prototype.promotionItem = function(){
  detailList = this.detailList;
  var savePrice = 0;
  var SaveItemInfo = '';
  for(var i in detailList ){
     if(detailList[i].freeNum>0){
     SaveItemInfo +="名称："+detailList[i].name+"，数量："+detailList[i].freeNum+detailList[i].unit+"\n";
     savePrice += detailList[i].price*detailList[i].freeNum;
     }
  }
  return SaveItemInfo;
};

function printInventory(inputs){
  var realInputs = readInputList(inputs);
  var detailList = getDetailList(realInputs);
  var item = new Item(detailList);
  var printInfo = getTitle() ;
  printInfo += item.shoppingItem();
  printInfo += getSplitLine()+"挥泪赠送商品：\n";
  printInfo += item.promotionItem();
  printInfo += getSplitLine();
  printInfo += item.sumAndSaveItem();
  printInfo += getStarsLine();
  console.log(printInfo);
}
