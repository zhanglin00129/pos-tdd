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
    it('should print a correct bill list when input some same/different non-promotional barcodes', function () {

        spyOn(console, 'log');
        inputs = ['ITEM000002','ITEM000002','ITEM000002','ITEM000003'];
        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)\n' +
            '名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '----------------------\n' +
            '总计：31.50(元)\n' +
            '节省：0.00(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
