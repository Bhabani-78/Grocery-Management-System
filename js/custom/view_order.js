$(function () {
    //Json data by api call for order table
    $.get(orderdetailsApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(_index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr data-name="'+ order.name +'" data-quantity="'+ order.quantity +'" data-price="'+ order.price_per_unit +'" data-total_price="'+ order.total_price +'">' +
                    '<td>'+ order.name +'</td>'+
                    '<td>'+ order.quantity +'</td>'+
                    '<td>'+ order.price_per_unit +'</td>'+
                    '<td>'+ order.total_price +'</td>'+
                    '</tr>'
                });
                $("table").find('tbody').empty().html(table);
                table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
                $("table").find('tbody').empty().html(table);
        }
    });
});

