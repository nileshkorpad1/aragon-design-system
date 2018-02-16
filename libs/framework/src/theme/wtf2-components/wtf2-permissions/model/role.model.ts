export class Wtf2Role {
    name: string;
    validationFunction: Function | string[];

    constructor(name: string, validationFunction: Function | string[]) {
        this.name = name;
        this.validationFunction = validationFunction;
    }
}
