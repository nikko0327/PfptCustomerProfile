$(document).ready(() => {
    let inputs = [
        // SE
        "exchange_version",
        "number_of_mail_servers",
        // "describe_exchange_env",
        "structure",
        //"O365_version",
        // "sync_tools",
        "number_of_forests",
        "resource_forest_deployment",
        "diagram",
        "AD_size",
        // PS
        "number_of_inboxes",
        "number_of_extra_storage",
    ];

    inputs.forEach(classname => {
        key_sync(classname);
    });

    let selects = [
        // PS
        "O365_version",
        "has_enterprise_CAL",
        "is_multi_forest",
        "is_resource_forest_arrangement",
        "is_using_multi_domains",
        "is_maintaining_on_prem_AD",
        "is_maintaining_azure",
        "is_admin_in_AD_or_azure",
        "which_O365",
        // "is_using_DAG",
        "LDAP",
        // SE
        "is_journal_in_own_DB",
        "is_using_RMS",
        "is_journal_decryption_enabled",
        "is_using_azure_rms",
        "is_using_IRM",
        "is_using_message_encryption",
    ];

    selects.forEach(select => {
        dropdown_sync(select);
    });
});

function key_sync(selector) {
    $("input." + selector).keyup(function () {
        if (sync_forms) {
            $("input." + selector).val($(this).val());
        }
    });
}

function dropdown_sync(selector) {
    $(`select.${selector}`).change(function (e) {
        if (sync_forms) {
            $(`select.${selector}`).val(this.value);
        }
    });
}