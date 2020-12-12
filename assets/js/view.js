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

/**
 * add one category in categories activity
 * @param {string} name of category
 * @param {string} imageURL
 */
function AppendCategory(name, imageURL){
    let div = document.createElement("div");
    div.classList.add("kategori");
    {

        let link = document.createElement("a");
        link.href = "/activity/roomanime.html";

        {
            let boxDiv = document.createElement("div");
            boxDiv.classList.add("box");

            {
                let desDiv = document.createElement("deskripsi");
                desDiv.classList.add("deskripsi");

                {
                    let h6 = document.createElement("h6");
                    h6.innerText = name;
                    desDiv.appendChild(h6);
                }

                let pictDiv = document.createElement("div");
                pictDiv.classList.add("picture");

                {
                    let pictureImg = document.createElement("img");
                    pictureImg.src = imageURL;
                    pictDiv.appendChild(pictureImg);
                }

                boxDiv.appendChild(desDiv);
                boxDiv.appendChild(pictDiv);
            }
            link.appendChild(boxDiv);
        }
        div.appendChild(link);
    }
    getElByID("categories").appendChild(div);
}

/**
 * 
 * @param {string} id of element img which want to be setted
 * @param {string} sourceID
 */
function PutImageSrc(id, sourceID) {
    let el = getElByID(id);
    let sourceEl = getElByID(sourceID);
    el.src = window.URL.createObjectURL(sourceEl.files[0]);
}