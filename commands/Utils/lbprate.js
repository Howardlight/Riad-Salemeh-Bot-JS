const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");

// use Fetch to get the website 
const getRawData = (URL) => {
    return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
        return data;
    });
};

// website, might modify later
const URL = "https://lbprate.com/";

// Process the website then return List
// of desired values
const getWebsiteData = async () => {
    const lbpRaw = await getRawData(URL);
    const parsedData = Cheerio.load(lbpRaw);

    let list = [];
    parsedData(".text-white").each(function (i, e) {
        list[i] = parsedData(this).text();
    });

    return list;
 };


module.exports = {
    name: "lbprate",
    description: "use Fetch and Cheerio to get the LBP rate",
    cooldown:  10,
    // notice how it's an async func
    async execute(message, args) {
        buyRate = await getWebsiteData();

        // quirklines on the top
        quirkline = [
            "El lira b2alf 5er tfarrage:",
            "I did some handaset, and the new Lira value is:",
            "Your local serraf says:",
            "Ana ma 5assni, bss llira lyom:",
            "Bisallem 3lek Michel Aoun:",
            "Discount 51%, bss la 2elak:",
        ];
        
        // create the response, the extended response, concat then return
        response = `${quirkline[Math.floor(Math.random()*quirkline.length)]}`;
        extendedResponse = (`\nThe BUY rate is ${buyRate[2]}\nThe SELL rate is ${buyRate[4]}\n${buyRate[0]}`);
        await message.channel.send(response.concat(extendedResponse));
    }
}