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

            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).toEqual('Test'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.description')).last().getText()).toEqual('Test'); 
        });
    });

    describe("update", function () {
         it("should update a backlog", function(){
            $$('button.btn-warning').last().click();
            element(by.model('title')).clear().sendKeys("Test Update, impossible que le nom d\'un titre soit ça xrtrz");
            element(by.model('description')).clear().sendKeys("Test Update");
            element(by.id('BtnEditBacklog')).click();

            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz'); 
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.description')).last().getText()).toEqual('Test Update'); 
        });
    });
    
    describe("details", function () {
        it("should shows backlog's details", function(){
            var url = $$('a.testDetail').last().getAttribute("href")
            $$('button.btn-test').last().click();
            expect(browser.getCurrentUrl()).toBe(url);           
        });
    });

    describe("delete", function (){
        it("should delete a backlog", function(){
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
            expect(element.all(by.repeater('backlog in backlogs').column('backlog.title')).last().getText()).not.toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz');
        });
    });
});