function checkStand(inputs){
  this.inputs = inputs;
  this.realInputs = {};
  this.readInputList();
}

checkStand.prototype.readInputList = function(){
  var inputs = this.inputs;
  var realInputs = this.realInputs;
  for(var i = 0;i<inputs.length;++i){
    var realInputsItem = util.splitByDelimiter(inputs[i],'-');

    if(realInputs.hasOwnProperty(realInputsItem[0])){
      realInputs[realInputsItem[0]]+= realInputsItem[1];
    }else{
      realInputs[realInputsItem[0]]= realInputsItem[1];
    }
  }
};

checkStand.prototype.getDetailList = function(){

    var realInputs = this.realInputs;
    var detailList = {};
    var k = 0;

    for(var item in realInputs){
      var promotion = new promotionCal(item,realInputs[item]);
      detailList[k] = this.getInfoFromAllItem(item);
      detailList[k].shoppingNum = realInputs[item];
      detailList[k].freeNum = promotion.getFreeNum(detailList[k].shoppingNum);
      detailList[k].paidNum = detailList[k].shoppingNum-detailList[k].freeNum;
      k++;
    }
    return detailList;
};

checkStand.prototype.getInfoFromAllItem = function(barcode){
    var allItems = loadAllItems();
    for(var i=0;i<allItems.length;++i){
       if(barcode == allItems[i].barcode){
       return allItems[i];
       }
    }
};
