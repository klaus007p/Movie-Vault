import { conf } from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

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
            
            throw error;
        }
    }

    // Login In User Account

    async login({ email, password }){
        try {
            return await this.account.createEmailPasswordSession(email, password);   // Email and Pass.. Sessions are created
        } catch (error) {
            throw error;  // If login failed throws an error
        }
    }

    // Get Current User 

    async getCurrentUser() {
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service Failed! Can't Fetch User Details", error);
            
        }

        return null;
    }

    // Logout From User Account

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service Failed! Can't Fetch User Details", error);
            
        }
    }

}


const authServive = new AuthServive() // Creates a new session

export {authServive};;