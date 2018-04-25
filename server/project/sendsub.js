(function () {
    return function (request, script) {
        //获得相应路径
        var configFile = File.loadProperty("app/ued/ued.cfg");
        var resourcePath = configFile.getProperty("ued_resource_path");
        var sitePath = configFile.getProperty("ued_site_path");
        var sendFile = File.readString("/home/ued/ux-file/subscription/update-project-content.json");
        var sendData = JSON.parse(sendFile);
        var options = {
            requestProperty: {
                "content-type": "application/json"
            },
            connectTimeout: 60000,
            readTimeout: 20000,
            hasEncoded: true
        };
        var result, userInfor, sql, subUserArr, text, querySearch;

        if (sendData && sendData.author.length && sendData.projectNames.length) {
            userInfor = Rest.get('http://rdk.zte.com.cn/rdk/service/app/ued/server/project/userInfo?uid=' + sendData.author[1], options);
            if (!userInfor) {
                return 'fail';
            }
            userInfor = JSON.parse(userInfor);
            sendData.projects.forEach(function (val, index) {
                sql = "SELECT uId from ued_project_subscription WHERE SerialNum='" + val.projectID + "' AND state=1";
                querySearch = Data.fetch(sql);
                if (querySearch.data.length) {
                    subUserArr = [];
                    querySearch.data.forEach(function (value, index) {
                        subUserArr.push(value[0]);
                    });
                    text = "";
                    text += '<div style="' +
                        '        font-family: ' + "'Microsoft Yahei'" + ', Verdana, Simsun;' +
                        '        width: 540px;' +
                        '        margin: 0 auto;' +
                        '        margin-top: 12px;' +
                        '        box-sizing: border-box;' +
                        '        background-color: #fff;' +
                        '        box-shadow: 0 0 46px 5px rgba(0,0,0,.29);' +
                        '        color: #888;' +
                        '        text-align: center;">' +
                        '  <ul style="padding:1px">' +
                        '    <li style="margin: 30px 0 15px;">' +
                        '      <img src="http://rdk.zte.com.cn/assets/img/update.png" alt="项目更新">' +
                        '    </li>' +
                        '    <li style="margin: 0 auto;color: #888;">' +
                        '      <div style="font-size: 16px;line-height: 30px;">' +
                        '       <p style="width: 400px;margin: 0 auto;margin-bottom: 20px;font-size: 30px;font-weight:bold;white-space: nowrap;' +
                        '                text-overflow: ellipsis;' +
                        '                -o-text-overflow: ellipsis;' +
                        '                overflow: hidden;color: #288bf0;" title="' + val.projectName +
                        '">' + val.projectName + '</p>' +
                        '        <p class=" white-space: nowrap;' +
                        '                   text-overflow: ellipsis;' +
                        '                   -o-text-overflow: ellipsis;' +
                        '                   overflow: hidden;">管理员&nbsp;&nbsp;' + sendData.author[0] + ' &nbsp;&nbsp;' + sendData.author[1] + '</p>' +
                        '        <p style="width: 300px;margin: 0 auto;white-space: nowrap;' +
                        '                text-overflow: ellipsis;' +
                        '                -o-text-overflow: ellipsis;' +
                        '                overflow: hidden;" title="${info.dept}">' + userInfor.data.dept + '</p>' +
                        '        <p style="font-color: #000;text-align: left;margin-left: 20px;"> 您订阅的项目在以下更新:</p>' +
                        '        <div style="text-align: left;margin: 0 10px 0 20px; min-height: 90px;max-height: 225px; overflow: auto;font-size: 16px;">';

                    if (val.proFiles.length) {
                        text += "<h4 style='font-weight: normal;font-size:16px;margin:0;'>原型</h4><div style = 'margin-left: 20px;'>";
                        val.proFiles.forEach(function (proval) {
                            text += '<p><strong style="color: #288bf0;font-weight: normal;">' + proval.type + ': </strong>' + proval.content + '</p>';
                        });
                        text += "</div>";
                    }
                    if (val.encFiles.length) {
                        text += "<h4 style='font-weight: normal;font-size:16px;margin:0;'>效果图</h4><div style = 'margin-left: 20px;'>";
                        val.encFiles.forEach(function (encval) {
                            text += '<p><strong style="color: #288bf0;font-weight: normal;">' + encval.type + ': </strong>' + encval.content + '</p>';
                        });
                        text += "</div>";
                    }
                    if (val.desFiles.length) {
                        text += "<h4 style='font-weight: normal;font-size:16px;margin:0;'>附件</h4><div style = 'margin-left: 20px;'>";
                        val.desFiles.forEach(function (descval) {
                            text += '<p><strong style="color: #288bf0;font-weight: normal">' + descval.type + ': </strong>' + descval.content + '</p>';
                        });
                        text += "</div>";
                    }
                    text += '</div>' +
                        '       ' +
                        '      </div>' +
                        '       ' +
                        '    </li>' +
                        '    <li>' +
                        '      <a style="display: inline-block;width: 118px;' +
                        '      height: 36px;' +
                        '      margin-top: 10px;' +
                        '      margin-bottom: 20px;' +
                        '      line-height: 36px;' +
                        '      border-radius: 18px;' +
                        '      background-color: #288bf0;' +
                        '      color: #fff;' +
                        '      font-size: 16px;text-decoration: none;" href="http://rdk.zte.com.cn/projects/' + val.projectID + '">立即查看</a>' +
                        '    </li>' +
                        '  </ul>' +
                        '</div>';

                    var postDate = {
                        "content": {
                            "title": "测试：" + val.projectName,
                            "text": text,
                            "imgs": []
                        },
                        "fromwho": sendData.author[1],
                        "towho": {"resId": "", "indv": subUserArr}
                    };
                    result = Rest.post("http://10.9.233.35:20080/xplan/mail/send", postDate, options, true);

                    if (result === "\"done\"") {
                        Shell.execute('sh ' + sitePath + '/rdk/app/ued/build/scripts/git-log-last.sh ' + resourcePath, 0)
                    }
                }

            });
            return {
                "msg": result
            };
        } else {
            return {
                "msg": "更新的不是项目内容"
            };
        }

    };
})();