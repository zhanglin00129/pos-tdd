/**
*function readInputList(inputs)：读取输入购物单
*@param:inputs 输入的购物单
*@return:realInputs 关联数组，数组下标为物品的barcode，内容为物品数量
*/
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

/**
*function splitByDelimiter(input,delimiter)
*@param:input
*@param:delimiter
*@return:result,result[0]为分割符前字符,result[1]为分割符后字符,若没有分隔符,则result[1]为null
*/
function splitByDelimiter(input,delimiter){
    var result = input.split(delimiter);
    result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);

    return result;
}

/**
*function getDetailList(realInputs):
*@param:realInputs 输入关联数组,数组下标为物品的barcode，内容为物品数量
*@return:detailList 详细购物清单
*/
function getDetailList(realInputs){
    var detailList = {};
    var k = 0;
    for(var item in realInputs){
      detailList[k] = getInfoFromAllItem(item);
      detailList[k].num = realInputs[item];
      k++;
    }
    return detailList;
}

/**
*function getInfoFromAllItem(barcode)
*@param:barcode
*@return:
*/
function getInfoFromAllItem(barcode){
    var allItems = loadAllItems();
    for(var i=0;i<allItems.length;++i){
       if(barcode == allItems[i].barcode){
       return allItems[i];
       }
    }
}

/**
*function getTitle():返回账单title条目
*/
function getTitle(){
    return ("***<没钱赚商店>购物清单***\n");
}

/**
*function getSplitLine():返回账单分割线
*/
function getSplitLine(){
    return ("----------------------\n");
}

/**
*function getStarsLine():返回账单结束starsline
*/
function getStarsLine(){
    return ("**********************");
}

/**
*function printInventory(inputs):打印账单
*@param:inputs 输入的购物单
*/
function printInventory(inputs){
  var realInputs = readInputList(inputs);
  var detailList = getDetailList(realInputs);
  var sumPrice = 0;
  var printInfo = '';

  printInfo += getTitle() ;
  for(var i in detailList){
    printInfo += '名称：'+ detailList[i].name +'，数量：'+detailList[i].num+detailList[i].unit+
      '，单价：'+detailList[i].price.toFixed(2)+'(元)，小计：'+
      (detailList[i].num*detailList[i].price).toFixed(2)+'(元)\n' ;
    sumPrice += detailList[i].num*detailList[i].price;
  }
  printInfo +=getSplitLine() +'挥泪赠送商品：\n' +getSplitLine() +'总计：'+sumPrice.toFixed(2)+'(元)\n' +
    '节省：0.00(元)\n' +getStarsLine();
  console.log(printInfo);
}
