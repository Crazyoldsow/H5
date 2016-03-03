<script type="text/javascript" src="http://www.youziku.com/UserDownFile/jquery.min.js"></script>
<script type="text/javascript" src="http://www.youziku.com/UserDownFile/jquery.md5.js"></script>
<script type="text/javascript">
    function youzikujsm() {
        var datastr = [], datamd5 = [], dataname = ["minijianxiyuan"], dataguid = ["502081dae41c45219af8263c3766c6b0"];
        for (var i = 0; i < dataname.length; i++) {
            var elem = dataname[i];
            var resultStr = $("." + elem).text(); resultStr = Trim(resultStr);
            resultStr = SelectWord(resultStr); datastr.push(resultStr);
            var md5 = $.md5(dataguid[i] + elem + resultStr); datamd5.push(md5);
        }
        var strdatamd5 = datamd5.join(","), strdataguid = dataguid.join(",");
        $.getJSON("http://www.youziku.com/webfont/JSArrayPOST?jsoncallback=?", { "arraymd5": strdatamd5, "arrayguid": strdataguid, "type": "5" }, function (json) {
            var strdo = json.strdo, strdone = json.strdone, arraydo = strdo.split("*"), arraydone = strdone.split("*");
            arraydo.forEach(function (elem) {
                if (elem != null && elem != "") {
                    var item = parseInt(elem);
                    $.post("http://www.youziku.com/webfont/PostCorsCreateFont", { "name": dataname[item], "gid": dataguid[item], "type": "5", "text": datastr[item] }, function (json) {
                        if (json == "0") { /*alert("参数不对");*/
                        } else if (json == "2") {/*alert("超过每日生成字体数的上限");*/
                        } else if (json == "3") { /*alert("当前正在生成请稍后");*/
                        } else {/*alert("正在生成");*/
                        }
                    });
                }
            })
            arraydone.forEach(function (elem) {
                if (elem != null && elem != "") {
                    var item = parseInt(elem);
                    loadExtentFile("http://www.youziku.com/webfont/CSSJs?id=" + datamd5[item] + "&name=" + dataname[item] + "&guid=" + dataguid[item] + "&type=5");
                }
            })
        });
    }
    (function youziku() { youzikujsm(); })()
    </script>