var util = util || {};

util.splitByDelimiter = function(input,delimiter){
  var result = input.split(delimiter);
  result[1] = (!result[1])?1:(parseInt)(input.split(delimiter)[1]);
  return result;
};


util.getTitle = function(){
    return ("***<没钱赚商店>购物清单***\n");
};

util.getSplitLine = function(){
    return ("----------------------\n");
};

util.getStarsLine = function (){
    return ("**********************");
};
