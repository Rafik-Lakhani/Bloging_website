import { Client, ID, Databases, Storage, Query } from "appwrite";


export class PostServicecls {
    client = new Client();
    db = new Databases(this.client);
    storage = new Storage(this.client);

    constructor() {
        this.client.setEndpoint(String(import.meta.env.VITE_APPWRITE_URL));
        this.client.setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
    }

    async createpost({ title, slug, content, featuredimage, status, userid }) {
        try {
            const post = await this.db.createDocument(
            String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
            String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), slug, {
                title,
                content,
                featuredimage,
                status,
                userid,
            })
            return post;
        } catch (error) {
            console.log(error);
        }
    }


    async updatepost({ title, slug, content, featuredimage, status }) {
        try {
            const post = await this.db.updateDocument(String(import.meta.env.VITE_APPWRITE_DATABASE_ID), String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), slug, {
                title,
                content,
                featuredimage,
                status,
            })
            return post;
        } catch (error) {
            console.log(error);
        }

    }

    async deletepost(slug) {
        try {
            const post = await this.db.deleteDocument(String(import.meta.env.VITE_APPWRITE_DATABASE_ID), String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), slug)
            return post;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getsinglepost(slug) {
        try {
            return await this.db.getDocument(String(import.meta.env.VITE_APPWRITE_DATABASE_ID), String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), slug);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async getallpost() {
        try {
            const query = [Query.equal("status", ["active"])];
            return await this.db.listDocuments(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
                query);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getpostbyuserid(userid) {
        try {
            const query = [Query.equal({ 'userid': userid })];
            return await this.db.listDocuments(String(import.meta.env.VITE_APPWRITE_DATABASE_ID), String(import.meta.env.VITE_APPWRITE_COLLECTION_ID), query);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // file upload function

    async uploadfile(file) {
        try {
            const fileData = await this.storage.createFile(
                String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
                ID.unique(),
                file
            );
            return fileData;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // file delete function

    async deletefile({fileId}) {
        try {
            await this.storage.deleteFile(String(import.meta.env.VITE_APPWRITE_BUCKET_ID), fileId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // file download function

    // get file function
     getfile(fileId){
        const fileurl=this.storage.getFilePreview(
            String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
            fileId,
        )
        return fileurl;
    }
}

const PostService = new PostServicecls();

export default PostService;