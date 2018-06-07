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
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' + " Edit");

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
            $(this).first().html('<i style="color: deeppink" class="fa fa-save" aria-hidden="true"></i>' + " Save");

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

    var editing_journaling = false;
    $('#editJournalingLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_journaling == true && customer_name) {
            // END EDITING

            var form = $("#journalingForm");

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
            $("#journalingFormFieldset").prop('disabled', true);
            editing_journaling = false;

        } else if (editing_journaling == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#journalingFormFieldset").prop('disabled', false);

            editing_journaling = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_appliances = false;
    $('#editAppliancesLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_appliances == true && customer_name) {
            // END EDITING

            var form = $("#appliancesForm");

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
            $("#appliancesFormFieldset").prop('disabled', true);
            editing_journaling = false;

        } else if (editing_appliances == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#appliancesFormFieldset").prop('disabled', false);

            editing_appliances = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_other_data_sources = false;
    $('#editOtherDataSourcesLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_other_data_sources == true && customer_name) {
            // END EDITING

            var form = $("#otherDataSourcesForm");

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
            $("#otherDataSourcesFormFieldset").prop('disabled', true);
            editing_other_data_sources = false;

        } else if (editing_other_data_sources == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#otherDataSourcesFormFieldset").prop('disabled', false);

            editing_other_data_sources = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_desktop_network = false;
    $('#editDesktopNetworkLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_desktop_network == true && customer_name) {
            // END EDITING

            var form = $("#desktopNetworkForm");

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
            $("#desktopNetworkFormFieldset").prop('disabled', true);
            editing_desktop_network = false;

        } else if (editing_desktop_network == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#desktopNetworkFormFieldset").prop('disabled', false);

            editing_desktop_network = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_usage = false;
    $('#editUsageLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_usage == true && customer_name) {
            // END EDITING

            var form = $("#usageForm");

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
            $("#usageFormFieldset").prop('disabled', true);
            editing_usage = false;

        } else if (editing_usage == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#usageFormFieldset").prop('disabled', false);

            editing_usage = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_import = false;
    $('#editImportLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_import == true && customer_name) {
            // END EDITING

            var form = $("#importForm");

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
            $("#importFormFieldset").prop('disabled', true);
            editing_import = false;

        } else if (editing_import == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#importFormFieldset").prop('disabled', false);

            editing_import = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_POC = false;
    $('#editPOCLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_POC == true && customer_name) {
            // END EDITING

            var form = $("#pocForm");

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
            $("#pocFormFieldset").prop('disabled', true);
            editing_POC = false;

        } else if (editing_POC == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#pocFormFieldset").prop('disabled', false);

            editing_POC = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_RFE = false;
    $('#editRFELink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_RFE == true && customer_name) {
            // END EDITING

            var form = $("#rfeForm");

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
            $("#rfeFormFieldset").prop('disabled', true);
            editing_RFE = false;

        } else if (editing_RFE == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#rfeFormFieldset").prop('disabled', false);

            editing_RFE = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    var editing_design_summary = false;
    $('#editDesignSummaryLink').click(function () {
        var customer_name = $("#unique-customer-name").val();
        if (editing_design_summary == true && customer_name) {
            // END EDITING

            var form = $("#designSummaryForm");

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
            $("#designSummaryFormFieldset").prop('disabled', true);
            editing_design_summary = false;

        } else if (editing_design_summary == false) {
            // BEGIN EDITING

            // Unlocks the form's fieldset
            $("#designSummaryFormFieldset").prop('disabled', false);

            editing_design_summary = true;
        } else {
            alert("Customer name is empty.");
        }
    });

});