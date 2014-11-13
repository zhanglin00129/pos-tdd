function printInventory(inputs){
  var checkStandInstance = new checkStand(inputs);
  var detailList = checkStandInstance.getDetailList();
  var item = new printItemInfo(detailList);
  
  var printInfo = util.getTitle()+
                  item.shoppingItem()+
                  util.getSplitLine()+
                  item.promotionItem()+
                  util.getSplitLine()+
                  item.sumAndSaveItem()+
                  util.getStarsLine();
  console.log(printInfo);
}
