const APIKey = "802bda87fe34482396f04e8c6d5f7c8e";

/**
 * this function will perform data upload
 * @param {string} id element which want to be source of file form
 * @returns {object}
 */
async function UploadImage(id) {
    let data = getElByID(id);
    let form = new FormData();
    form.append("image", data.files[0]);

    let result = {};
    try {
        let ones = await fetch(
            `https://api.imgbb.com/1/upload?key=${APIKey}`,{
                method: "POST",
                body: form
            })
        result = await ones.json();
    } catch(error){}
    return result;
}