import { Client, ID, Account } from "appwrite";

export class authclass {
    client = new Client();
    account;

    constructor() {
        this.account = new Account(this.client);
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_URL));
        this.client.setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
    }

    async createAccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password);
            if (useraccount) {
                // call login method
                return this.login({ email, password });
            }
            else {
                // call logout method
                this.logout();
                return null;
            }
        }
        catch (e) {
            confirm("Error creating account for email: " + e);
        }
    }

    async login({ email, password }) {
        try {
            const useraccount = await this.account.createEmailPasswordSession(email, password);
            if (useraccount) {
                // save user account to local storage
                localStorage.setItem('userAccount', JSON.stringify(useraccount));
                return useraccount;
            }
            else {
                // call logout method
                this.logout();
                return null;
            }
        }
        catch (e) {
            confirm("Error logging in with email: " + e);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            localStorage.removeItem('userAccount');
        }
        catch (e) {
            confirm("Error logging out: " + e);
        }
    }

    async getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
}




const authobj = new authclass();
export default authobj;

