(function(){
    let values = [];
    let nodes = [];
    const urlsTextArea = "";
    nodes = document.querySelectorAll(".g .rc");
    const body = document.querySelector("body");
    body.innerHTML += `
    <div>
        <form action="https://batchspeed.com/test/" method="post">
            <label for="urls" style="display:none">Speed Check</label>
            <textarea name="urls" id="urls" type="textarea">
            </textarea>
                <button type="submit">Get Speeds</button>
        </form>
        </div>
    `

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        const anchorNode = node.querySelector("a");
        let urlNode = window.getComputedStyle(anchorNode);
        if (urlNode.visibility == "hidden"){
            continue
        }
        const obj = {}
        obj.url = node.querySelector("a").getAttribute("href").toString();
        values.push(obj);
    }
    const textArea = document.querySelector("#urls");
    values.forEach(urls=>{
        textArea.value += urls.url + "\n";
    })

})();

