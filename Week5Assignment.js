class Cupcake {
    constructor(flavor, filling) {
        this.flavor = flavor;
        this.filling = filling;
    }
    describe() {
        return `The cupcake you chose is ${this.flavor} with a ${this.filling} filling.`;    
    }
}

class DessertTable {
    constructor(name) {
        this.name = name;
        this.cupcakes = [];
    }

    addCupcake(cupcake) {
        if (cupcake instanceof Cupcake) {
            this.cupcakes.push(cupcake);
        } else {
            throw new Error (`You can only add an instance of Cupcake. Argument is not a cupcake: ${cupcake}.`);
        }
    }

    describe() {
        return `The ${this.name} dessert table has ${this.cupcakes.length} kinds of cupcakes.`;
}
}

class Menu {
    constructor () {
        this.dessertTable = [];
        this.selectedDessertTable = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !=0) {
            switch (selection) {
                case '1':
                    this.createDessertTable();
                    break;
                case '2':
                    this.viewDessertTable();
                    break;
                case '3':
                    this.displayDessertTable();
                    break;
                case '4':
                    this.overturnDessertTable();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ('Your selection is invalid. Try again.')
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Dessert Table
        2) View Dessert Table
        3) Display All Dessert Tables
        4) Overturn Dessert Table
        `);
    }

    showDessertTableMenuOptions(dessertTableInfo) {
        return prompt(`
        0) back
        1) Create cupcake
        2) Eat a cupcake
        --------------------
        ${dessertTableInfo}
        `);
    }

    displayDessertTable() {
        let dessertTableString = '';
        for (let i = 0; i < this.dessertTable.length; i++) {
            dessertTableString += i + ')' + this.dessertTable[i].name + '\n'; 
        }
        alert(dessertTableString);
    }

    createDessertTable() {
        let name = prompt('Give your dessert table the name of a color.');
        this.dessertTable.push(new DessertTable(name));
    }

    viewDessertTable() {
        let index = prompt('Enter the number of the Dessert Table you wish to view.');
        if (index > -1 && index < this.dessertTable.length){
            this.selectedDessertTable = this.dessertTable[index];
            let description = 'Dessert Table Name: ' + this.selectedDessertTable.name + '\n';

            for (let i = 0; i < this.selectedDessertTable.cupcakes.length; i++) {
                description += i + ') ' + this.selectedDessertTable.cupcakes[i].flavor + ' - ' + this.selectedDessertTable.cupcakes[i].filling + '\n';

            }
            let selection = this.showDessertTableMenuOptions(description);
            switch(selection) {
                case '1':
                    this.createCupcake();
                    break;
                case '2':
                    this.eatCupcake();

            }
        }   
    }
    
    overturnDessertTable(){
        let index = prompt ('What dessert table do you want to overturn in rage?');
        if (index > -1 && index < this.dessertTable.length) {
            this.dessertTable.splice(index, 1);
        }
    }


    createCupcake() {
        let flavor = prompt ('What flavor of cupcake would you like to make?');
        let filling= prompt ('What type of filling would you like for your cupcake?');
        this.selectedDessertTable.cupcakes.push(new Cupcake(flavor, filling));
    }

    eatCupcake() {
        let index = prompt ('What cupcake would you like to devour with your pie-hole?')
        if (index > -1 && index < this.selectedDessertTable.cupcakes.length) {
            this.selectedDessertTable.cupcakes.splice(index, 1);
        }
    }
}    

let menu = new Menu();
menu.start();