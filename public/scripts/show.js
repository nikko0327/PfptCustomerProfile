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

$(document).ready(() => {
    var editing_customer = false;
    $('#editCustomerLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_customer == true && customer_name) {
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
            editing_customer = false;
        } else if (editing_customer == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#customerFormFieldset").prop('disabled', false);

            editing_customer = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_email_systems_se = false;
    $('#editEmailSystemSELink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_email_systems_se == true && customer_name) {
            // END EDITING

            var form = $("#emailSystemSEForm");

            var json = {
                type: "POST",
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {

                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#emailSystemSEFormFieldset").prop('disabled', true);
            editing_email_systems_se = false;
        } else if (editing_email_systems_se == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#emailSystemSEFormFieldset").prop('disabled', false);

            editing_email_systems_se = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_email_systems_ps = false;
    $('#editEmailSystemPSLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_email_systems_ps == true && customer_name) {
            // END EDITING

            var form = $("#emailSystemPSForm");

            var json = {
                type: "POST",
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {

                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#emailSystemPSFormFieldset").prop('disabled', true);
            editing_email_systems_ps = false;

        } else if (editing_email_systems_ps == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#emailSystemPSFormFieldset").prop('disabled', false);

            editing_email_systems_ps = true;
        } else {
            alert("Customer name is empty.");
        }
    });
});