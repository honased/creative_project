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
gagVisited = false;

class Item
{
    constructor(name, pickable)
    {
        this.name = name;
        this.pickable = pickable;
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
        this.items = [];

        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
    }

    getDescription() {
        return "Uh oh, I'm the par room!";
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

class StartingArea extends ParRoom
{
    constructor()
    {
        super();
        this.commands.push(new Command(['say hello'], (function () { outputText('Hi there!') })));
        this.west = new GagArea();
        this.west.east = this;
        this.north = new ForestPath1();
        this.north.south = this;
        this.visited = false;
    }

    getDescription()
    {
        if(gagVisited)
        {
            this.west = null;
            return "You stand in the middle of a clearing in a forest. There appears to be a path to the north. You also see a broken sign. It appears that someone has destroyed it knowing that there is no story out west...";
        }
        return "You stand in the middle of a clearing in a forest. There appears to be a path to the north. You also see a sign with the text 'Gag Area West'.";
    }
}

class GagArea extends ParRoom
{
    constructor()
    {
        super();
        this.index = -1;
        this.west = this;
    }

    getDescription()
    {
        this.index += 1;
        gagVisited = true
        switch(this.index)
        {
            case 0: return "You stand in an area known as 'Gag Area'. You see a sign with the text 'Go West and you'll end up back here'. That seems like a stupid idea and a waste of time. You see a path East to leave this area.";
            case 1: return "You arrive back in the same 'Gag Area'. Well, that was a fun waste of time. Shall we head back?";
            case 2: return "This is pointless. It's clearly a meaningless gag created by the developer who was bored. I think we shouldn't satisfy the developer's childish behavior, so let's head east.";
            case 3: return "At this point, I don't know if you are sane. If you're not sane, you shouldn't be playing this game. Show me that you are mentally ok and head east.";
            case 4: return "I have a whole story created for you if you just head east. Don't you want to see it?";
            case 5: return "You're hurting my feelings. I spent hours and hours thinking up this story just for you?";
            case 6: return "Are you just doing this to see what more story there is? Or, do you think there is a secret ending here in this 'Gag Area'? I can tell you now, there isn't...";
            default: return "...";
        }

    }
}

class ForestPath1 extends ParRoom
{
    constructor()
    {
        super();
        this.chalkItem = new Item("Chalk", true);
        this.items.push(this.chalkItem);
        this.north = new Clearing();
        this.north.south = this;
    }

    getDescription()
    {
        var retText = "You stop in the middle of a worn path in the forest.";
        if(this.items.includes(this.chalkItem)) retText += " As you gaze around, something catches your artist eye. A small piece of chalk lies right off the path."
        retText += " You see an opening both north and south of you.";
        return retText;
    }
}

class Clearing extends ParRoom
{
    constructor()
    {
        super();
        this.east = new ForestPath2();
        this.east.west = this;
        this.north = new Zelinsky();
        this.north.south = this;
    }

    getDescription()
    {
        return "You encounter a clearing in the forest. To the north, you can see a decaying building off in the distance. There also appears to be paths west, east, and south of you.";
    }
}

class ForestPath2 extends ParRoom
{
    constructor()
    {
        super();
        this.east = new ForestPath3();
        this.east.west = this;
    }

    getDescription()
    {
        return "You stand in the middle of a path with openings to the east and west of you.";
    }
}

class ForestPath3 extends ParRoom
{
    constructor()
    {
        super();
        this.south = new ForestPath4();
        this.south.north = this;
    }

    getDescription()
    {
        return "You stand in the middle of a path with openings to the west and south of you.";
    }
}

class ForestPath4 extends ParRoom
{
    constructor()
    {
        super();
        this.south = new ForestPath5();
        this.south.north = this;
    }

    getDescription()
    {
        return "You stand in the middle of a path with openings to the north and south of you.";
    }
}

class ForestPath5 extends ParRoom
{
    constructor()
    {
        super();
        this.south = new ForestPath6();
        this.south.north = this;
    }

    getDescription()
    {
        return "You stand in the middle of a path with openings to the north and south of you.";
    }
}

class ForestPath6 extends ParRoom
{
    constructor()
    {
        super();
        this.west = new Clearing2();
        this.west.east = this;
    }

    getDescription()
    {
        return "You stand in the middle of a path with openings to the north and west of you.";
    }
}

class Clearing2 extends ParRoom
{
    constructor()
    {
        super();
    }

    getDescription()
    {
        return "You arrive in a clearing where you see a child and a dog eating pancakes. This somehow feels peaceful, yet you are not sure if this is a hallucination. You notice a path that leads back east.";
    }
}

class Zelinsky extends ParRoom
{
    constructor()
    {
        super();
        this.keypad = new Item("Keypad", false);
        this.items.push(this.keypad);
    }

    getDescription()
    {
        var retText = "You see an old building just north of you with the text \"Zelinsky's\" adorning the space above the door."
        if( this.items.includes(this.keypad) ) retText += " The door appears to be locked. You notice a keypad near the door that might unlock it.";
        retText += " Otherwise, you see a path leading back south to a clearing in the forest.";
        return retText;
    }
}

function grab(item)
{
    if(item != null && item.length > 0)
    {
        for(var i = 0; i < currentRoom.items.length; i++)
        {
            if(currentRoom.items[i].name.toLowerCase() == item)
            {
                player.inventory.push(currentRoom.items[i]);
                currentRoom.items.splice(i, 1);
                outputText("You picked up the " + item + ".");
                return;
            }
        }
    }
    outputText("There doesn't appear to be " + item + ".");
}

function goDirection(direction)
{
    if(direction != null && direction.length > 0)
    {
        var room = null;
        switch(direction[0])
        {
            case 'n':
                room = currentRoom.north;
                break;

            case 's':
                room = currentRoom.south;
                break;

            case 'e':
                room = currentRoom.east;
                break;

            case 'w':
                room = currentRoom.west;
                break;

            default:
                outputText("I'm not familiar with the direction '" + direction + "'.");
                return;
        }

        if(room == null)
        {
            outputText("You can't go that direction...");
        }
        else
        {
            currentRoom = room;
            outputText(currentRoom.getDescription());
        }
    }
    else
    {
        outputText("I need a direction [n, s, e, w] if we're going to go somewhere...");
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
                player.printInventory();
                return true;
            }
            break;

        case 2:
            if( cmds[0] == "go" )
            {
                goDirection(cmds[1]);
                return true;
            }
            if( cmds[0] == "grab" )
            {
                grab(cmds[1]);
                return true;
            }
            break;
    }

    return false;
}

currentRoom = new StartingArea();
player = new Player();

outputText("You are an arist. At least, you think you are. Nothing you've done ever seems to get much attention, and you doubt your abilities. Needing a refresh, you decided to venture out into the woods to reinvigorate your mind and soul. However, you have gotten lost and can't seem to find your way out. While it is day now, it will get dark soon, and you have heard rumors about the forest at night...\n\nTHE ADVENTURE BEGINS\n");

outputText(currentRoom.getDescription());

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