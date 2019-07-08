$(document).ready((() => {
    $("#add_row").click(function (e) {
        let table = $('#contacts_table');
        //console.log(table.find('tbody tr').length);

        table.find('tbody').append('<tr><td>' +
            '<input type="text" class="form-control" placeholder="Contact Name" name="customer[contacts][' + table.find('tbody tr').length + '][name]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Title" name="customer[contacts][' + table.find('tbody tr').length + '][title]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Email" name="customer[contacts][' + table.find('tbody tr').length + '][email]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Contact Phone" name="customer[contacts][' + table.find('tbody tr').length + '][phone]" value=""/>' +
            '</td><td>' +
            '<input type="text" class="form-control" placeholder="Primary Contact" name="customer[contacts][' + table.find('tbody tr').length + '][primary_contact]" value=""/>' +
            '</td></tr>');
    });

    $("#delete_row").click(function (e) {
        let table = $('#contacts_table');

        if (table.find('tbody tr').length > 1) {
            table.find('tbody tr:last-child').remove();
        }
    });

    $("#reset").click(function() {
      return confirm("Are you sure?");
    })
}));
