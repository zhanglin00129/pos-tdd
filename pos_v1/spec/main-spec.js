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
    it('should print a correct bill list when input some non-promotional barcodes in the format of ITEM000003-2',
     function () {

        spyOn(console, 'log');
        inputs = ['ITEM000002','ITEM000002','ITEM000002','ITEM000003-2'];
        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：苹果，数量：3斤，单价：5.50(元)，小计：16.50(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '----------------------\n' +
            '总计：46.50(元)\n' +
            '节省：0.00(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
    it('should print a correct bill list when input some promotional barcodes',
     function () {

        spyOn(console, 'log');
        inputs = inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
        ];
        printInventory(inputs);

        var expectText =
                '***<没钱赚商店>购物清单***\n' +
                '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                '----------------------\n' +
                '挥泪赠送商品：\n' +
                '名称：雪碧，数量：1瓶\n' +
                '----------------------\n' +
                '总计：12.00(元)\n' +
                '节省：3.00(元)\n' +
                '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
