const userRef = db.collection("users");

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
