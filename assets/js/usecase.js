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
        let user = await GetUserByUsername(username)
        if(user) {
            if(user.password == password) {
                UpdateCookies("userInfo", user);
                ToLocation("/activity");
            } else {
                SetParagraphText("status", "Your password was wrong");
            }
            return null
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