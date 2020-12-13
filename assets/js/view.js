/**
 * get input value from element
 * @param {string} id
 * @returns {string}
 */
function GetTextFromInput(id) {
    return getElByID(id).value;
}

/**
 * set input value into element
 * @param {string} id
 * @param {string} value
 */
function SetTextInInput(id, value) {
    getElByID(id).value = value;
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
 * @param {string} id of category want to be visited
 * @param {string} name of category
 * @param {string} imageURL
 */
function AppendCategory(id, name, imageURL){
    let div = document.createElement("div");
    div.classList.add("kategori");
    {

        let link = document.createElement("a");
        link.href = "/activity/room";

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
        link.onclick = function(){
            UpdateCookies("categoryID", id);
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

/**
 * add option to be choosen
 * when user want to post picture
 * @param {string} value of options
 * @param {string} label of options to be choosen
 */
function AppendCategoryOption(value, label) {
    getElByID("category").appendChild(
        (function(){
            let child = document.createElement("option");
            child.value = value;
            child.innerText = label
            return child;
        })()
    )
}

/**
 * 
 * @param {string} id 
 * @param {string} categoryID
 * @param {object} creator should contain username, profileimg field of creator
 * @param {string} imageURL 
 * @param {string} title
 */
function AddPost(id, categoryID, creator, imageURL, title){
    let post = `<div class="postncom">
                <div class="post">
                    <header>
                        <div class="propic">
                            <img style="border-radius: 20% 20% 20% 20%" width="40px" height="40px" viewBox="0 0 16 16" class="bi bi-person" src="${creator.profileimg}"/>
                        </div>
                        <div>
                            <h5>${creator.username}</h5>
                        </div>
                        <div class="message">
                            <h5>${title}</h5>
                        </div>
                    </header>
                    <div class="mainpost">
                        <div class="lnd">
                            <button class="button" id="upvote-${id}"  onclick="Upvote('${categoryID}', '${id}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                </svg>
                            </button>
                            <h4 id="vote-${id}"> 0</h4>
                            <button class="button" id="downvote-${id}"  onclick="Downvote('${categoryID}', '${id}')">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="image">
                            <img src="${imageURL}">
                        </div>
                    </div>
                </div>
                <div class="comment">
                    <div class="display" id="display-${id}"></div>
                    <div class="textarea">
                    <form>
                        <label>Comment :</label>
                        <textarea id="comment-${id}" name="comment" rows="2" cols="50"></textarea>
                        <br>
                        <input type="button" value="post" onclick="Comments('${categoryID}', '${id}')">
                    </form>
                    
                    </div>
                </div>
            </div>`;
    getElByID("content").innerHTML += post;
}


function AddOtherComment(id, username, content, imgURL) {
    let comment = `
    <div class="opcom">
        <div class="propic">
            <img style="border-radius: 50% 50% 50% 50%" width="40px" height="40px" viewBox="0 0 16 16" class="bi bi-person" src="${imgURL}"/>
        </div>
        <div class="thecom">
            <div class="usernm">
                <p style="color: white;">
                    ${username}
                </p>
            </div>
            <div class="usercm">
                <p>
                    ${content}
                </p>
            </div>
        </div>
    </div>`
    getElByID(`display-${id}`).innerHTML += comment;
}


function AddSelfComment(id, username, content, imgURL) {
    let comment = `
    <div class="uscom">
        <div class="thecom">
            <div class="usernm">
                <p style="color: white;">
                    ${username}
                </p>
            </div>
            <div class="usercm">
                <p>
                ${content}
                </p>
            </div>
        </div>
        <div class="propic">
            <img width="40px" height="40px" viewBox="0 0 16 16" class="bi bi-person" src="${imgURL}"/>
        </div>
    </div>`
    getElByID(`display-${id}`).innerHTML += comment;
}


