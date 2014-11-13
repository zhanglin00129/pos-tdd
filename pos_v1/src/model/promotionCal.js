function promotionCal(barcode,shoppingNum){
  this.barcode = barcode;
  this.shoppingNum = shoppingNum;
}

promotionCal.prototype.isPromotion = function(){
  var flag = 0;
  var promotions = loadPromotions();
  var barcode = this.barcode;
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
};

promotionCal.prototype.getFreeNum = function(){
  var shoppingNum = this.shoppingNum;
  return this.isPromotion()?Math.floor(shoppingNum/3):0;
};
