$(document).ready(() => {
    let classes = [
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

    classes.forEach(classname => {
        key_sync(classname);
    });
});

function key_sync(selector) {
    $("." + selector).keyup(function () {
        $("." + selector).val($(this).val());
    });
}