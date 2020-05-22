function delete_customer(customer_name) {
        if (prompt("Please type: " + customer_name) == customer_name) {
            $.ajax({
                type: 'POST',   
                timeout: 3000,
                url: "./index/" + encodeURIComponent(customer_name) + "?_method=DELETE",
                data: {},
                success: function () {
                    document.getElementById("toast-header").innerHTML = "Delete Customer";
                    document.getElementById("toast-body").innerHTML = "Successfully Deleted: " + customer_name;
                    // Delete the row for this customer
                    var rowNum = document.getElementById(customer_name);
                    document.getElementById("tblCustomers").deleteRow(rowNum.rowIndex);
                },
                error: function () {
                   document.getElementById("toast-header").innerHTML = "Error Deleting Customer";
                   document.getElementById("toast-body").innerHTML = "Failed to delete: " + customer_name;
                }
            });
        } else {
            document.getElementById("toast-header").innerHTML = "Cannot Delete Customer";
            document.getElementById("toast-body").innerHTML = "Invalid Customer Name";
        }

    
    $('.toast').toast('show');
 
    // No need to reload the entire page with AJAX
    // window.location.reload();
}
