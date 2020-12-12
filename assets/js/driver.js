/**
 * 
 * @param {string} location path url want to direct
 */
function ToLocation(location) {
    if((window.location.pathname || "/") != location) {
        window.location = location;
    }
}

function cookieToJSON() {
    let cookies = document.cookie.split(";");
    let result = {};
    for (let i = 0; i < cookies.length; i++) {
        let kvCookies = cookies[i].split("=");
        if(kvCookies.length == 2) {
            result[kvCookies[0].trim()] = kvCookies[1].trim();
        }
    }
    return result;
}

function jsonToCookie(data) {
    let keys = Object.keys(data);
    let cookie = "";
    keys.forEach((key) => {
        cookie += `${key}=${data[key]}; `;
    })
    console.log(cookie);
    document.cookie = cookie;
}

function setCookie(data) {
    let cookie = cookieToJSON();
    cookie["nexhope"] = JSON.stringify(data);
    jsonToCookie(cookie);
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
        parsed = JSON.parse(cookieToJSON().nexhope);
    } catch(error) {
        parsed = {}
    }
    return parsed
}

