function splitByDelimiter(input,delimiter){
    var result = input.split(delimiter);
    result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);

    return result;
}

/**
*function printInventory(inputs):打印账单
*@param:inputs 输入的购物单
*/
function printInventory(inputs){
  var allItems = loadAllItems();
  var detailList = {};
  var realInputs = {};
  var sumPrice = 0;
  var printInfo = '';

  for(var i=0;i<inputs.length;++i){
    var realInputsItem = splitByDelimiter(inputs[i],'-');
    if(realInputs.hasOwnProperty(realInputsItem[0])){
      realInputs[inputs[i]] += realInputsItem[1];
      }else{
      realInputs[realInputsItem[0]] = realInputsItem[1];
    }
  }
  var k = 0;
  for(var item in realInputs){
    for(var j=0;j<allItems.length;++j){
       if(allItems[j].barcode == item){
         detailList[k] = allItems[j];
         detailList[k].num = realInputs[item];
         k++;
       }
    }
  }


  printInfo += '***<没钱赚商店>购物清单***\n' ;
  for(i in detailList){
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
