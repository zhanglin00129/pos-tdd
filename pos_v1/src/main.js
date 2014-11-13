/**
*function printInventory(inputs):打印账单
*@param:inputs 输入的购物单
*/
function printInventory(inputs){
  var allItems = loadAllItems();
  var detailList;
  for(var i=0;i<allItems.length;++i){
     if(allItems[i].barcode == inputs){
       detailList = allItems[i];
       detailList.num = 1;
     }
  }

    var printInfo ='***<没钱赚商店>购物清单***\n' ;
    if(detailList){
      printInfo += '名称：'+ detailList.name +'，数量：'+detailList.num+detailList.unit+
        '，单价：'+detailList.price.toFixed(2)+'(元)，小计：'+
        (detailList.num*detailList.price).toFixed(2)+'(元)\n' ;
    }

    printInfo +=
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    '----------------------\n' +
    '总计：'+(detailList?(detailList.num*detailList.price).toFixed(2):'0.00')+'(元)\n' +
    '节省：0.00(元)\n' +
    '**********************';
    console.log(printInfo);
}
