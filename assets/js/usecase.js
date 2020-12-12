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
        AppendCategory(cat.id, cat.name, cat.imageURL);
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
        let err = await InsertPost(category, user.username, title, postImageURL.data.display_url);
        if(!err) {
            ToLocation("/activity")
            return SetParagraphText("response", "thank you for post something");
        }
    }
    SetParagraphText("response", "(title, category, file image) something error")
}


let voteCountCache = {};
/**
 * function that perform repeating vote count display
 */
function CronSetVoteCount() {
    setInterval(() => {
        let keys = Object.keys(voteCountCache);
        keys.forEach((key) => {
            let postKeys = Object.keys(voteCountCache[key]);
            let result = 0
            postKeys.forEach(postKey => {
                result += voteCountCache[key][postKey] ? 1 : -1;
            });
            SetParagraphText(`vote-${key}`, `${result}`);
        });
    }, 2500);
}

/**
 * render all post to html
 */
async function RenderAllPost() {
    let { username } = GetCookies().userInfo;
    let category = GetCookies().categoryID;
    let posts = await GetAllPost(category);
    for (let p = 0; p < posts.length; p++) {
        const post = posts[p];
        let user = await GetUserByUsername(post.creatorUsername);
        AddPost(
            post.id, 
            category, {
                profileimg: user.profileImg,
                username: user.username
            },
            post.imageURL,
            post.title
        )
        await ListenFromComment(category, post.id, async function (doc) {
            let userComment = await GetUserByUsername(doc.username);
            if(doc.username == username) {
                return AddSelfComment(post.id, doc.username, doc.comment, userComment.profileImg);
            }
            AddOtherComment(post.id, doc.username, doc.comment, userComment.profileImg);
        });

        await ListenForVotes(category, post.id, async (type, voteData)=>{
            if(!voteCountCache[post.id]){
                voteCountCache[post.id] = {};
            }
            voteCountCache[post.id][voteData.id] = voteData.isUpvote;
        })
    }
    CronSetVoteCount();
}

/**
 * function that add comment to specified post
 * @param {string} categoryID
 * @param {string} postID
 */
async function Comments(categoryID, postID) {
    let user = GetCookies().userInfo;
    let input = GetTextFromInput(`comment-${postID}`);
    if(input.length > 0) {
        let err = await AddComment(categoryID, postID, user.username, input);
        if(!!err) {
            alert("error message: "+err);
        }
    }
    SetTextInInput(`comment-${postID}`, "");
}

/**
 * logout functions
 */
function LogOut() {
    UpdateCookies("userInfo", {});
}

/**
 * 
 * @param {string} id of room category
 * @param {string} postID of specified post
 */
async function Upvote(id, postID) {
    let user = GetCookies().userInfo;
    await Vote(id, postID, user.username, true);
}

async function Downvote(id, postID) {
    let user = GetCookies().userInfo;
    await Vote(id, postID, user.username, false);
}