import { conf } from '../conf/conf';
import { Client, Account, Id } from 'appwrite';

export class AuthServive{

    client = new Client();
    account = new Account();

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // your API EndPoint 
            .setProject(conf.appwriteProjectId) // Your Project Id
    }

}