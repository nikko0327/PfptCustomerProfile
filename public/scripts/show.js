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

var editing = false;
$(document).ready(() => {
        $('#editCustomerLink').click(function () {
            if (editing == true) {
                // END EDITING
                editing = false;

                //$("textarea.edit-customer").each(function () {
                $("input.edit-customer").each(function () {
                    var contents = $(this).val();
                    console.log("Contents to be POSTed: " + contents);

                    if (contents == '') {
                        // Need at least 1 character
                        contents = " ";
                    }
                    $(this).html(contents);
                    $(this).contents().unwrap();
                });

                // alert(editing);
            } else {
                // BEGIN EDITING
                editing = true;

                $(".edit-customer").each(function () {
                    var contents = $(this).html().trim();
                    //$(this).html('<textarea class="edit-customer">' + contents + '</textarea>');
                    $(this).html('<input class="edit-customer" placeholder="No response" value="' + contents + '"/>');
                });
                // alert(editing);
            }
        });
    }
);