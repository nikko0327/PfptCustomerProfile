var expanded = false;

function expand_collapse() {
    if (expanded == true) {
        $('.collapse').collapse('hide');
        document.getElementById("collapse-toggle").innerHTML = "Expand All";
        expanded = false;
    } else if (expanded == false) {
        $('.collapse').collapse('show');
        document.getElementById("collapse-toggle").innerHTML = "Collapse All";
        expanded = true;
    }
}