const userRef = db.collection("users");
const categoryRef = db.collection("categories");
const postRef = db.collection("posts");

/**
 * retrieve user info from firebase collection
 * @param {string} username 
 * @returns {object} will return null if there's no user
 */
async function GetUserByUsername(username) {
    let { docs: users } = await userRef.where("username", "==", username).get();
    if (users.length > 0) {
        let user = users[0];
        return {
            id: user.id,
            ...(user.data()),
        }
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
 * update partial user document
 * @param {string} username of specified user
 * @param {string} key of document user want to be updated
 * @param {any} value of updated document
 */
async function UpdateUserField(username, key, value) {
    let updatedField = {};
    updatedField[key] = value;
    let { docs: users } = await userRef.where("username", "==", username).get();
    if (users.length > 0) {
        await users[0].ref.update(updatedField);
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
            let data = categories[c].data();
            data.id = categories[c].id;
            result.push(data);
        }
    } catch(error) {}
    return result;
}

/**
 * insert post by documents
 * @param {string} id of category to document want to be insert
 * @param {string} creatorID to identify who's the user post this
 * @param {string} title of post
 * @param {string} imageURL of post
 */
async function InsertPost(id, creatorID, title, imageURL) {
    let document = { title, creatorID, imageURL };
    try {
        await postRef.
            doc(id).
            collection("post").
            add(document);
        return null;
    } catch (error) {
        return error;
    }
}