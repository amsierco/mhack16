const unirest = require("unirest");
const cheerio = require("cheerio");
var fs = require("fs");

const getOrganicData = async (prompt) => {
    let terms = prompt.split(" ");
    prompt = terms.join("+");
    let headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    });
    let response = await fetch(
        "https://www.google.com/search?q=" + prompt + "&gl=us&hl=en",
        { method: "GET", headers: headers }
    );
    let $ = await cheerio.load(response.body);
    console.log(response.status);
    let titles = [];
    let links = [];
    let snippets = [];
    let displayedLinks = [];

    $(".g .yuRUbf h3").each((i, el) => {
        titles[i] = $(el).text();
    });
    $(".yuRUbf a").each((i, el) => {
        links[i] = $(el).attr("href");
    });
    $(".g .VwiC3b ").each((i, el) => {
        snippets[i] = $(el).text();
    });
    $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
        displayedLinks[i] = $(el).text();
    });

    const organicResults = [];

    for (let i = 0; i < titles.length; i++) {
        organicResults[i] = {
            title: titles[i],
            links: links[i],
            snippet: snippets[i],
            displayedLink: displayedLinks[i],
        };
    }

    // res = await organicResults;
    return organicResults;
};

getOrganicData("juggling").then((res) => console.log(res));

// var data = JSON.parse(fs.readFileSync("out.json"));

// async function wrapper() {
//     for (let lesson of data.lessonPlans) {
//         for (let step of lesson.steps) {
//             temp1 = {};
//             for (resource of step.resources) {
//                 await getOrganicData(resource).then((res) => {
//                     temp1[resource] = res[0].links;
//                 });
//             }
//             step.resources = temp1;

//             temp2 = {};
//             for (tool of step.tools) {
//                 await getOrganicData(tool).then((res) => {
//                     temp2[tool] = res[0].links;
//                 });
//             }
//             step.tools = temp2;
//         }
//     }
//     fs.writeFile("out.json", JSON.stringify(data), (err) => {
//         if (err) throw err;
//     });
// }

// wrapper();
