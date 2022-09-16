$(function () {
    load();
    // 按下回车，把完整数据存入本地
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($("#title").val() == "") {
                alert("请输入内容")
            } else {
                // 先读取本地存储原来的数据
                var local = getData();
                // 把local数组进行跟新数据，把最新的数据追加个i数组
                local.push({ title: $(this).val(), done: false });
                // 把local数组存储给本地
                saveData(local);

                // 本地存储数据渲染到页面中
                load();
                $(this).val("");
            }

        }
    })

    // 读取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));

    }

    // 删除操作
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();

    })

    // 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    })

    // 删除全部
    $("footer a").on("click", function () {
        localStorage.clear();
        load();
    })

    // 渲染加载数据
    function load() {
        var todoCount = 0; // 正在进行的个数
        var doneCounet = 0; // 已经完成的个数
        // 遍历前清空Ol里面的内容
        $("ol,ul").empty();
        // 读取本地数据
        var data = getData();
        // 遍历数据
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id='" + i + "'>-</a></li>");
                doneCounet++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id='" + i + "'>-</a></li>");
                todoCount++;
            }

        })

        // 修改统计个数
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCounet);
    }

})