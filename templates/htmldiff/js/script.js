$(document).ready(function() {
    var diff2htmlUi = new Diff2HtmlUI();
    diff2htmlUi.fileListCloseable("#diff", false);
    diff2htmlUi.highlightCode('#diff');
});
