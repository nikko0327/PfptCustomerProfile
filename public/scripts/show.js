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
        var customer_name = $("#unique-customer-name").val();
        if (editing == true && customer_name) {
            // END EDITING

            var form = $("#customerForm");

            var json = {
                type: "POST",
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    location.href = "/index/" + encodeURIComponent(customer_name);
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#customerFormFieldset").prop('disabled', true);
            editing = false;
        } else if (editing == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#customerFormFieldset").prop('disabled', false);

            editing = true;
        } else {
            alert("Customer name is empty.");
        }
    });
});