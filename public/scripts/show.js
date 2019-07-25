var expanded = false;
var sync_forms = true;

var row_count = 1;

// \u2022 is a bullet point

function sync_email_systems_forms() {
    sync_forms = !sync_forms;
    if (sync_forms) {
        document.getElementById("sync-forms").innerHTML = "Unsync Forms";
        alert("The following forms will synchronize similar questions:\n" +
            "\u2022 Email Systems SE/PS" +
            "\n\nPlease review your changes before saving.");
    } else {
        document.getElementById("sync-forms").innerHTML = "Sync Forms";
        alert("The following forms will not synchronize similar questions:\n" +
            "\u2022 Email Systems SE/PS" +
            "\n\nPlease review your changes before saving.");
    }
}

function add_post_listeners(flag, edit, cancel, qform, fieldset, message) {
    $(edit).click(function () {
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
            $(this).next().remove();
        } else if (flag == false) {
            // BEGIN EDITING
            flag = true;

            // Unlocks the form's fieldset
            $(fieldset).prop('disabled', false);
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
            $(this).first().after(`<a href="#/" id="${cancel.substring(1)}" aria-hidden="true" data-toggle="modal"><i style="color: deeppink;" class="fa fa-times" aria-hidden="true"> Cancel</i></a>`);
            $(cancel).click(function() {
              if (confirm("Are you sure?")) {
                $(qform)[0].reset();
                $(fieldset).prop('disabled', true);
                editing_customer = false;
                $(edit).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
                $(edit).next().remove();
              }
            })
        } else {
            alert("Customer name is empty.");
        }
    });
}

// Expands/collapse all sections
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

var editing_customer = false;

$(document).ready(() => {
    row_count = $('#contacts_table > tbody > tr').length;

    window.addEventListener("beforeunload", function (e) {
        if (editing_customer || editing_email_systems || editing_appliances || editing_design_summary
            || editing_desktop_network || editing_import || editing_journaling
            || editing_other_data_sources || editing_POC || editing_RFE || editing_usage) {
            let confirmationMessage = "You have unsaved changes.";
            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;
        } else {
            return '';
        }
    });

    $("#add_row").click(function (e) {
        let table = $('#contacts_table');
        //console.log(table.find('tbody tr').length);

        table.find('tbody').append('<tr><td>' +
            '<input type="text" class="form-control" placeholder="Contact Name" name="customer[contacts][' + row_count + '][name]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Title" name="customer[contacts][' + row_count + '][title]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Email" name="customer[contacts][' + row_count + '][email]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Phone" name="customer[contacts][' + row_count + '][phone]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Primary Contact" name="customer[contacts][' + row_count++ + '][primary_contact]" value=""/>' +
            '</td>' +
            '<td><i class="fa fa-trash" aria-hidden="true" onclick="delete_row(this);"></i></td>' +
            '</tr>');
    });

    $("#delete_row").click(function (e) {
        let table = $('#contacts_table');

        if (table.find('tbody tr').length > 1) {
            table.find('tbody tr:last-child').remove();
        }
    });

    // $.ajaxSetup({
    //     async: true
    // });

    let customer_name = $("#unique-customer-name").val();

    //alert(window.location.host);

    // This one is for loading uploaded diagrams
    $.ajax({
        type: "GET",
        //timeout: 3000,
        url: `http://${window.location.hostname}/customerprofile/uploads/` + encodeURIComponent(customer_name),
        success: function (res) {
            if (Array.isArray(res)) {
                res.forEach(item => {
                    //console.log(item);
                    switch (item.metadata.diagram) {
                        case '1': {
                            $('#diagram1').append(`
                            <div class="row">
                                <a href="../files/${item.filename}">
                                    <p class="truncate">${item.metadata.originalname}</p>
                                </a>&emsp;&emsp;
                                <div style="float: right !important;">
                                    <i class="fa fa-trash" aria-hidden="true"
                                        onclick="delete_diagram(this, '../files/${item._id}?_method=DELETE');"></i>
                                </div>
                            </div>`);
                            break;
                        }
                        case '2': {
                            $('#diagram2').append(`
                            <div class="row">
                                <a href="../files/${item.filename}">
                                    <p class="truncate">${item.metadata.originalname}</p>
                                </a>&emsp;&emsp;
                                <div style="float: right !important;">
                                <i class="fa fa-trash" aria-hidden="true"
                                    onclick="delete_diagram(this, '../files/${item._id}?_method=DELETE');"></i>
                                </div>
                            </div>`);
                            break;
                        }
                        case '3': {
                            $('#diagram3').append(`
                            <div class="row">
                                <a href="../files/${item.filename}">
                                    <p class="truncate">${item.metadata.originalname}</p>
                                </a>&emsp;&emsp;
                                <div style="float: right !important;">
                                    <i class="fa fa-trash" aria-hidden="true"
                                        onclick="delete_diagram(this, '../files/${item._id}?_method=DELETE');"></i>
                                </div>
                            </div>`);
                            break;
                        }
                        default: break;
                    }
                });
            } else {
                console.log("GET received no array of items");
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });

    //var editing_customer = false;
    $('#editCustomerLink').click(function () {
        if (editing_customer == true && customer_name) {
            // END EDITING

            let form = $("#customerForm");
            let new_customer = $('#unique-customer-name').val();
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
                    alert('Customer information updated.');

                    $.ajax({
                        type: "POST",
                        timeout: 30000,
                        url: `http://${window.location.hostname}/customerprofile/uploads/` + encodeURIComponent(customer_name),
                        data: { new_name: new_customer },
                        success: function (res) {
                            if (res.success) {
                                alert('Files updated.');
                            } else {
                                alert('No files updated.\nEither a server error has occurred or an improper request was sent.')
                            }
                            location.href = "../index/" + encodeURIComponent(new_customer);
                        },
                        error: function (xhr, status, error) {
                            console.log("Error updating files uploaded.");
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    if (error == 'Conflict') {
                        alert("Customer already exists.");
                    } else {
                        alert(error);
                    }
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);
            // Locks the form's fieldset
            $("#customerFormFieldset").prop('disabled', true);
            editing_customer = false;
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
            $(this).next().remove();
        } else if (editing_customer == false) {
            // BEGIN EDITING
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
            $(this).first().after('<a href="#/" id="cancelCustomerLink" aria-hidden="true" data-toggle="modal"><i style="color: deeppink;" class="fa fa-times" aria-hidden="true"> Cancel</i></a>');
            $("#cancelCustomerLink").click(function() {
              if (confirm("Are you sure?")) {
                $("#customerForm")[0].reset();
                $("#customerFormFieldset").prop('disabled', true);
                editing_customer = false;
                $("#editCustomerLink").first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
                $("#editCustomerLink").next().remove();
              }
            })

            // Unlocks the form's fieldset
            $("#customerFormFieldset").prop('disabled', false);

            editing_customer = true;
        } else {
            alert("Customer name is empty.");
        }
    });

    let editing_email_systems = false;
    $('#editEmailSystemLink').click(function () {
        let customer_name = $("#unique-customer-name").val();
        if (editing_email_systems == true && customer_name) {
            // END EDITING
            editing_email_systems = false;

            let form = $("#emailSystemForm");

            let json = {
                type: "POST",
                timeout: 3000,
                url: form.attr('action'),
                data: form.serialize(),
                success: function (res) {
                    // if (sync_forms && editing_email_systems_ps) {
                    //     $('#editEmailSystemPSLink').click();
                    // }
                    alert("Email SE Questions saved.")
                }
            };
            //console.log(json);

            // POST here.
            $.ajax(json);

            // Locks the form's fieldset
            $("#emailSystemFormFieldset").prop('disabled', true);
            $(this).first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
            $(this).next().remove();
        } else if (editing_email_systems == false) {
            // BEGIN EDITING
            editing_email_systems = true;

            // Unlocks the form's fieldset
            $("#emailSystemFormFieldset").prop('disabled', false);
            // if (sync_forms && !editing_email_systems_ps) {
            //     $('#editEmailSystemPSLink').click();
            // }
            $(this).first().html('<i style="color: deeppink;" class="fa fa-save" aria-hidden="true"> Save</i>');
            $(this).first().after('<a href="#/" id="cancelEmailSystemLink" aria-hidden="true" data-toggle="modal"><i style="color: deeppink;" class="fa fa-times" aria-hidden="true"> Cancel</i></a>');
            $("#cancelEmailSystemLink").click(function() {
              if (confirm("Are you sure?")) {
                $("#emailSystemForm")[0].reset();
                $("#emailSystemFormFieldset").prop('disabled', true);
                editing_email_systems = false;
                $("#editEmailSystemLink").first().html('<i class="fa fa-pencil-square-o" aria-hidden="true"> Edit</i>');
                $("#editEmailSystemLink").next().remove();
              }
            })
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
    add_post_listeners(editing_journaling, '#editJournalingLink', '#cancelJournalingLink', "#journalingForm", "#journalingFormFieldset", "Journaling Questions saved.");
    add_post_listeners(editing_appliances, '#editAppliancesLink', '#cancelAppliancesLink', "#appliancesForm", "#appliancesFormFieldset", "Appliances Questions saved.");
    add_post_listeners(editing_other_data_sources, '#editOtherDataSourcesLink', '#cancelOtherDataSourcesLink', "#otherDataSourcesForm", "#otherDataSourcesFormFieldset", "Other Data Sources Questions saved.");
    add_post_listeners(editing_desktop_network, '#editDesktopNetworkLink', '#cancelDesktopNetworkLink', "#desktopNetworkForm", "#desktopNetworkFormFieldset", "Desktop Network Questions saved.");
    add_post_listeners(editing_usage, '#editUsageLink', '#cancelUsageLink', "#usageForm", "#usageFormFieldset", "Usage Questions saved.");
    add_post_listeners(editing_import, '#editImportLink', '#cancelImportLink', "#importForm", "#importFormFieldset", "Import Questions saved.");
    add_post_listeners(editing_POC, '#editPOCLink', '#cancelPOCLink', "#pocForm", "#pocFormFieldset", "POC Questions saved.");
    add_post_listeners(editing_RFE, '#editRFELink', '#cancelRFELink', "#rfeForm", "#rfeFormFieldset", "RFE Questions saved.");
    add_post_listeners(editing_design_summary, '#editDesignSummaryLink', '#cancelDesignSummaryLink', "#designSummaryForm", "#designSummaryFormFieldset", "Design Summary Questions saved.");
    add_post_listeners(editing_finserv_supervision, '#editFinservSupervisionLink', '#cancelFinservSupervisionLink', "#finservSupervisionForm", "#finservSupervisionFormFieldset", "Finserv Supervision Questions saved.");

    $("#sidebar-button").click(function() {
      $("#sidebar").toggle();
      $(".page-content").toggleClass("toggled");
    });

    function hideDropdowns() {
      $("#emailsystems-dropdown").hide();
      $("#journaling-dropdown").hide();
      $("#appliances-dropdown").hide();
      $("#otherdatasources-dropdown").hide();
      $("#editOtherDataSources-enterprise-dropdown").hide();
      $("#desktopnetwork-dropdown").hide();
      $("#usage-dropdown").hide();
      $("#editUsage-Supervision-dropdown").hide();
      $("#poc-dropdown").hide();
      $("#finservsupervision-dropdown").hide();
      $("#editSupervisionOverview-dropdown").hide();
    }

    hideDropdowns();

    $("a[href='#general-content']").click(function() {
      hideDropdowns();
    })

    $("a[href='#emailsystems-content']").click(function() {
      hideDropdowns();
      $("#emailsystems-dropdown").toggle();
      $("#emailContainer").collapse("show");
      $("#editEmailSystems-1").collapse("hide");
      $("#editEmailSystems-2").collapse("hide");
      $("#editEmailSystems-3").collapse("hide");
      $("#editEmailSystems-4").collapse("hide");
      $("a[href='#editEmailSystems-1']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editEmailSystems-2']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editEmailSystems-3']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editEmailSystems-4']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editemailsystems-1-content']").click(function() {
      $("#editEmailSystems-1").collapse("show");
      $("#editEmailSystems-2").collapse("hide");
      $("#editEmailSystems-3").collapse("hide");
      $("#editEmailSystems-4").collapse("hide");
    })

    $("a[href='#editemailsystems-2-content']").click(function() {
      $("#editEmailSystems-1").collapse("hide");
      $("#editEmailSystems-2").collapse("show");
      $("#editEmailSystems-3").collapse("hide");
      $("#editEmailSystems-4").collapse("hide");
    })

    $("a[href='#editemailsystems-3-content']").click(function() {
      $("#editEmailSystems-1").collapse("hide");
      $("#editEmailSystems-2").collapse("hide");
      $("#editEmailSystems-3").collapse("show");
      $("#editEmailSystems-4").collapse("hide");
    })

    $("a[href='#editemailsystems-4-content']").click(function() {
      $("#editEmailSystems-1").collapse("hide");
      $("#editEmailSystems-2").collapse("hide");
      $("#editEmailSystems-3").collapse("hide");
      $("#editEmailSystems-4").collapse("show");
    })

    $("a[href='#journaling-content']").click(function() {
      hideDropdowns();
      $("#journaling-dropdown").toggle();
      $("#journalingContainer").collapse("show");
      $("#editExchangeDetails").collapse("hide");
      $("#editMailVol").collapse("hide");
      $("a[href='#editExchangeDetails']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editMailVol']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editExchangeDetails-content']").click(function() {
      $("#editExchangeDetails").collapse("show");
      $("#editMailVol").collapse("hide");
    })

    $("a[href='#editMailVol-content']").click(function() {
      $("#editExchangeDetails").collapse("hide");
      $("#editMailVol").collapse("show");
    })

    $("a[href='#appliances-content']").click(function() {
      hideDropdowns();
      $("#appliances-dropdown").toggle();
      $("#applianceSizing").collapse("show");
      $("#editapplianceDetails-ApplianceSizing").collapse("hide");
      $("#editapplianceDetails-ForSE").collapse("hide");
      $("a[href='#editapplianceDetails-ApplianceSizing']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editapplianceDetails-ForSE']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editapplianceDetails-ApplianceSizing-content']").click(function() {
      $("#editapplianceDetails-ApplianceSizing").collapse("show");
      $("#editapplianceDetails-ForSE").collapse("hide");
    })

    $("a[href='#editapplianceDetails-ForSE-content']").click(function() {
      $("#editapplianceDetails-ApplianceSizing").collapse("hide");
      $("#editapplianceDetails-ForSE").collapse("show");
    })

    $("a[href='#otherdatasources-content']").click(function() {
      hideDropdowns();
      $("#otherdatasources-dropdown").toggle();
      $("#editOtherDataSources-enterprise-dropdown").hide();
      $("#otherDataSourcesContainer").collapse("show");
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("hide");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
      $("a[href='#editOtherDataSources-Custom']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editOtherDataSources-Social']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editOtherDataSources-enterprise']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-general']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-files']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-skype']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-skype-lync']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-box-onedrive']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-chatter']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editECA-symphony']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editOtherDataSources-enterprise-content']").click(function() {
      $("#editOtherDataSources-enterprise-dropdown").toggle();
      $("a[href='#editOtherDataSources-enterprise']").click();
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editOtherDataSources-Custom-content']").click(function() {
      $("#editOtherDataSources-enterprise-dropdown").hide();
      $("#editOtherDataSources-Custom").collapse("show");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("hide");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editOtherDataSources-Social-content']").click(function() {
      $("#editOtherDataSources-enterprise-dropdown").hide();
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("show");
      $("#editOtherDataSources-enterprise").collapse("hide");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-general-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("show");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-files-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("show");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-skype-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("show");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-skype-lync-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("show");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-box-onedrive-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("show");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-chatter-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("show");
      $("#editECA-symphony").collapse("hide");
    })

    $("a[href='#editECA-symphony-content']").click(function() {
      $("#editOtherDataSources-Custom").collapse("hide");
      $("#editOtherDataSources-Social").collapse("hide");
      $("#editOtherDataSources-enterprise").collapse("show");
      $("#editECA-general").collapse("hide");
      $("#editECA-files").collapse("hide");
      $("#editECA-skype").collapse("hide");
      $("#editECA-skype-lync").collapse("hide");
      $("#editECA-box-onedrive").collapse("hide");
      $("#editECA-chatter").collapse("hide");
      $("#editECA-symphony").collapse("show");
    })

    $("a[href='#desktopnetwork-content']").click(function() {
      hideDropdowns();
      $("#desktopnetwork-dropdown").toggle();
      $("#desktopContent").collapse("show");
      $("#editDesktop-Network").collapse("hide");
      $("#editDesktop-Disaster").collapse("hide");
      $("#editDesktop-Auth").collapse("hide");
      $("a[href='#editDesktop-Network']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editDesktop-Disaster']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editDesktop-Auth']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editDesktop-Network-content']").click(function() {
      $("#editDesktop-Network").collapse("show");
      $("#editDesktop-Disaster").collapse("hide");
      $("#editDesktop-Auth").collapse("hide");
    })

    $("a[href='#editDesktop-Disaster-content']").click(function() {
      $("#editDesktop-Network").collapse("hide");
      $("#editDesktop-Disaster").collapse("show");
      $("#editDesktop-Auth").collapse("hide");
    })

    $("a[href='#editDesktop-Auth-content']").click(function() {
      $("#editDesktop-Network").collapse("hide");
      $("#editDesktop-Disaster").collapse("hide");
      $("#editDesktop-Auth").collapse("show");
    })

    $("a[href='#usage-content']").click(function() {
      hideDropdowns();
      $("#usage-dropdown").toggle();
      $("#editUsage-Supervision-dropdown").hide();
      $("#usageContainer").collapse("show");
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
      $("a[href='#editUsage-Supervision']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Supervision-Notes']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Supervision-Random']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Supervision-requirements']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Stubbing']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-PST']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Legal']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-End']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editUsage-Sync']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editusage-transport']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editusage-export']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editUsage-Supervision-content']").click(function() {
      $("#editUsage-Supervision-dropdown").toggle();
      $("a[href='#editUsage-Supervision']").click();
      $("#editUsage-Supervision").collapse("show");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Supervision-Notes-content']").click(function() {
      $("#editUsage-Supervision").collapse("show");
      $("#editUsage-Supervision-Notes").collapse("show");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Supervision-Random-content']").click(function() {
      $("#editUsage-Supervision").collapse("show");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("show");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Supervision-requirements-content']").click(function() {
      $("#editUsage-Supervision").collapse("show");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("show");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Stubbing-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("show");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-PST-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("show");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Legal-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("show");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-End-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("show");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editUsage-Sync-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("show");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editusage-transport-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("show");
      $("#editusage-export").collapse("hide");
    })

    $("a[href='#editusage-export-content']").click(function() {
      $("#editUsage-Supervision-dropdown").hide();
      $("#editUsage-Supervision").collapse("hide");
      $("#editUsage-Supervision-Notes").collapse("hide");
      $("#editUsage-Supervision-Random").collapse("hide");
      $("#editUsage-Supervision-requirements").collapse("hide");
      $("#editUsage-Stubbing").collapse("hide");
      $("#editUsage-PST").collapse("hide");
      $("#editUsage-Legal").collapse("hide");
      $("#editUsage-End").collapse("hide");
      $("#editUsage-Sync").collapse("hide");
      $("#editusage-transport").collapse("hide");
      $("#editusage-export").collapse("show");
    })

    $("a[href='#import-content']").click(function() {
      hideDropdowns();
      $("#importContent").collapse("show");
    })

    $("a[href='#poc-content']").click(function() {
      hideDropdowns();
      $("#poc-dropdown").toggle();
      $("#pocContent").collapse("show");
      $("#editPOCPOC").collapse("hide");
      $("#editPOCUAT").collapse("hide");
      $("a[href='#editPOCPOC']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editPOCUAT']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editPOCPOC-content']").click(function() {
      $("#editPOCPOC").collapse("show");
      $("#editPOCUAT").collapse("hide");
    })

    $("a[href='#editPOCUAT-content']").click(function() {
      $("#editPOCPOC").collapse("hide");
      $("#editPOCUAT").collapse("show");
    })

    $("a[href='#rfe-content']").click(function() {
      hideDropdowns();
      $("#rfeContent").collapse("show");
    })

    $("a[href='#designsummary-content']").click(function() {
      hideDropdowns();
      $("#designSummaryContent").collapse("show");
    })

    $("a[href='#finservsupervision-content']").click(function() {
      hideDropdowns();
      $("#finservsupervision-dropdown").toggle();
      $("#editSupervisionOverview-dropdown").hide();
      $("#FinservSupervisionContent").collapse("show");
      $("#editSupervisionOverview").collapse("hide");
      $("#editSupervision-MessageProfile").collapse("hide");
      $("#editSupervisoryWorkflow").collapse("hide");
      $("#editAdministrativeFunctions").collapse("hide");
      $("#editRuleLexiconMaintenance").collapse("hide");
      $("a[href='#editSupervisionOverview']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editSupervision-MessageProfile']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editSupervisoryWorkflow']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editAdministrativeFunctions']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
      $("a[href='#editRuleLexiconMaintenance']").children(":first").removeClass("fa-caret-down").addClass("fa-caret-right");
    })

    $("a[href='#editSupervisionOverview-content']").click(function() {
      $("#editSupervisionOverview-dropdown").toggle();
      $("a[href='#editSupervisionOverview']").click();
      $("#editSupervisionOverview").collapse("show");
      $("#editSupervision-MessageProfile").collapse("hide");
      $("#editSupervisoryWorkflow").collapse("hide");
      $("#editAdministrativeFunctions").collapse("hide");
      $("#editRuleLexiconMaintenance").collapse("hide");
    })

    $("a[href='#editSupervision-MessageProfile-content']").click(function() {
      $("#editSupervisionOverview").collapse("show");
      $("#editSupervision-MessageProfile").collapse("show");
      $("#editSupervisoryWorkflow").collapse("hide");
      $("#editAdministrativeFunctions").collapse("hide");
      $("#editRuleLexiconMaintenance").collapse("hide");
    })

    $("a[href='#editSupervisoryWorkflow-content']").click(function() {
      $("#editSupervisionOverview-dropdown").hide();
      $("#editSupervisionOverview").collapse("hide");
      $("#editSupervision-MessageProfile").collapse("hide");
      $("#editSupervisoryWorkflow").collapse("show");
      $("#editAdministrativeFunctions").collapse("hide");
      $("#editRuleLexiconMaintenance").collapse("hide");
    })

    $("a[href='#editAdministrativeFunctions-content']").click(function() {
      $("#editSupervisionOverview-dropdown").hide();
      $("#editSupervisionOverview").collapse("hide");
      $("#editSupervision-MessageProfile").collapse("hide");
      $("#editSupervisoryWorkflow").collapse("hide");
      $("#editAdministrativeFunctions").collapse("show");
      $("#editRuleLexiconMaintenance").collapse("hide");
    })

    $("a[href='#editRuleLexiconMaintenance-content']").click(function() {
      $("#editSupervisionOverview-dropdown").hide();
      $("#editSupervisionOverview").collapse("hide");
      $("#editSupervision-MessageProfile").collapse("hide");
      $("#editSupervisoryWorkflow").collapse("hide");
      $("#editAdministrativeFunctions").collapse("hide");
      $("#editRuleLexiconMaintenance").collapse("show");
    })

    $("#print-content").hide();

    $("#print-button").click(function() {
      $("#print-content").show();
      expanded = false;
      expand_collapse();
      var print = $("#print-content").html();
      var temp = $("body").html();
      $("body").html(print);
      $("button, a").remove();
      window.print();
      $("body").html(temp);
      location.reload();
    })

    $("#collapse-toggle").hide();
});

function delete_row(row) {
    if ($('#contacts_table > tbody > tr').length > 1 && editing_customer) {
        //alert('delete clicked');
        $(row).parent().parent().remove();
    }
}

function delete_diagram(row, url) {
    if (prompt("Delete this file? Type 'yes'.").toLowerCase() == 'yes') {

        let json = {
            type: "POST",
            timeout: 3000,
            url: url,
            success: function (res) {
                $(row).parent().parent().remove();
            },
            error: function (xhr, status, error) {
                alert('Failed to delete file.')
            }
        };

        // POST here.
        $.ajax(json);
    }
}
