function delete_customer(customer_name) {

    if (confirm("Delete entry for " + customer_name + "?")) {
        if (prompt("Please type in the customer's name you're trying to delete: ") == customer_name) {
            $.ajax({
                type: 'POST',
                timeout: 3000,
                url: "/customerprofile/index/" + encodeURIComponent(customer_name) + "?_method=DELETE",
                data: {},
                success: function () {
                    alert("Customer " + customer_name + " deleted.");
                    location.href = "/customerprofile/";
                },
                error: function () {
                    alert("Error deleting customer " + customer_name);
                }
            });
        } else {
            alert("Incorrect customer name.");
        }
    }
}