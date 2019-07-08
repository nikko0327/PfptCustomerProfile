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
})
