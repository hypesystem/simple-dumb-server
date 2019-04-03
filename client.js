const axios = require("axios");

(async function() {
    let result = await saveData("sadgkhalksghsa", { hello: "world", also: "marblecake", mitTal: 1239842789 });

    console.log("result", result);
})();

async function saveData(id, data) {
    let result = await axios({
        method: "PUT",
        url: `http://localhost:3923/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data
    });

    return result.data;
}
