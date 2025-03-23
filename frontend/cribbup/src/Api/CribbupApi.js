import axios from "axios";

const API_BASE_URL = "http://localhost:3000";


class CribbUpApi {
    // the token for interactive with the API will be stored here.

    static token = localStorage.getItem("token");

    static async request(endpoint, data = {}, method = "get") {
        console.log("🟢 ENTERED request() method"); // ✅ This should always print

        console.debug("API Call:", endpoint, data.method);

        const url = `${API_BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${CribbUpApi.token}` };

        console.log("Request URL:", url);
        console.log("Headers:", headers);


        axios.defaults.headers.common['Cache-Control'] = 'no-cache';


        const params = method === "get" ? data : {};

        try {
            console.log("🔗 Sending API request:", { url, method, data, params, headers });

            const res = await axios({ url, method, data, params, headers });
            console.log("📥 Full API Response:", res);

            if (!res || !res.data) {
                throw new Error("🚨 Response is undefined or missing data property.");
            }

            return res.data;

        } catch (err) {
            console.error("🚨 API Error:", err.response ? err.response.data : err.message);
            let message = err.response?.data?.error?.message || "Unknown error";
            throw Array.isArray(message) ? message : [message];
        }
    }


    // static async request(endpoint, data = {}, method = "get") {
    //     console.debug("API Call:", endpoint, data.method);

    //     const url = `${API_BASE_URL}/${endpoint}`;
    //     const headers = { Autrhorization: `Bearer ${CribbUpApi.token}` };

    //     const params = (method === "get")
    //         ? data : {};

    //     try {

    //         const res = (await axios({ url, method, data, params, headers })).data;

    //         return res.data;

    //     } catch (err) {
    //         console.error("API Error:", err.response);
    //         let message = err.response.data.error.message;
    //         throw Array.isArray(message) ? message : [message];
    //     }
    // }

    // Get and extract properties based on location.
    /**
     * 
     * 
 * Fetch properties from the backend based on location.
 * @param {string} location - City name or ZIP code
 * @param {number} page - Current page number
 * @param {number} limit - Number of properties per page
 * @returns {Promise<object[]>} - List of properties
 */
    // static async searchProperties(location, page = 1, limit = 12) {

    //     try {
    //         const res = await axios.get(`${API_BASE_URL}/cribbup/search`, {
    //             params:
    //                 { location, page, limit }
    //         })

    //         return res.data;

    //     } catch (err) {
    //         console.error("Error getting properties", err);
    //         throw new Error("Failed to load properties")
    //     }
    // };

    // GET Details of a Building.
    /**
     * Fetch properties from the backend based on location.
     * @param {number} zpid - The zpid of a building.
     * @returns {Promise<object[]>} - Building Details.
     */

    static async searchProperties(location, page = 1, limit = 12) {
        try {
            console.log("📤 Sending property search request:", { location, page, limit });

            const res = await this.request("cribbup/search", { location, page, limit }, "get");

            console.log("📩 Received property search response:", res);

            if (!res || !res.properties) {
                throw new Error("❌ No properties found in response.");
            }

            return res;

        } catch (err) {
            console.error("🚨 Error fetching properties:", err);
            throw new Error("Failed to load properties");
        }
    };


    // Gets main details of a building
    static async propertiesDetails(zpid) {

        console.log("THIS ZPID FROM API", zpid);

        try {

            const res = await this.request("cribbup/property", { zpid }, "get")

            // const res = await axios.get(`${API_BASE_URL}/cribbup/property`, {
            //     params:
            //         { zpid }

            // })

            return res.data;

        } catch (err) {
            console.error("Hey something is wrong with this building", err);
            throw new Error("Failed to load building.")
        };
    }


    /** Login user  */
    static async login(username, password) {
        try {

            console.log("Running with", username, password)

            let res = await this.request("auth/token", { username, password }, "post");

            if (!res || !res.token) {
                throw new Error("Invalid response: No token received");
            }

            this.token = res.token;
            localStorage.setItem("token", res.token);
            return res;

        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    };

    /** Authenticat and logs in user */
    static async authenticateUser(username, password) {

        console.log("AUTH DETAILS", username, password)

        try {
            let res = await this.request("auth/token", { username, password }, "post");

            // const res = await axios.post(`${API_BASE_URL}/signup`, username, password);

            console.log("THIS IS RES", res)

            const { token } = res //Extract the token from the response.

            this.token = res.token;

            localStorage.setItem("token", token);

            const k = localStorage.getItem("token")

            console.log("CHECK IF TOKEN WAS INDEED STORED:", k)

            //console.log("THIS IS TOKEN WHEN AUTHENTICATE FAILS:", token)

            return token;

        } catch (err) {
            console.error("Error authenticating user", err);
            throw err;
        }
    }

    // Signs up users.
    // static async signup(userData) {

    //     try {
    //         // The 'userData' object should contain { username, firstName, lastName, email }
    //         let res = await this.request("auth/register", userData, "post");
    //         this.token = res.token

    //         console.log("THIS REGISTRATION RES", res)

    //         //localStorage.setItem("token", res.token);

    //         return res.token;

    //     } catch (error) {

    //         console.error("Error registering user:", error);
    //         throw error;
    //     }

    // };

    static async signup(userData) {
        try {

            let res = await this.request("auth/register", userData, "post");


            if (!res) {
                throw new Error("API did not return a response.");
            }
            if (!res.token) {
                throw new Error(`API Response Missing Token: ${JSON.stringify(res)}`);
            }

            this.token = res.token;
            localStorage.setItem("token", res.token);

            return res.token;

        } catch (error) {
            console.error("⚠️ Error during signup:", error);
            throw error;
        }
    }

    /** Get a user as an admin */
    // static async getUser(username) {
    //     return await this.request(`users/${username}`);
    // }

    static async getUser(username) {

        console.log("HELLO FROM GETUSER FUNCTION")

        if (!this.token) {
            console.error("No token available. Cannot fetch user.");
            return null;
        }

        if (!username) {
            console.error("Username is undefined. Ensure it is being passed correctly.");
            return null;
        }

        try {

            console.log("THIS IS USER AFTER DECODED", username)

            const res = await this.request(`users/${username}`);
            return res;

        } catch (err) {
            console.error("Error fetching user:", err);
            return null;
        }
    }

    /** Update user's profile */
    // static async updateUser(username, userData) {
    //     return await this.request(`users/${username}`, userData, "patch");
    // }

    static async editProfile(userData, username) {
        try {
            // Make the API request to update user data
            let res = await this.request(`users/${username}`, userData, "patch");

            // Save the updated token to localStorage (if available)
            if (res.token) {
                localStorage.setItem("token", res.token);
            }

            return res.user;
        } catch (error) {
            console.error("Error editing profile:", error);
            throw error;
        }
    };

}



export default CribbUpApi;