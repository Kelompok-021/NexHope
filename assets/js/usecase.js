/**
 * function that takes no param
 * and retrieve input
 * will register when no user found
 * and login when found
 */
async function SSO() {
    let username = GetTextFromInput("username");
    let password = GetTextFromInput("password");
    try {
        let user = await GetUserByUsername(username);
        if(user) {
            if(user.password == password) {
                UpdateCookies("userInfo", user);
                ToLocation("/activity");
            } else {
                SetParagraphText("status", "Your password was wrong");
            }
            return null
        }
        if(username.length < 4 || password.length < 4){
            return SetParagraphText("status", "Please input username, password more than 4 characters");
        }
        AddNewUser(username, password)
        SetParagraphText("status", "You are registered, please press login once more")
    } catch (error) {
        SetParagraphText("status", `Error message: ${error}`)
    }
}

/**
 * event when user visiting activity
 * to put all category on list
 */
async function AppendCategories() {
    let category = await GetAllCategory();
    category.forEach((cat)=> {
        AppendCategory(cat.name, cat.imageURL);
    })
}

/**
 * set user profile image
 */
async function SetUserImage() {
    let user = GetCookies().userInfo;
    if(user.username) {
        let imageURL = await UploadImage("inputPost");
        if(imageURL.data) {
            await UpdateUserField(user.username, "profileImg", imageURL.data.thumb.url);
            ToLocation("/activity");
        }
    }
}
/**
 * set paragraph content to username
 * @param {string} id of paragraph element which want to be setted
 */
function SetUsernameToP(id){
    let user = GetCookies().userInfo;
    if(user.username) {
        SetParagraphText(id, user.username);
    }
}

/**
 * event when user visiting activity
 * to put all category on list
 */
async function PutCategories() {
    let category = await GetAllCategory();
    category.forEach((cat)=> {
        AppendCategoryOption(cat.id, cat.name);
    })
}

/**
 *  Post new picture and title to specified category
 */
async function CreatePost() {
    let user = GetCookies().userInfo;
    let title = GetTextFromInput("titlePost");
    let category = GetTextFromInput("category");
    if(category.length > 8) {
        let postImageURL = await UploadImage("inputPost");
        let err = await InsertPost(category, user.id, title, postImageURL.data.display_url);
        if(!!err) {
            return SetParagraphText("response", "thank you for post something");
        }
    }
    SetParagraphText("response", "(title, category, file image) something error")
}