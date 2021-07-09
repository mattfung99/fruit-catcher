let test_queue = new Queue();

$(function () {
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
            url: "/def_data",
            type: "POST",
            dataType: "json",
            success: function (data) {
                console.log(data);
                document.getElementById("test_container").innerHTML = "Success, the passed data is: " + data.score;
                // let get_def_data = parseData(JSON.stringify(data));
                // console.log("Datatype of get_def_data: " + typeof(get_def_data));
                // document.getElementById("test_container").innerHTML = "Success, the passed data is: " + get_def_data;
            }
        });
    }
});

function parseData(get_def_data) {
    return parseInt(get_def_data.substring(get_def_data.indexOf(':') + 1, get_def_data.length - 1));
}