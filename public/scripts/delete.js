function delete_customer(customer_name) {
        if (prompt("Please type: " + customer_name) == customer_name) {
            $.ajax({
                type: 'POST',   
                timeout: 3000,
                url: "./index/" + encodeURIComponent(customer_name) + "?_method=DELETE",
                data: {},
                success: function () {
                    // Show an alert
                    var alert = document.createElement("div");
                    alert.className = "alert alert-success";
                    var closeButton = document.createElement("button");
                    closeButton.className = "close"
                    closeButton.setAttribute("data-dismiss", "alert")
                    closeButton.innerHTML = "&times;";
                    var body = document.createElement("p");
                    var node = document.createTextNode("Deleted customer: " + customer_name);
                    body.appendChild(node);
                    alert.appendChild(closeButton);
                    alert.appendChild(body);
                    var element = document.getElementById("alert-list");
                    element.appendChild(alert);
                    // Delete the row for this customer
                    var rowNum = document.getElementById(customer_name);
                    document.getElementById("tblCustomers").deleteRow(rowNum.rowIndex);
                },
                error: function () {
                    var alert = document.createElement("div");
                    alert.className = "alert alert-danger";
                    var closeButton = document.createElement("button");
                    closeButton.className = "close"
                    closeButton.setAttribute("data-dismiss", "alert")
                    closeButton.innerHTML = "&times;";
                    var body = document.createElement("p");
                    var node = document.createTextNode("Error - Unable to delete customer: " + customer_name);
                    body.appendChild(node);
                    alert.appendChild(closeButton);
                    alert.appendChild(body);
                    var element = document.getElementById("alert-list");
                    element.appendChild(alert);
 

                }
            });
        } else {
            var alert = document.createElement("div");
            alert.className = "alert alert-danger";
            var closeButton = document.createElement("button");
            closeButton.className = "close"
            closeButton.setAttribute("data-dismiss", "alert")
            closeButton.innerHTML = "&times;";
            var body = document.createElement("p");
            var node = document.createTextNode("Delete Failed - you did not type the customer name correctly");
            body.appendChild(node);
            alert.appendChild(closeButton);
            alert.appendChild(body);
            var element = document.getElementById("alert-list");
            element.appendChild(alert);
        }    
    
}
