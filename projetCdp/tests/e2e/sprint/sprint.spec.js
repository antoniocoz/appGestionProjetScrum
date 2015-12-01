describe("Sprint", function() {
    var url;

    describe("setUp", function (){
        it("Initialize the sprint test", function() {
            browser.get('/#/home');
            
            element(by.id('btn-addBl')).click();

            element(by.model('title')).clear().sendKeys("Testsprint");
            element(by.model('description')).clear().sendKeys("Testsprint");
            element(by.id('BtnAddBacklog')).click();

            $$('button.btn-detail').last().click();

            element(by.id('btn-addUS')).click();

            element(by.model('body')).clear().sendKeys("Test");
            element(by.model('priority')).clear().sendKeys("2");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            element(by.id('btn-addUS')).click();

            element(by.model('body')).clear().sendKeys("Object");
            element(by.model('priority')).clear().sendKeys("3");
            element(by.cssContainingText('option', '5')).click();
            element(by.id('BtnAddUserstory')).click();

            $$('button.btn-detail').last().click();
            element(by.id('btn-add')).click();

            element(by.model('numero')).clear().sendKeys("1");
            element(by.model('description')).clear().sendKeys("Test");
            element(by.model('dure')).clear().sendKeys("3");
            element(by.id('btn-add')).click();

            element(by.id('btn-add')).click();

            element(by.model('numero')).clear().sendKeys("2");
            element(by.model('description')).clear().sendKeys("Test2");
            element(by.model('dure')).clear().sendKeys("5");
            element(by.id('btn-add')).click();   

            $$('button.btn-edit').last().click();
            element(by.model('tache.delaiplustot')).clear().sendKeys("1");
            element(by.model('tache.delaiplustard')).clear().sendKeys("3");
            element(by.cssContainingText('option', 'Doing')).click();
            element.all(by.repeater('t in taches')).first().click();
            element(by.id('btn-update')).click();   
            element(by.id('aUS')).click();

            element(by.id('aUser')).click();
            element(by.id('btn-add')).click();
            element(by.model('forename')).clear().sendKeys("Arthur");
            element(by.model('surname')).clear().sendKeys("Dessez");
            element(by.model('contact')).clear().sendKeys("a@a.a");
            element(by.id('BtnAddUser')).click();
            element(by.id('aUS')).click();
        });
    });

    describe("add", function (){
        it("should add a sprint", function(){
            url = element(by.id('aSprint')).getAttribute("href");
            element(by.id('aSprint')).click();
            element(by.id('btn-addSprint')).click();
            element(by.model('title')).clear().sendKeys("Test");
            element(by.id('btn-add')).click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).toEqual('Test'); 
        });
    });

    describe("add_canceled", function (){
        it("should cancel an adding of a sprint", function(){
            element(by.id('btn-addSprint')).click();
            element(by.id('btn-cancelledSprint')).click();

            expect(browser.getCurrentUrl()).toBe(url);      
        });
    });

    describe("update", function () {
        it("should update a sprint", function(){
            $$('button.btn-editSprint').last().click();
            element(by.model('title')).clear().sendKeys("Test Update, impossible que le nom d\'un titre soit ça xrtrz");
            element(by.id('btn-edit')).click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).toEqual('Test Update, impossible que le nom d\'un titre soit ça xrtrz'); 
        });
    });

    describe("update_canceled", function (){
        it("should cancel an updating of a sprint", function(){
           $$('button.btn-editSprint').last().click();
            element(by.id('btn-cancelledSprint')).click();

            expect(browser.getCurrentUrl()).toBe(url);      
        });
    });
    
    describe("addUS", function () {
        it("should add an US in a sprint", function(){
            $$('button.btn-addUS').last().click();
            element(by.cssContainingText('option', 'Test')).click();
            element(by.cssContainingText('option', 'Object')).click();
            element(by.id('btn-addUSclick')).click();
            
            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).toEqual('Object');   
        });
    });

    describe("addUS_canceled", function (){
        it("should cancel an adding of an US in a sprint", function(){
            $$('button.btn-addUS').last().click();
            element(by.id('btn-cancelledAddUs')).click();

            expect(browser.getCurrentUrl()).toBe(url);      
        });
    });

    describe("deleteUS", function (){
        it("should delete an us in a sprint", function(){
            $$('button.btn-deleteUS').last().click();

            expect(element.all(by.repeater('us in userStories').column('us.body')).last().getText()).not.toEqual('Object');   
        });
    });

    describe("KANBAN", function (){
        it("should show a Kanban chart in a sprint", function(){

            $$('button.btn-addUS').last().click();
            element(by.cssContainingText('option', 'Object')).click();
            element(by.id('btn-addUSclick')).click();

            var urlKanban = $$('a.kanban').last().getAttribute("href");
            $$('button.btn-kanban').last().click();

            expect(browser.getCurrentUrl()).toBe(urlKanban);   
            element(by.id('aSprint')).click(); 
        });
    });

    describe("PERT", function (){
        it("should show a PERT chart in a sprint", function(){
            var urlKanban = $$('a.pert').last().getAttribute("href");
            $$('button.btn-showPert').last().click();

            expect(browser.getCurrentUrl()).toBe(urlKanban); 
            element(by.id('aSprint')).click();    
        });
    });

     describe("GANTT", function (){
        it("should show a Gantt chart in a sprint", function(){
            $$('button.btn-gantt').last().click();
            element(by.id('btn-add')).click();
            $$('button.btn-addUS').last().click();
            element.all(by.repeater('task in tasks')).first().click();
            element(by.id('btn-addUSclick')).click();

            expect(element.all(by.repeater('t in tasks').column('t.description')).last().getText()).toEqual('Test');   

            element(by.id('btn-add')).click();
            element(by.id('aSprint')).click(); 
        });
    });

    describe("delete", function (){
        it("should delete a sprint", function(){
            $$('button.btn-deleteUS').last().click();

            element(by.id('btn-addSprint')).click();
            element(by.model('title')).clear().sendKeys("Test de suppression haha");
            element(by.id('btn-add')).click();

            $$('button.btn-danger').last().click();

            expect(element.all(by.repeater('sp in sprints').column('sp.title')).last().getText()).not.toEqual('Test de suppression haha');

            // Delete the set up
            browser.get('/#/home');
            $$('button.btn-danger').last().click();
        });
    });
});