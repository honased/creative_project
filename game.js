function outputText(text) {
    var elem = document.getElementById("outbox");
    elem.value += text + "\n";
    elem.scrollTop = elem.scrollHeight;
}

function userInput() {
    var elem = document.getElementById("outbox");
    elem.value += "> ";
    elem.scrollTop = elem.scrollHeight;
}

function help()
{
    outputText("Help Section");
    outputText("--------------------------------------------------------------");
    outputText(" go [n/s/e/w]  - Go a direction");
    outputText(" grab [object] - Add object to inventory");
    outputText(" use [object]  - Use object either in inventory or the world");
    outputText(" inventory     - View inventory");
    outputText("--------------------------------------------------------------");
}

currentRoom = null;
player = null;

class Item
{
    constructor(name)
    {
        this.name = name;
    }
}

class Player
{
    constructor()
    {
        this.inventory = [];
    }

    printInventory(self)
    {
        outputText("Inventory");
        outputText("---------");
        for(var i = 0; i < this.inventory.length; i++)
        {
            outputText(" " + this.inventory[i].name);
        }
        outputText("---------");
    }
}

class Command
{
    constructor(names, command)
    {
        this.names = names;
        this.command = command;
    }

    canExecute(name) {
        for(var i = 0; i < this.names.length; i++)
        {
            if(this.names[i] == name)
            {
                return true;
            }
        }
        return false;
    }
}

class ParRoom
{
    constructor()
    {
        this.commands = [];
    }

    checkCommand(name) {
        for(var i = 0; i < this.commands.length; i++)
        {
            if(this.commands[i].canExecute(name))
            {
                this.commands[i].command();
                return true;
            }
        }
        return false;
    }
}

class Forest1_1 extends ParRoom
{
    constructor()
    {
        super();
        this.commands.push(new Command(['say hello'], (function () { outputText('Hi there!') })));
    }
}

function checkGeneralCommands(text)
{
    cmds = text.split(" ");

    switch(cmds.length)
    {
        case 1:
            if( text == "help" )
            {
                help();
                return true;
            }
            if( text == "inventory" )
            {

            }
            break;
    }

    return false;
}

currentRoom = new Forest1_1();

userInput();

function handleInput()
{
    var text = document.getElementById("command").value.trim();
    document.getElementById("command").value = "";
    outputText(text);
    var checkText = text.toLowerCase();
    if(!currentRoom.checkCommand(checkText) &&
       !checkGeneralCommands(checkText))
    {
        outputText("I don't know what '" + text + "' means.");
    }
    userInput();
}

document.querySelector("#enter_btn").addEventListener("click", function() {
    handleInput();
});

document.getElementById('command').addEventListener('keydown', function onEvent(e) {
    if(e.key === "Enter") {
        handleInput();
    }
});