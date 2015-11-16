describe("Sprint", function() {

    describe("setUp", function (){
        it("Initialize the sprint test", function() {
            browser.get('/#/home');

            element(by.model('title')).clear().sendKeys("Testsprint");
            element(by.model('description')).clear().sendKeys("Testsprint");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-test').last().click();

            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            element(by.model('body')).clear().sendKeys("Object");
            element(by.model('priority')).clear().sendKeys("3");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();
        });
    });

    describe("add", function (){
        it("should add a sprint", function(){
            element(by.id('aSprint')).click();
            element(by.model('title')).clear().sendKeys("Test");
            $('button.btn-add').click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).toEqual('Test'); 
        });
    });

    describe("update", function () {
         it("should update a sprint", function(){
            $$('button.btn-warning').last().click();
            element(by.model('title')).clear().sendKeys("Test Update, impossible que le nom d\'un titre soit ça xrtrz");
            $('button.btn-edit').click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz'); 
        });
    });
    
    describe("addUS", function () {
        it("should add an US in a sprint", function(){
            $$('button.btn-addUS').last().click();
            element(by.cssContainingText('option', 'Test')).click();
            element(by.cssContainingText('option', 'Object')).click();
            $('button.btn-addUSclick').click();
            
            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Object');   

        });
    });

    describe("deleteUS", function (){
        it("should delete an us in a sprint", function(){
            $$('button.btn-deleteUS').last().click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).not.toEqual('Object');   
        });
    });

    describe("delete", function (){
        it("should delete a sprint", function(){
            $$('button.btn-deleteUS').last().click();

            element(by.model('title')).clear().sendKeys("Test de suppression haha");
            $('button.btn-add').click();

            $$('button.btn-danger').last().click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).not.toEqual('Test de suppression haha');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});