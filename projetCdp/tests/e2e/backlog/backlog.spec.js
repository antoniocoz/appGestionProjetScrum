describe("Backlog", function() {
    describe("index", function (){
        it("should display the correct title", function() {
            browser.get('/#/home');
            expect(browser.getTitle()).toBe('Environnement de developpement');
        });
    });

    describe("add", function (){
        it("should add a backlog", function(){
            element(by.model('title')).clear().sendKeys("Test");
            element(by.model('description')).clear().sendKeys("Test");
            element(by.id('BtnAddBacklog')).click();

            expect(element.all(by.model('titleBL')).last().getText()).toEqual('Test'); 
            expect(element.all(by.model('descriptionBL')).last().getText()).toEqual('Test'); 
        });
    });

    describe("update", function () {
         it("should update a backlog", function(){
            element.all(by.css('button.btn.btn-warning')).last().click();
            element(by.model('title')).clear().sendKeys("Test Update, impossible que le nom d\'un titre soit ça xrtrz");
            element(by.model('description')).clear().sendKeys("Test Update");
            element(by.id('BtnEditBacklog')).click();

            expect(element.all(by.model('titleBL')).last().getText()).toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz'); 
            expect(element.all(by.model('descriptionBL')).last().getText()).toEqual('Test Update'); 
        });
    });

    describe("delete", function (){
        it("should delete a backlog", function(){
            element.all(by.css('button.btn.btn-danger')).last().click();
            expect(element.all(by.model('titleBL')).last().getText()).not.toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz');
        });
    });
});