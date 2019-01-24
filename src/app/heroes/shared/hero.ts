export class Hero {
    idUser: string;
    name: string;
    type: string;
    agi: number = 1;
    str: number = 1;
    int: number = 1;
    role: string = "player";

    constructor(name: string, type: string, userId: string){
        this.name = name;
        this.type = type;
        this.idUser = userId;
    }

    rename(newName: string){
        this.name += newName;
    }

    updateType(newType: string){
        this.type = newType;
    }
}
