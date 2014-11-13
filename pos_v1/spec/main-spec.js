describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
    });

    it('should print an empty bill list when input nothing', function () {

        spyOn(console, 'log');
        inputs = [];
        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '----------------------\n' +
            '总计：0.00(元)\n' +
            '节省：0.00(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });

});
