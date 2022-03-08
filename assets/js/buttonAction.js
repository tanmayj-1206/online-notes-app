{
    let btnAction = function(){
        $('#btn-add-note').click(function(e){
            $('#btn-add-note').addClass('d-none');
            $('#btn-edit').addClass('d-none');
            $('#btn-done').addClass('d-none');
            $('#btn-all-note').removeClass('d-none');
            $('.notepad-container').removeClass('d-none');
            $('.notes-container').addClass('d-none');

            $.ajax({
                type: "post",
                url: "/create-note",
                success: function (response) {
                    console.log(response.data);
                    $('textarea').val('');
                    $('#new-note-id').val(response.data._id);
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('.home-error-alert').removeClass('d-none');
                    $('.home-error-alert>div>span').html(msg.message)
                    $('.notes-container').html('');
                }
            });
        });

        $('#btn-all-note').click(function(e){
            $('#btn-add-note').removeClass('d-none');
            $('#btn-edit').removeClass('d-none');
            $('#btn-done').addClass('d-none');
            $('#btn-all-note').addClass('d-none');
            $('.notepad-container').addClass('d-none');
            $('.notes-container').removeClass('d-none');

            $.ajax({
                type: "get",
                url: "/show-notes",
                success: function (response) {
                    console.log(response);
                    let html = '';

                    for(note of response.data){
                        html += `<div class="row justify-content-center mt-2 note-${note._id}">
                        <div class="col-lg-6 col-md-8 col-12">
                            <div class="row align-items-center justify-content-between">
                                <div class="col-4 d-none delete-btn-container">
                                    <div class="d-grid gap-2">
                                    <a href="/delete-note/${note._id}" class="btn btn-md-lg btn-danger delete-btn" type="button">Delete</a>
                                    </div>
                                </div>
                                <div class="col notes-list">
        
                                    <div class="border border-dark border-1 bg-light bg-gradient px-2 note-list-container" style="border-radius: 15px; cursor: pointer;">
                                        <span class="fs-4 d-block" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                                            ${note.content}
                                        </span>
                                        <span class="updated-at d-block" style="font-size: 0.9rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;" value="${note.updatedAt}">
                                            
                                        </span>
                                        <input type="hidden" name="id" value="${note._id}">
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>`
                    }

                    $('.notes-container').html(html);
                    assignDate();
                }, error: function(err){
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('.home-error-alert').removeClass('d-none');
                    $('.home-error-alert>div>span').html(msg.message)
                    $('.notes-container').html('');
                }
            });
        });

        $('#btn-edit').click(function(){
            $('#btn-add-note').removeClass('d-none');
            $('#btn-edit').addClass('d-none');
            $('#btn-done').removeClass('d-none');
            $('#btn-all-note').addClass('d-none');

            $('.delete-btn-container').removeClass('d-none');
            $('.notes-list').addClass('col-8');
            $('.notes-list').removeClass('col');
        })

        $('#btn-done').click(function(){
            $('#btn-add-note').removeClass('d-none');
            $('#btn-edit').removeClass('d-none');
            $('#btn-done').addClass('d-none');
            $('#btn-all-note').addClass('d-none');

            $('.delete-btn-container').addClass('d-none');
            $('.notes-list').removeClass('col-8');
            $('.notes-list').addClass('col');
        })

        $(document).on('click', '.delete-btn', function(e){
            e.preventDefault();
            $.ajax({
                type: "get",
                url: $(this).prop('href'),
                success: function (response) {
                    $(`.note-${response.data}`).remove();
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('.home-error-alert').removeClass('d-none');
                    $('.home-error-alert>div>span').html(msg.message)
                    $('.notes-container').html('');
                }
            });
        })

        $('textarea').keyup(function (e) { 
            let data = {
                content: $('textarea').val(),
                id: $('#new-note-id').val()
            }

            $.ajax({
                type: "post",
                url: "/update-note",
                data: data,
                success: function (response) {
                    
                }, error: function(err){
                    console.log(err.responseText);
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('.home-error-alert').removeClass('d-none');
                    $('.home-error-alert>div>span').html(msg.message)
                    $('.notes-container').html('');
                }
            });
        });

        $(document).on('click', '.note-list-container', function(){
            let data = {id: $(' >input', this).val()}
            console.log(data)
            $.ajax({
                type: "post",
                url: "/get-note",
                data: data,
                success: function (response) {
                    console.log('a');
                    $('#btn-add-note').addClass('d-none');
                    $('#btn-edit').addClass('d-none');
                    $('#btn-done').addClass('d-none');
                    $('#btn-all-note').removeClass('d-none');
                    $('.notepad-container').removeClass('d-none');
                    $('.notes-container').addClass('d-none');

                    $('textarea').val(response.data.content);
                    $('#new-note-id').val(response.data._id);
                }, error: function(err){
                    console.log(err.responseText)
                    let msg = eval("(" + err.responseText + ")");
                    console.log(msg.message);
                    $('.home-error-alert').removeClass('d-none');
                    $('.home-error-alert>div>span').html(msg.message)
                    $('.notes-container').html('');
                }
            });
        });
    }

    let assignDate = function(){
        $('.updated-at').each(function(){
            let date = $(this).attr('value');
            let dateString = new Date(date);
            dateString = dateString.toLocaleDateString('default', {month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'ist'});
            $(this).html(dateString);
        })
    }

    assignDate();

    btnAction();
}