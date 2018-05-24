var expanded = false;

function expand_collapse() {
    if (expanded == true) {
        $('.collapse').collapse('hide');
        expanded = false;
    } else if (expanded == false) {
        $('.collapse').collapse('show');
        expanded = true;
    }
}