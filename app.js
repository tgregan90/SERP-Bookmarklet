(function(){
    // Build menu and append buttons
    let searchForm = document.querySelector("#searchform");
    const apiKey = '';
    const menu = `
    <ul style="margin-top:20px">
        <li><a href="#" id="getSpeed">Get Load Speeds</a></li>
        <li><a href="#" id="getResults" onclick="">Print Results</a></li>
        <li><a href="#" id="getMJS" onclick="">Get Majestic Data</a></li>
    </ul>
    <div id="resultsPanel">
        <ul id="speedList"></ul>
    </div>
    <style>
        #resultsPanel{
            height: 500px;
            background-color: lightgray;
            width:100vw;
            margin: 0px auto;
        }
        .speedURL{
            list-style-type: none;
        }
    </style>
    `
    searchForm.innerHTML += menu;

    // Create an array with all the organic results
    let values = [];
    let nodes = document.querySelectorAll(".g .rc");
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        const anchorNode = node.querySelector("a");
        const urlNode = window.getComputedStyle(anchorNode);
        if (urlNode.visibility == "hidden"){
            continue
        }
        const obj = {}
        obj.url = anchorNode.getAttribute("href").toString();
        const buttons = `
        <style>
            .SERPListingContainer{
                display:block;
            }
            .SERPListing{
                display: flex;
                flex-direction: row;
            }
            .SERPListing li {
               
                list-style-type: none;
                background-color: yellow;
                padding: 0px;
                padding-right: 20px;
            }
            .SERPListing li a {
                color: black;
                font-size: 16px;
            }
        </style>
        <br />
        <div class="SERPListingContainer">
            <ul class="SERPListing">
                <li class="getSpeedURL"><a href="#" onclick="getSpeed()">Get Speed</a></li>
                <li>|</li>
                <li class="getSpeedLinks"><a href="#" onclick="getMajesticData()">Get Links</a></li>
            </ul>
        </div>    
        `;
        anchorNode.insertAdjacentHTML("beforebegin",buttons)
        values.push(obj);
    }
    function getSpeed(){
        const result = [];
        values.forEach(urlObj=>{
            const call = buildCall(urlObj.url);
            fetch(call)
            .then(response => response.json())
            .then(data => {
                const obj = {};
                obj.url = data.lighthouseResult.requestedUrl;
                obj.cls = data.lighthouseResult.audits["cumulative-layout-shift"].displayValue; 
                obj.lcp = data.lighthouseResult.audits["largest-contentful-paint"].displayValue;
                result.push(obj);
              console.log(obj);
              writeToResultsPanel(obj,"#speedList");
            });
        });
    }
    function printResults(){
        let string = "";
        values.forEach((url,index )=>{
            index = index + 1;
            if(index == "0"){string = ""}
            string += index.toString() + ": " + url.url.toString() + "\n";
        })
        console.log(string);
        alert(string)
    }
    function buildCall(url,strategy){
        return `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url.toString()}&fields=loadingExperience,lighthouseResult&key=${apiKey}&strategy=mobile`
    }
    function getMajesticData(){
        if(!document.querySelector("#getMJSButton")){
        searchForm.querySelector("#getMJS").innerHTML += `
        <div style="margin:20px 0px" id="getMJSButton">
            <form action="https://majestic.com/reports/bulk-backlink-checker" method="post">
            <input style="display:none" type="hidden" name="chargeAccepted" value="1">
            <input style="display:none" id="use_fresh_index" type="hidden" name="IndexDataSource" value="F" checked="">
            <input style="display:none" id="bulk-text-submit" type="hidden"  name="getcounts" value="Check backlink counts">
                <label for="urls" style="display:none">Speed Check</label>
                <textarea name="q" id="mjsURLs" type="textarea" style="display:none"></textarea>
                <button type="submit">Get Links Data</button>
            </form>
        </div>`;
        const textArea = document.querySelector("#mjsURLs");
        values.forEach(urls=>{
            textArea.value += urls.url + "\n";
        })
    }
    }
    function writeToResultsPanel(obj,path){
        const ul = document.querySelector(path);
        let string = "URL:";
        Object.values(obj).forEach((prop)=>{string += prop + ","});
        let li = `<li class="speedURL">${string}</li>`;
        
        ul.innerHTML += li;
    }
    document.querySelector("#getSpeed").addEventListener("click",getSpeed);
    document.querySelector("#getResults").addEventListener("click",printResults);
    document.querySelector("#getMJS").addEventListener("click",getMajesticData);
})();
