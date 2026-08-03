import { conf } from '../conf/conf';
import { Client, Account, Id } from 'appwrite';

export class AuthServive{

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // your API EndPoint 
            .setProject(conf.appwriteProjectId) // Your Project Id

        this.account = new Account(this.client)
    }

    // Account Creation with Appwrite

    async createAccount({ email, password, userName}) {
        try {

            const userAccount = await this.account.create
            (ID.unique(), email, password, userName);
            
            if(userAccount) {
                return this.login({ email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Invalid Account Details: ", error);
            // throw error
        }
    }

    // Login In Account

}