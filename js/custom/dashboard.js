$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(_index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr data-id="'+ order.order_id +'" data-name="'+ order.customer_name +'" data-dt="'+ order.datetime +'">' +
                    '<td>'+ order.datetime +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.customer_name +'</td>'+
                    '<td>'+ order.total.toFixed(2) +' Rs</td>'+
                    '<td><center><span class="btn btn-success view-order">View</span></center></td>'+
                    '<td><center><span class="btn btn-danger delete-order">Delete</span></center></td></tr>';
            });
            $("table").find('tbody').empty().html(table);
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

$(document).on("click", ".delete-order", function (){
    var tr = $(this).closest('tr');
    var data = {
        order_id : tr.data('id')
    };
    var isDelete = confirm("Are you sure to delete ?");
    if (isDelete) {
        callApi("POST", orderDeleteApiUrl, data);
    }
});

$(document).on("click", ".view-order", function (){
    var tr = $(this).closest('tr');
    var data = {
        order_id : tr.data('id')
    };
    window.location.href='order_details.html';
    callApi("GET", orderdetailsApiUrl, data);
    });

$(document).on("click", ".edit-order", function (){
    var tr = $(this).closest('tr');
    var data = {
        order_id : tr.data('id')
    };
    window.location.href='order.html';
    // callApi("POST", orderdetailsApiUrl, data);
    });