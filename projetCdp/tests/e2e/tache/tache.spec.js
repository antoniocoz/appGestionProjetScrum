describe("Task", function() {

    describe("setUp", function (){
        it("Initialize the task test", function() {
            browser.get('/#/home');

            element(by.model('title')).clear().sendKeys("Testsprint");
            element(by.model('description')).clear().sendKeys("Testsprint");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-test').last().click();

            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();
        });
    });

    describe("add", function (){
        it("should add a task", function(){
            $$('button.btn-add').last().click();

            element(by.model('numero')).clear().sendKeys("1");
            element(by.model('description')).clear().sendKeys("Test");
            element(by.model('dure')).clear().sendKeys("3");
            $('button.btn-primary').click();

            //element(by.id('aUS')).click();    
            $$('button.btn-test').last().click();
            $$('button.btn-detail').last().click();

            expect(element.all(by.repeater('tache in taches').column('tache.numero')).last().getText()).toEqual('1'); 
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).toEqual('Test'); 
            expect(element.all(by.repeater('tache in taches').column('tache.dure')).last().getText()).toEqual('3'); 

            element(by.id('aUS')).click();
        });
    });
    
    describe("details", function () {
        it("should shows all US's tasks", function(){
            var url = $$('a.testDetail').last().getAttribute("href")
            $$('button.btn-detail').last().click();
            expect(browser.getCurrentUrl()).toBe(url);           
        });
    });

    describe("update", function () {
         it("should update a task", function(){
            $$('button.btn-warning').last().click();
            element(by.model('tache.numero')).clear().sendKeys("5");
            element(by.model('tache.description')).clear().sendKeys("Test d\'update d\'une tache dans cette userstory xerdaq");
            element(by.model('tache.dure')).clear().sendKeys("5");
            $('button.btn-primary').click();

            expect(element.all(by.repeater('tache in taches').column('tache.numero')).last().getText()).toEqual('5'); 
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).toEqual('Test d\'update d\'une tache dans cette userstory xerdaq'); 
            expect(element.all(by.repeater('tache in taches').column('tache.dure')).last().getText()).toEqual('5'); 
        });
    });

    describe("delete", function (){
        it("should delete a task", function(){
            element(by.id('aUS')).click();
            $$('button.btn-add').last().click();

            element(by.model('numero')).clear().sendKeys("1");
            element(by.model('description')).clear().sendKeys("Test de suppression haha");
            element(by.model('dure')).clear().sendKeys("3");
            $('button.btn-primary').click();

               
            $$('button.btn-test').last().click();
            $$('button.btn-detail').last().click();

            $$('button.btn-danger').last().click();
            expect(element.all(by.repeater('tache in taches').column('tache.description')).last().getText()).not.toEqual('Test de suppression haha');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});