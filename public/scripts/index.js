$(document).ready(function() {
  $("#myTable").DataTable({
    dom: 'Bfrtip',
    buttons: [
        {
            extend: 'collection',
            text: 'Export',
            buttons: [
                'excel',
                'csv',
                'pdf',
                'print'
            ]
        }
    ]
  });

  $("#customerForm").submit(function(e) {
    e.preventDefault();
    let form = $("#customerForm");
    let json = {
        type: "POST",
        timeout: 3000,
        url: form.attr('action'),
        data: form.serialize(),
        success: function (res) {
            alert('Customer information updated.');
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
    $.ajax(json);
    location.reload();
  })
})
