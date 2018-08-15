let expanded = false;
let sync_forms = true;

// \u2022 is a bullet point

function sync_email_systems_forms() {
    sync_forms = !sync_forms;
    if (sync_forms) {
        document.getElementById("sync-forms").innerHTML = "Unsync Forms";
        alert("The following forms will synchronize similar questions:\n" +
            "\u2022 Email Systems SE/PS"+
            "\n\nPlease review your changes before saving.");
    } else {
        document.getElementById("sync-forms").innerHTML = "Sync Forms";
        alert("The following forms will not synchronize similar questions:\n" +
            "\u2022 Email Systems SE/PS" +
            "\n\nPlease review your changes before saving.");
    }
}

function add_post_listeners(flag, link, qform, fieldset, message) {
    $(link).click(function () {
        let customer_name = $("#unique-customer-name").val();
        if (flag == true && customer_name) {
            // END EDITING
            flag = false;

            let form = $(qform);

            let json = {
                type: "POST",
                timeout: 3000,
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    alert(message);
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $(fieldset).prop('disabled', true);
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
        } else if (flag == false) {
            // BEGIN EDITING
            flag = true;

            // Unlocks the form's fieldset
            $(fieldset).prop('disabled', false);
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
        } else {
            alert("Customer name is empty.");
        }
    });
}

function expand_collapse() {
    if (expanded == true) {
        $('.collapse').collapse('hide');
        //$('.collapse').click();
        document.getElementById("collapse-toggle").innerHTML = "Expand All";
        $('i.fa-caret-down').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
        expanded = false;
    } else if (expanded == false) {
        $('.collapse').collapse('show');
        //$('.collapse').click();
        document.getElementById("collapse-toggle").innerHTML = "Collapse All";
        $('i.fa-caret-right').toggleClass('fa-caret-down').toggleClass('fa-caret-right');
        expanded = true;
    }
}

// Changes dropdown arrow directions in anchors
function change_arrow(collapse) {
    // let r = collapse.children(":first");
    // alert(collapse.attr('aria-expanded'));

    if (!$('.collapsing')[0]) { // If not collapsing, OK to click
        collapse.children(":first").toggleClass('fa-caret-down').toggleClass('fa-caret-right');
    }
}

$(document).ready(() => {
    window.addEventListener("beforeunload", function (e) {
        if (editing_customer || editing_email_systems_se || editing_appliances || editing_design_summary
            || editing_desktop_network || editing_email_systems_ps || editing_import || editing_journaling
            || editing_other_data_sources || editing_POC || editing_RFE || editing_usage) {
            let confirmationMessage = "You have unsaved changes.";
            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;
        } else {
            return '';
        }
    });

    $.ajaxSetup({
        async: true
    });

    let customer_name = $("#unique-customer-name").val();

    let editing_customer = false;
    $('#editCustomerLink').click(function () {
        if (editing_customer == true && customer_name) {
            // END EDITING

            let form = $("#customerForm");
            let new_customer = $('#unique-customer-name').val().trim();
            //alert("New customer: '" + new_customer + "'");

            if (!new_customer) {
                alert("Customer name is empty.");
                return;
            }

            let json = {
                type: "POST",
                timeout: 3000,
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    location.href = "../index/" + encodeURIComponent(new_customer);
                    // Locks the form's fieldset
                    $("#customerFormFieldset").prop('disabled', true);
                    editing_customer = false;
                    $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
                },
                error: function (xhr, status, error) {
                    if (error == 'Conflict') {
                        alert("Customer already exists.");
                    } else {
                        alert(error);
                    }
                }
            };
            console.log(json);

            // POST here.
            $.ajax(json);

        } else if (editing_customer == false) {
            // BEGIN EDITING
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');

            // Unlocks the form's fieldset
            $("#customerFormFieldset").prop('disabled', false);

            editing_customer = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    let editing_email_systems_se = false;
    $('#editEmailSystemSELink').click(function () {
        let customer_name = $("#unique-customer-name").val();
        if (editing_email_systems_se == true && customer_name) {
            // END EDITING
            editing_email_systems_se = false;

            let form = $("#emailSystemSEForm");

            let json = {
                type: "POST",
                timeout: 3000,
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    if (sync_forms && editing_email_systems_ps) {
                        $('#editEmailSystemPSLink').click();
                    }
                    alert("Email SE Questions saved.")
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#emailSystemSEFormFieldset").prop('disabled', true);
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
        } else if (editing_email_systems_se == false) {
            // BEGIN EDITING
            editing_email_systems_se = true;

            // Unlocks the form's fieldset
            $("#emailSystemSEFormFieldset").prop('disabled', false);
            if (sync_forms && !editing_email_systems_ps) {
                $('#editEmailSystemPSLink').click();
            }
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
        } else {
            alert("Customer name is empty.");
        }
    });

    let editing_email_systems_ps = false;
    $('#editEmailSystemPSLink').click(function () {
        let customer_name = $("#unique-customer-name").val();
        if (editing_email_systems_ps == true && customer_name) {
            // END EDITING
            editing_email_systems_ps = false;

            let form = $("#emailSystemPSForm");

            let json = {
                type: "POST",
                timeout: 3000,
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    if (sync_forms && editing_email_systems_se) {
                        $('#editEmailSystemSELink').click();
                    }

                    alert("Email PS Questions saved.");
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#emailSystemPSFormFieldset").prop('disabled', true);
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');

        } else if (editing_email_systems_ps == false) {
            // BEGIN EDITING
            editing_email_systems_ps = true;

            // Unlocks the form's fieldset
            $("#emailSystemPSFormFieldset").prop('disabled', false);
            if (sync_forms && !editing_email_systems_se) {
                $('#editEmailSystemSELink').click();
            }
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
        } else {
            alert("Customer name is empty.");
        }
    });

    let editing_journaling = false;
    let editing_appliances = false;
    let editing_other_data_sources = false;
    let editing_desktop_network = false;
    let editing_usage = false;
    let editing_import = false;
    let editing_POC = false;
    let editing_RFE = false;
    let editing_design_summary = false;
    let editing_finserv_supervision = false;
    add_post_listeners(editing_journaling, '#editJournalingLink', "#journalingForm", "#journalingFormFieldset", "Journaling Questions saved.");
    add_post_listeners(editing_appliances, '#editAppliancesLink', "#appliancesForm", "#appliancesFormFieldset", "Appliances Questions saved.");
    add_post_listeners(editing_other_data_sources, '#editOtherDataSourcesLink', "#otherDataSourcesForm", "#otherDataSourcesFormFieldset", "Other Data Sources Questions saved.");
    add_post_listeners(editing_desktop_network, '#editDesktopNetworkLink', "#desktopNetworkForm", "#desktopNetworkFormFieldset", "Desktop Network Questions saved.");
    add_post_listeners(editing_usage, '#editUsageLink', "#usageForm", "#usageFormFieldset", "Usage Questions saved.");
    add_post_listeners(editing_import, '#editImportLink', "#importForm", "#importFormFieldset", "Import Questions saved.");
    add_post_listeners(editing_POC, '#editPOCLink', "#pocForm", "#pocFormFieldset", "POC Questions saved.");
    add_post_listeners(editing_RFE, '#editRFELink', "#rfeForm", "#rfeFormFieldset", "RFE Questions saved.");
    add_post_listeners(editing_design_summary, '#editDesignSummaryLink', "#designSummaryForm", "#designSummaryFormFieldset", "Design Summary Questions saved.");
    add_post_listeners(editing_finserv_supervision, '#editFinservSupervisionLink', "#finservSupervisionForm", "#finservSupervisionFormFieldset", "Finserv Supervision Questions saved.");
});

function toggle_show_checkbox(checkbox, input_selector) {
    if(checkbox.checked) {
        $(`#${input_selector}`).fadeIn();
    } else {
        $(`#${input_selector}`).hide();
    }
}