/**
*function printInventory(inputs):打印账单
*@param:inputs 输入的购物单
*/
function printInventory(inputs){
  var allItems = loadAllItems();
  var detailList = {};
  for(var j=0;j<inputs.length;j++){
    for(var i=0;i<allItems.length;++i){
       if(allItems[i].barcode == inputs[j]){
           detailList[j] = allItems[i];
         detailList[j].num = 1;
       }
    }
  }

  var sumPrice = 0;
  var printInfo ='***<没钱赚商店>购物清单***\n' ;
  for(var i in detailList){
    printInfo += '名称：'+ detailList[i].name +'，数量：'+detailList[i].num+detailList[i].unit+
      '，单价：'+detailList[i].price.toFixed(2)+'(元)，小计：'+
      (detailList[i].num*detailList[i].price).toFixed(2)+'(元)\n' ;
    sumPrice += detailList[i].num*detailList[i].price;
  }
  printInfo +=
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    '----------------------\n' +
    '总计：'+sumPrice.toFixed(2)+'(元)\n' +
    '节省：0.00(元)\n' +
    '**********************';
  console.log(printInfo);
}
