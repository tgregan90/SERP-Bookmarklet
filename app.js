
(function(){
    // Build menu and append buttons
    let searchForm = document.querySelector("#searchform");
    const menu = `
    <ul style="margin-top:20px">
        <li><a href="#" id="getSpeed">Get Load Speeds</a></li>
        <li><a href="#" id="getResults" onclick="">Print Results</a></li>
        <li><a href="#" id="getMJS" onclick="">Get Majestic Data</a></li>
    </ul>`
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
        obj.url = node.querySelector("a").getAttribute("href").toString();
        values.push(obj);
    }

    function getSpeed(){
        if(!document.querySelector("#getSpeedButton")){
            searchForm.querySelector("#getSpeed").innerHTML += `
            <div style="margin:20px 0px" id="getSpeedButton">
                <form action="https://batchspeed.com/test/" method="post">
                    <label for="urls" style="display:none">Speed Check</label>
                    <textarea name="urls" id="urls" type="textarea" style="display:none">
                    </textarea>
                    <button type="submit">Get Speeds</button>
                </form>
            </div>`
        const textArea = document.querySelector("#urls");
        values.forEach(urls=>{
            textArea.value += urls.url + "\n";
        })
        }
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
    document.querySelector("#getSpeed").addEventListener("click",getSpeed);
    document.querySelector("#getResults").addEventListener("click",printResults);
    document.querySelector("#getMJS").addEventListener("click",getMajesticData);
})();
