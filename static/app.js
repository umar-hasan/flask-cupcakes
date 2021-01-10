$(document).ready(function() {
    
    const URL = "http://localhost:5000"
    let table = $('#table-body')

    $('#cupcake-form').on("submit", async function(e){
        e.preventDefault()
        let res = await axios.post(`${URL}/api/cupcakes`, json={
            flavor: $('#flavor-input').val(),
            size: $('#size-input').val(),
            rating: $('#rating-input').val(),
            image: $('#image-input').val()
        })

        table.append(`
            <tr class="cupcake" data-id="${res.data.cupcake.id}">
                <td>${res.data.cupcake.flavor}</td>
                <td>${res.data.cupcake.size}</td>
                <td>${res.data.cupcake.rating}</td>
                <td><img src=${res.data.cupcake.image} alt="" class="h-25"></td>
                <td class="text-center align-middle">
                    <button type="button" class="btn-close" aria-label="Close"></button>
                </td>
            </tr>`)

    })

    $('.btn-close').on("click", async function() {
        const id = $(this).parent().parent().data('id')
        await axios.delete(`${URL}/api/cupcakes/${id}`)
        $(this).parent().parent().remove()
    })

});