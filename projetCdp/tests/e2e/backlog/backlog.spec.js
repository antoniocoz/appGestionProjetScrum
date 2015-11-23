describe("Backlog", function() {

    describe("index", function (){
        it("should display the correct title", function() {
            browser.get('/#/home');
            expect(browser.getTitle()).toBe('Environnement de developpement');
        });
    });

    describe("add", function (){
        it("should add a backlog", function(){
            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("Test");
            element(by.model('description')).clear().sendKeys("Test");
            element(by.model('link')).clear().sendKeys("Test");
            element(by.id('BtnAddBacklog')).click();

            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).toEqual('Test'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.description')).last().getText()).toEqual('Test'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.gitlink')).last().getText()).toEqual('Test');
        });
    });

    describe("add_canceled", function (){
        it("should cancel an adding of a backlog", function(){
            element(by.id('btn-addBl')).click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/home');      

        });
    });

    describe("update", function () {
         it("should update a backlog", function(){
            $$('button.btn-edit').last().click();
            element(by.model('title')).clear().sendKeys("Test Update, impossible que le nom d\'un titre soit ça xrtrz");
            element(by.model('description')).clear().sendKeys("Test Update");
            element(by.model('link')).clear().sendKeys("Test Update");
            element(by.id('BtnEditBacklog')).click();

            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.description')).last().getText()).toEqual('Test Update'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.gitlink')).last().getText()).toEqual('Test Update'); 
        });
    });

     describe("update_canceled", function (){
        it("should cancel an updating of a backlog", function(){
           $$('button.btn-edit').last().click();
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/#/home');      

        });
    });
    
    describe("details", function () {
        it("should shows backlog's details", function(){
            var url = $$('a.testDetail').last().getAttribute("href");
            $$('button.btn-detail').last().click();
            expect(browser.getCurrentUrl()).toBe(url);           
        });
    });

    describe("delete", function (){
        it("should delete a backlog", function(){
            browser.get('/#/home');

            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("Test delete");
            element(by.model('description')).clear().sendKeys("Test delete");
            element(by.model('link')).clear().sendKeys("Test delete");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-danger').last().click();
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).not.toEqual('Test delete');

            $$('button.btn-danger').last().click();
        });
    });
});