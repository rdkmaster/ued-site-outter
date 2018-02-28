(function () {
    function selectDataSource(params){
        var database = params[0];   //注意，param为函数argument数组
        log(database);
        switch (database){
            case "mysql":
                return "db.default";
            case "hbase":
                return "db.hbase";
            default:
                return "db.default"
        }
    }

    function _init_() {
        Data.setDataSourceSelector(selectDataSource);
        Data.useDataSource("mysql");
    }

    return {
        init: _init_
    }
})();
