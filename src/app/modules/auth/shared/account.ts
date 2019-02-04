import { Hero } from '../../heroes/shared/hero'

export class Account {
    idUser: string;
    displayName: string;
    email: string;
    role: string = 'user' ;
    creationDate: string;
    hero: Hero

    constructor(email: string, userId: string, createDate: string){
        this.idUser = userId;
        this.email = email;
        this.creationDate = createDate;
    }

    addHero(hero: Hero){
        this.hero = hero ;
    }
}
