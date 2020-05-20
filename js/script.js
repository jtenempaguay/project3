jQuery(document).ready(function ($) {
    $('.loading').show();
    function createBookListItem(book) {
        $('.loading').hide();
        var $li = $('<li>'); 
        $li.addClass('list-group-item hover-invert cursor-pointer');
        $li.html(book.title); 
        $li.data('bookID', book.id);
        return $li;
    }
    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function (response) {
        response.data.forEach(function (book) {
            $('#book-list').prepend(createBookListItem(book));
        });
        $('.list-group-item').on('click', function () {
            $('.list-group-item').removeClass('active');
            var bookID = $(this).data('bookID');
            $('.card').addClass('bookShow');
            $(this).addClass('active');
            $('#book-card').addClass('book-load');
            axios.get('http://csc225.mockable.io/books/' + bookID).then(function (response) {
                $('#book-card').removeClass('book-load');
                var $img = $('<img>').attr('src', response.data.cover).attr('alt', response.data.title);
                var author = '<li class=list-group-item> Author: ' +response.data.author+ '</li>';
                var country = '<li class=list-group-item> Country: ' +response.data.country+ '</li>';
                var language = '<li class=list-group-item> Language: ' +response.data.language+ '</li>';
                var link = '<li class=list-group-item> Link: <a href=' +response.data.link+ '>'+response.data.link+'</a></li>';
                var pages = '<li class=list-group-item> Pages: ' +response.data.pages+ '</li>';
                var title = '<h5 class=text-center>' +response.data.title+ '</h5>';
                var year = '<li class=list-group-item> Year: ' +response.data.year+ '</li>';
                var $outputInfo = title + author + country + language + link + pages + year ; 
                $('#book-card').html($outputInfo).prepend($img);
            });
            $( "#book-card" ).empty();
        });
    }); 
});