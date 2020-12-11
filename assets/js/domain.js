const userRef = db.collection("users");
const categoryRef = db.collection("categories");

/**
 * retrieve user info from firebase collection
 * @param {string} username 
 * @returns {object} will return null if there's no user
 */
async function GetUserByUsername(username) {
    let { docs: users } = await userRef.where("username", "==", username).get();
    if (users.length > 0) {
        return users[0].data()
    }
    return null
}

/**
 * add new user to database
 * this function does not prevent duplicated data
 * so make your own logic
 * @param {string} username
 * @param {string} password
 * @returns {null} if operations succeed and string if operation error
 */
async function AddNewUser(username, password) {
    try {
        await userRef.add({ username, password })
        return null
    } catch (error) {
        return error
    }
}

/**
 * get all category from collection
 * return zero length array if not found
 * @returns {Array}
 */
async function GetAllCategory() {
    let result = [];
    try {
        let { docs: categories } = await categoryRef.get();
        for (let c = 0; c < categories.length; c++) {
            result.push(categories[c].data());
        }
    } catch(error) {}
    return result;
}