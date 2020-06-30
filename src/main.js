const getUser = (userId, users) => {
    return users.find(user => user.id === userId).name;
}

const pageChanger = (pageId) => {
    window.location = "post.html?id=" + pageId;
}

const setPage = (pageNumber) => {
    window.location = "index.html?pageNumber=" + pageNumber;
}

$(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('id'))
        return;
    let param = Number(searchParams.get('id'));
    let $postHeader = $('#post-header');
    let $comments = $('#comments');
    $.when($.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/" + param,
    }), $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
    }), $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/" + param + "/comments",
    })).then((resp1, resp2, resp3) => {
        let post = resp1[0];
        let comments = resp3[0];
        $postHeader.append('<h1>"' + post.title + '"</h1><h5 class="font-italic">Posted by: ' + getUser(post.userId, resp2[0]) + '</h5>'
        + '<p>' + post.body + '</p>');
        $.each(comments, (i, comment) => {
            $comments.append('<h1 class="mt-lg-5">"' + comment.name + '"</h1><h5 class="font-italic">Posted by: ' + comment.email + '</h5>'
                + '<p>' + comment.body + '</p>');
        })
    });
})

$(() => {
    let $posts = $('#posts');
    let searchParams = new URLSearchParams(window.location.search);
    let pageNumber = 0;
    if (!searchParams.has('pageNumber'))
        pageNumber = 1;
    else
        pageNumber = Number(searchParams.get('pageNumber'));
    pageNumber--;

    $.when($.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/posts"
    }), $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users"
    })).then((resp1, resp2) => {
        $.each(resp1[0], (i, post) => {
            if (i < pageNumber * 20 || i >= pageNumber * 20 + 20)
                return;
            $posts.append('<h2 class="mt-lg-5">"' + post.title + '"</h2><p>' + 'Posted by: ' + getUser(post.userId, resp2[0])
                + '</h2><p><a onclick="pageChanger(\'' + post.id + '\')" class="btn btn-danger btn-lg" role="button">Read more</a></p>')
        })
    });
})

$(() => {
    let $pagination = $('#pagination');

    let searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('pageNumber') || Number(searchParams.get('pageNumber')) === 1) {
        $pagination.append('<li class="page-item disabled">'
            + '<a class="page-link">Previous</a></li>'
            + '<li onclick="setPage(1)" class="page-item"><a class="page-link">1</a></li>'
            + '<li onclick="setPage(2)" class="page-item"><a class="page-link">2</a></li>'
            + '<li onclick="setPage(3)" class="page-item"><a class="page-link">3</a></li>'
            + '<li onclick="setPage(4)" class="page-item"><a class="page-link">4</a></li>'
            + '<li onclick="setPage(5)" class="page-item"><a class="page-link">5</a></li>'
            + '<li onclick="setPage(2)" class="page-item"><a class="page-link">Next</a></li>')
        return;
    }
    let param = Number(searchParams.get('pageNumber'));
    if (param === 5)
        $pagination.append('<li onclick="setPage(\'' + (param - 1) + '\')" class="page-item"><a class="page-link">Previous</a></li>'
            + '<li onclick="setPage(1)" class="page-item"><a class="page-link">1</a></li>'
            + '<li onclick="setPage(2)" class="page-item"><a class="page-link">2</a></li>'
            + '<li onclick="setPage(3)" class="page-item"><a class="page-link">3</a></li>'
            + '<li onclick="setPage(4)" class="page-item"><a class="page-link">4</a></li>'
            + '<li onclick="setPage(5)" class="page-item"><a class="page-link">5</a></li>'
            + '<li class="page-item disabled"><a class="page-link">Next</a></li>')
    else
        $pagination.append('<li onclick="setPage(\'' + (param - 1) + '\')" class="page-item"><a class="page-link">Previous</a></li>'
            + '<li onclick="setPage(1)" class="page-item"><a class="page-link">1</a></li>'
            + '<li onclick="setPage(2)" class="page-item"><a class="page-link">2</a></li>'
            + '<li onclick="setPage(3)" class="page-item"><a class="page-link">3</a></li>'
            + '<li onclick="setPage(4)" class="page-item"><a class="page-link">4</a></li>'
            + '<li onclick="setPage(5)" class="page-item"><a class="page-link">5</a></li>'
            + '<li onclick="setPage(\'' + (param + 1) + '\')" class="page-item"><a class="page-link">Next</a></li>')
})

$(() => {
    let $dropdownNumbers = $('#dropdownNumbers');

    for (let i = 5; i <= 20; i++)
        $dropdownNumbers.append('<a class="dropdown-item" onclick="reloadPage(\'' + i + '\')">' + i + '</a>');
})