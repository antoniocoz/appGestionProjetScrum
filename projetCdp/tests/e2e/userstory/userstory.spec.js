describe("Userstory", function() {
    var url;

    describe("setUp", function (){
        it("Initialize the Userstory test", function() {
            browser.get('/#/home');

            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("TestUS");
            element(by.model('description')).clear().sendKeys("TestUS");
            element(by.id('BtnAddBacklog')).click();

            url = $$('a.testDetail').last().getAttribute("href");
            $$('button.btn-detail').last().click();
        });
    });

    describe("add", function (){
        it("should add a Userstory", function(){
            element(by.id('btn-addUS')).click();

            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Test');
            expect(element.all(by.repeater('us in userStories').column('us.priority')).last().getText()).toEqual('2');
            expect(element.all(by.repeater('us in userStories').column('us.difficulty')).last().getText()).toEqual('5');
        });
    });

    describe("add_canceled", function (){
        it("should cancel an adding of a userstory", function(){
            element(by.id('btn-addUS')).click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe(url);      

        });
    });

    describe("update", function () {
         it("should update a Userstory", function(){
            $$('button.btn-edit').last().click();
            element(by.model('body')).clear().sendKeys("Test, impossible de mettre ça en d'un us ahah");
            element(by.model('priority')).clear().sendKeys("3");
            element(by.cssContainingText('option', '8')).click();
            element(by.id('BtnEditUserstory')).click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Test, impossible de mettre ça en d\'un us ahah');
            expect(element.all(by.repeater('us in userStories').column('us.priority')).last().getText()).toEqual('3');
            expect(element.all(by.repeater('us in userStories').column('us.difficulty')).last().getText()).toEqual('8');
        });
    });

     describe("update_canceled", function (){
        it("should cancel an updating of a userstory", function(){
           $$('button.btn-edit').last().click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe(url);      

        });
    });

    describe("delete", function (){
        it("should delete a Userstory", function(){
            element(by.id('btn-addUS')).click();
            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            $$('button.btn-danger').last().click();
            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).not.toEqual('Test');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});