window.onkeyup = keyup;
var inputText;

function keyup(e) {
    // inputText = e.target.value;
    inputText = parseOrg();

    const preview = document.getElementById("preview");
    preview.innerHTML = inputText;
}

function parseOrg() {
    var orgCode = document.getElementById("editor").value;
    var orgParser = new Org.Parser();
    var orgDocument = orgParser.parse(orgCode);
    var orgHTMLDocument = orgDocument.convert(Org.ConverterHTML, {
        headerOffset: 1,
        exportFromLineNumber: false,
        suppressSubScriptHandling: false,
        suppressAutoLink: false,
    });

    // console.dir(orgHTMLDocument); // => { title, contentHTML, tocHTML, toc }
    // console.log(orgHTMLDocument.toString()) // => Rendered HTML
    return orgHTMLDocument;
}

function saveOrg() {
    const filename = new Date().toISOString();
    var data = document.getElementById("editor").value;
    var file = new Blob([data], { type: Text });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename + ".org";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function saveHTML() {
    const filename = new Date().toISOString();
    var data = parseOrg();
    var file = new Blob([data], { type: Text });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename + ".html";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
