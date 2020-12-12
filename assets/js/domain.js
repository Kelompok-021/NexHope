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
 * @param {string} creatorUsername to identify who's the user post this
 * @param {string} title of post
 * @param {string} imageURL of post
 */
async function InsertPost(id, creatorUsername, title, imageURL) {
    let document = { title, creatorUsername, imageURL };
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

/**
 * fetch all post from db
 * @param {string} id of category want to be fetched
 * @returns {Array.<Object>}
 */
async function GetAllPost(id) {
    let result = [];
    try {
        let {docs: post} = await postRef.
            doc(id).
            collection("post").get();
        post.forEach((row)=>{

            result.push({
                ...row.data(),
                id: row.id
            });
        })
    } catch (error) {}
    return result;
}

/**
 * add comment from specified post
 * @param {string} id of category want to be fetched    
 * @param {string} postID
 * @param {string} username of user who's comment
 * @param {string} comment
 * @returns {Array.<Object>}
 */
async function AddComment(id, postID, username, comment) {
    try {
        await postRef.
            doc(id).
            collection("post").
            doc(postID).
            collection("comments").
            add({
                username, comment,
                created: firebase.firestore.FieldValue.serverTimestamp()
            });
            return null;
    } catch (error) {
        return error;
    }
}

/**
 * listen every new comment
 * @param {string} id 
 * @param {string} postID 
 * @param {Function} callback 
 */
async function ListenFromComment(id, postID, callback) {
    try {
        await postRef.
            doc(id).
            collection("post").
            doc(postID).
            collection("comments").
            onSnapshot(function(snapshot) {
                snapshot.docChanges().forEach(({ type, doc: comment })=>{
                    if(type === "added") {
                        callback(comment.data());
                    }
                });
            });
            return null;
    } catch (error) {
        return error;
    }
}

/**
 * vote the post up, or down
 * @param {string} id of category
 * @param {string} postID 
 * @param {string} username 
 * @param {boolean} isUpvote 
 */
async function Vote(id, postID, username, isUpvote) {
    try {
        await postRef.
            doc(id).
            collection("post").
            doc(postID).
            collection("votes").
            doc(username).
            set({ isUpvote });
        return null;
    } catch (error) {
        return error;
    }
}