describe("User", function() {
    var url;

    describe("setUp", function (){
        it("Initialize the User test", function() {
            browser.get('/#/home');

            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("TestUser");
            element(by.model('description')).clear().sendKeys("TestUser");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-detail').last().click();
        });
    });

    describe("add", function (){
        it("should add a User", function(){
            url =  element(by.id('aUser')).getAttribute("href");
            element(by.id('aUser')).click();
            element(by.id('btn-add')).click();

            element(by.model('forename')).clear().sendKeys("Arthur");
            element(by.model('surname')).clear().sendKeys("Dessez");
            element(by.model('contact')).clear().sendKeys("a@a.a");
            element(by.id('BtnAddUser')).click();

            expect(element.all(by.repeater('user in users').column('user.forename')).last().getText()).toEqual('Arthur');
            expect(element.all(by.repeater('user in users').column('user.surname')).last().getText()).toEqual('Dessez');
            expect(element.all(by.repeater('user in users').column('user.contact')).last().getText()).toEqual('a@a.a');
        });
    });

    describe("add_canceled", function (){
        it("should cancel an adding of a User", function(){
            element(by.id('btn-add')).click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe(url);      

        });
    });

    describe("update", function () {
         it("should update a User", function(){
            $$('button.btn-edit').last().click();
             element(by.model('forename')).clear().sendKeys("Test update xfdr");
            element(by.model('surname')).clear().sendKeys("Dessez");
            element(by.model('contact')).clear().sendKeys("a@a.a");
            element(by.id('BtnEditUser')).click();

            expect(element.all(by.repeater('user in users').column('user.forename')).last().getText()).toEqual('Test update xfdr');
            expect(element.all(by.repeater('user in users').column('user.surname')).last().getText()).toEqual('Dessez');
            expect(element.all(by.repeater('user in users').column('user.contact')).last().getText()).toEqual('a@a.a');
        });
    });

     describe("update_canceled", function (){
        it("should cancel an updating of a User", function(){
           $$('button.btn-edit').last().click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe(url);      

        });
    });

    describe("delete", function (){
        it("should delete a User", function(){
            element(by.id('btn-add')).click();
            element(by.model('forename')).clear().sendKeys("Test delete");
            element(by.model('surname')).clear().sendKeys("Dessez");
            element(by.model('contact')).clear().sendKeys("a@a.a");
            element(by.id('BtnAddUser')).click();

            $$('button.btn-danger').last().click();
            expect(element.all(by.repeater('user in users').column('user.forename')).last().getText()).not.toEqual('Test delete');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});