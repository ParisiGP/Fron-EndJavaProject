function RequestGet(URL) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", URL, false);
    xmlHttpReq.send();

    return JSON.parse(xmlHttpReq.responseText);
}

function RequestPost(URL, DATA) {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", URL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.onload = () => resolve(JSON.parse(xmlhttp.responseText));
        xmlhttp.onerror = () => reject(xmlhttp.statusText);
        xmlhttp.send(JSON.stringify(DATA));
    });
}

function RequestDelete(URL) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("DELETE", URL, false);
    xmlHttpReq.send();

    return JSON.parse(xmlHttpReq.responseText);
}

function RequestPatch(URL, DATA) {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PATCH", URL);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("Accept", "application/json");
        xmlhttp.onload = () => resolve(JSON.parse(xmlhttp.responseText));
        xmlhttp.onerror = () => reject(xmlhttp.statusText);
        xmlhttp.send(JSON.stringify(DATA));
    });
}