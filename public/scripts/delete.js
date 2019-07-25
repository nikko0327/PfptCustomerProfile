function delete_customer(customer_name) {

    if (confirm("Delete entry for " + customer_name + "?")) {
        if (prompt("Please type in the customer's name you're trying to delete: ") == customer_name) {
            $.ajax({
                type: 'POST',
                timeout: 3000,
                url: "./index/" + encodeURIComponent(customer_name) + "?_method=DELETE",
                data: {},
                success: function () {
                    alert("Customer " + customer_name + " deleted.");
                },
                error: function () {
                    alert("Error deleting profile for customer " + customer_name);
                }
            });

            $.ajax({
                type: 'POST',
                timeout: 3000,
                url: "./files/" + encodeURIComponent(customer_name) + "?_method=DELETE",
                data: {
                    delete_customer: true
                },
                success: function () {
                    alert("Uploaded files for customer " + customer_name + " deleted.");
                },
                error: function () {
                    alert("Error deleting files for customer " + customer_name);
                }
            });
        } else {
            alert('Incorrect customer name.')
        }
    }

    window.location.reload();
}
