describe("Task", function() {
    var url;

    describe("setUp", function (){
        it("Initialize the task test", function() {
            browser.get('/#/home');

            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("Testtache");
            element(by.model('description')).clear().sendKeys("Testtache");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-detail').last().click();

            element(by.id('btn-addUS')).click();

            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            $$('button.btn-detail').last().click();          
        });
    });

   describe("add", function (){
        it("should add a task", function(){
            element(by.id('btn-add')).click();

            element(by.model('numero')).clear().sendKeys("1");
            element(by.model('description')).clear().sendKeys("Test");
            element(by.model('dure')).clear().sendKeys("3");
            element(by.id('btn-add')).click();

            expect(element.all(by.repeater('tache in taches').column('tache.numero')).last().getText()).toEqual('1'); 
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).toEqual('Test'); 
            expect(element.all(by.repeater('tache in taches').column('tache.dure')).last().getText()).toEqual('3'); 
        });
    });

    describe("add_canceled", function (){
        it("should cancel an adding of a task", function(){ 
            element(by.id('btn-add')).click();
            url = $$('a.testDetail').last().getAttribute("href");
            element(by.id('btn-cancelled')).click();

            expect(browser.getCurrentUrl()).toBe(url);         
        });
    });
    
    describe("update", function () {
         it("should update a task", function(){
            $$('button.btn-edit').last().click();
            element(by.model('tache.numero')).clear().sendKeys("5");
            element(by.model('tache.description')).clear().sendKeys("Test d\'update d\'une tache dans cette userstory xerdaq");
            element(by.model('tache.dure')).clear().sendKeys("5");
            element(by.id('btn-update')).click();

            expect(element.all(by.repeater('tache in taches').column('tache.numero')).last().getText()).toEqual('5'); 
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).toEqual('Test d\'update d\'une tache dans cette userstory xerdaq'); 
            expect(element.all(by.repeater('tache in taches').column('tache.dure')).last().getText()).toEqual('5'); 
        });
    });

     describe("update_canceled", function (){
        it("should cancel an updating of a task", function(){ 
            $$('button.btn-edit').last().click();
            element(by.id('btn-cancelledEdit')).click();

            expect(browser.getCurrentUrl()).toBe(url);         
        });
    });

    describe("delete", function (){
        it("should delete a task", function(){
            element(by.id('btn-add')).click();

            element(by.model('numero')).clear().sendKeys("1");
            element(by.model('description')).clear().sendKeys("Test de suppression haha");
            element(by.model('dure')).clear().sendKeys("3");
            element(by.id('btn-add')).click();

            $$('button.btn-delete').last().click();
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).not.toEqual('Test de suppression haha');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});