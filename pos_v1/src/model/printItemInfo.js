function printItemInfo(detailList){
  this.detailList = detailList;
}

printItemInfo.prototype.shoppingItem = function(){
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

printItemInfo.prototype.sumAndSaveItem = function(){
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

printItemInfo.prototype.promotionItem = function(){
  detailList = this.detailList;
  var savePrice = 0;
  var SaveItemInfo = "挥泪赠送商品：\n";
  for(var i in detailList ){
     if(detailList[i].freeNum>0){
     SaveItemInfo +="名称："+detailList[i].name+"，数量："+detailList[i].freeNum+detailList[i].unit+"\n";
     savePrice += detailList[i].price*detailList[i].freeNum;
     }
  }
  return SaveItemInfo;
};
