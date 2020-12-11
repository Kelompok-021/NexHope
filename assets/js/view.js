/**
 * get input value from element
 * @param {string} id
 * @returns {string}
 */
function GetTextFromInput(id) {
    return document.getElementById(id).value;
}


/**
 * shorthand function to get html element
 * @param {string} id
 * @returns {HTMLElement}
 */
function getElByID(id){
    return document.getElementById(id)
}

/**
 * set inner text paragraph
 * @param {string} id 
 * @param {string} text
 */
function SetParagraphText(id, text) {
    getElByID(id).innerText = text
}