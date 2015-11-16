describe("Userstory", function() {

    describe("setUp", function (){
        it("Initialize the Userstory test", function() {
            browser.get('/#/home');

            element(by.model('title')).clear().sendKeys("TestUS");
            element(by.model('description')).clear().sendKeys("TestUS");
            element(by.id('BtnAddBacklog')).click();

            var url = $$('a.testDetail').last().getAttribute("href")
            $$('button.btn-test').last().click();
        });
    });

    describe("add", function (){
        it("should add a Userstory", function(){
            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Test');
            expect(element.all(by.repeater('us in userStories').column('us.priority')).last().getText()).toEqual('2');
            expect(element.all(by.repeater('us in userStories').column('us.difficulty')).last().getText()).toEqual('5');
        });
    });

    describe("update", function () {
         it("should update a Userstory", function(){
            $$('button.btn-warning').last().click();
            element(by.model('body')).clear().sendKeys("Test, impossible de mettre ça en d'un us ahah");
            element(by.model('priority')).clear().sendKeys("3");
            element(by.cssContainingText('option', '8')).click();
            element(by.id('BtnEditUserstory')).click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Test, impossible de mettre ça en d\'un us ahah');
            expect(element.all(by.repeater('us in userStories').column('us.priority')).last().getText()).toEqual('3');
            expect(element.all(by.repeater('us in userStories').column('us.difficulty')).last().getText()).toEqual('8');
        });
    });

    describe("delete", function (){
        it("should delete a Userstory", function(){
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