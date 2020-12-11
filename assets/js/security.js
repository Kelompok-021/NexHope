
/**
 * this function will check whether the cookie is valid
 * with database or not
 * @param {string} location which is aimed
 */
function CookieChecker(location){
    setTimeout(async () => {
        let cookie = GetCookies().userInfo;
        let user = await GetUserByUsername((cookie || {}).username || "");
        if(user) {
            if(user.password == cookie.password) {
                return ToLocation(location);
            }
        }
        ToLocation("/");
    }, 2000);
}