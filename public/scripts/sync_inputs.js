$(document).ready(() => {
    let inputs = [
        "exchange_version",
        "number_of_mail_servers",
        "describe_exchange_env",
        "structure",
        "O365_version",
        "sync_tools",
        "number_of_forests",
        "resource_forest_deployment",
        "diagram",
        "AD_size"
    ];

    inputs.forEach(classname => {
        key_sync(classname);
    });

    // let selects = [
    //     "has_enterprise_CAL",
    //     "is_multi_forest",
    //     "is_resource_forest_arrangement",
    //     "is_using_multi_domains",
    //     "is_maintaining_on_prem_AD",
    //     "is_maintaining_azure",
    //     "is_admin_in_AD_or_azure",
    //     "which_O365",
    //     "is_using_DAG"
    // ];

    // selects.forEach(select => {
    //     dropdown_sync(select);
    // });
});

function key_sync(selector) {
    $("input." + selector).keyup(function () {
        $("input." + selector).val($(this).val());
    });
}

function dropdown_sync(selector) {
    $(`select.${selector}`).change(function (e) {
        $(`select.${selector}`).val(this.value);
    });
}