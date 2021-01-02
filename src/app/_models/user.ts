import { Role } from "./role";

export class User {
    id: number;
    loginid: string;
    type: string;
    username: string;
    usertype: string;
    token?: string;
}