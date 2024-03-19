
function deleteProduct(id) {

    console.log(id, "product-id");
    const result = confirm("Are your sure to delete the product?");
    if(result) {
        fetch("/delete-product/" + id, {
            method: 'POST'
        }).then((res) => {
            if(res.ok) {
                location.reload();
            }
        })
    }
}

