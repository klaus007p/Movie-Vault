import { Client, Account } from 'appwrite';
import { conf } from '../conf/conf';

export class UserService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            return null;
        }
    }

    async updateName(name) {
        try {
            return await this.account.updateName(name);
        } catch (error) {
            throw error;
        }
    }

    async updateEmail(email, password) {
        try {
            return await this.account.updateEmail(email, password);
        } catch (error) {
            throw error;
        }
    }
}

const userService = new UserService();
export { userService };