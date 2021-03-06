/**
 * 
 * @param {string} location path url want to direct
 */
function ToLocation(location) {
    if((window.location.pathname || "/") != location) {
        window.location = location;
    }
}

function setCookie(data) {
    Cookies.set("nexhope", JSON.stringify(data));
}

/**
 * update partial local cookie to store activity information
 * @param {string} key for updating cookie based on key
 * @param {object} cookie data for key param
 */
function UpdateCookies(key, cookie) {
    let local = GetCookies();
    local[key] = cookie;
    setCookie(local);
}

/**
 * get local cookie and parse to JSON
 * @returns {object}
 */
function GetCookies() {
    let parsed;
    try {
        parsed = JSON.parse(Cookies.get("nexhope"));
    } catch(error) {
        parsed = {}
    }
    return parsed
}

