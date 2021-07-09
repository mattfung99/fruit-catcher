let test_queue = new Queue();
let data_handler = {};

$(document).ready(function () {
    // Test
    getDefData();

    let timer = window.setInterval(function () {
        getGenInt()
    }, 500)

    function getGenInt() {
        $.ajax({
            url: "/gen_int",
            type: "POST",
            dataType: "json",
            success: function (data) {
                test_queue.enqueue(data);
                if (test_queue.len() == 5) {
                    clearInterval(timer);
                    console.log(test_queue);
                }
            }
        });
    }

    function getDefData() {
        $.ajax({
            url: "/get_def_data",
            type: "POST",
            dataType: "json",
            success: function (data) {
                data_handler = data;
                console.log(data_handler);
                document.getElementById("test_container").innerHTML = "Success, the passed data is: " + data_handler.score;
            }
        });
    }

    $('#make_ajax').click(function () {
        data_handler.score += 1;
        console.log(data_handler);
        console.log(JSON.stringify(data_handler));
        $.ajax({
            url: "/up_def_data",
            type: "POST",
            data: JSON.stringify(data_handler),
            contentType: 'application/json;charset=UTF-8',
            crossDomain: true,
            dataType: "json",
            success: function (data) {
                console.log(data.score);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});