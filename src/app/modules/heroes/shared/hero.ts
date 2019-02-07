export class Hero {
    idUser: string;
    name: string;
    type: string;
    agi: number = 1;
    str: number = 1;
    int: number = 1;
    role: string = "player";
    onlineStatus: boolean;
    
    /**
     * create a new Hero item with Name, Type and userId
     * @userId should be set to an empty string in case of a new hero
     * @type is up to you to define, to me it's 'int', 'str' or 'agi' (like most rpg's)
     * @name up to you
     */
    constructor(name: string, type: string, userId: string){
        this.name = name;
        this.type = type;
        this.idUser = userId;
    }

    /**
     * Edit an existing Hero name
     * @newName new hero name
     */
    rename(newName: string){
        this.name += newName;
    }

    /**
     * Edit an existing Hero type
     * @newType new hero type (up to you to define new types)
     */
    updateType(newType: string){
        this.type = newType;
    }

    /**
     * Edit an existing Hero stats
     * @stat the stat to increase
     * @int Intelligence attribute
     * @agi Agility attribute
     */
    newStats(stat: string){
        switch(stat){
            case 'str':
                this.str++
                break;
            case 'agi':
                this.agi++
                break;
            case 'int':
                this.int++
                break;
        }
    }
}
