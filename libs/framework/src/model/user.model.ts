import { Deserializable } from './deserializable.model';

export class User {
    userid: string;
    image: any;
    firstName: string;
    lastName: string;
    emailId: string;
    address: string;
    contactNo: string;
    timezone: string;
    country: string;
    gender: string;
    employeeId: string;
    companyId: string;
    joiningDate: string;
    confirmationDate: string;
    designation: string;
    department: string;
    nationality: string;
    prDate: string;
    terminationDate: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
