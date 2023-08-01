var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(_index, products) {
                    table += '<tr data-category="'+ products.cat_id +'"data-id="'+ products.product_id +'" data-name="'+ products.name +'" data-unit="'+ products.uom_id +'" data-price="'+ products.price_per_unit +'">' +
                        '<td>'+ products.cat_name +'</td>'+
                        '<td>'+ products.name +'</td>'+
                        '<td>'+ products.uom_name +'</td>'+
                        '<td>'+ products.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            cat_id: null,
            name: null,
            uom_id: null,
            price_per_unit: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'category':
                    requestPayload.cat_id = element.value;
                    break; 
                case 'name':
                    requestPayload.name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#category, #name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        // JSON data by API call

        $.get(catListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(_index,category) {
                    options += '<option value="'+ category.cat_id +'">'+ category.cat_name +'</option>';
                });
                $("#category").empty().html(options);
            }
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function (_index,uom) {
                        options += '<option value="' + uom.uom_id + '">' + uom.uom_name + '</option>';
                    });
                $("#uoms").empty().html(options);
            }
        });
    });
    });