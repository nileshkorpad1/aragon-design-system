export class Wtf2Permission {
    name: string;
    validationFunction?: Function;

    constructor(name: string, validationFunction: Function) {
        this.name = name;
        this.validationFunction = validationFunction;
    }

}
