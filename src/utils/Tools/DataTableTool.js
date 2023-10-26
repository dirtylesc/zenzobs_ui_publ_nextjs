import 'datatables.net-plugins/pagination/input'
import 'datatables.net-plugins/pagination/scrolling'
import 'datatables.net-plugins/pagination/select'

import { decodeUTF8 } from '@/utils/Tools/NetworkTool'

const App       = {
    data        : {
        page    : 1
    }
}
var SDOM_DATATABLE_DEFAULT	= 	"<'row'<'col-lg-5 col-md-5 col-sm-5'l><'col-lg-7 col-md-7 col-sm-7'f>>" +
								"<'row'<'col-lg-12 col-md-12 col-sm-12'tr>>" +
								"<'row'<'col-lg-7 col-md-7 col-sm-12'i><'col-lg-5 col-md-5 col-sm-12'p>>";

function req_gl_Datatable_Ajax_Dyn(div, url, url_header, fileTraduction, colConfig, refJson, fError, timeWait, datatableClass, fPreprocess, fCallback, dataTableConf, scrollX) {
    if (!timeWait) timeWait = 800;

    if (!datatableClass) {
        datatableClass = '.table-datatableDyn';
    }

    var funtFuture;
    var tableId = div;
    var dataT = {
        "searchOption": false,
        "searchOptionConfig": [{ lab: "All", val: 0 }], //list des options dans select 

        "processing": true,

        bServerSide: true,
        //bProcessing	: false,  
        sAjaxSource: url,

        "aLengthMenu": [[15, 25, 50, 100], ["15", "25", "50", "100"]],

        //		    "pagingType"	: "input",
        //		    "pagingType"	: "simple_numbers",  
        //pagingType		: "full_numbers",

        //		    "sPaginationType": "scrolling",
        "sPaginationType": "listbox",
        //			sPaginationType	: "bootstrap",
        //			sPaginationType	: "full_numbers",    

        //		    aaSorting		: sort ? sort : [1, "asc"],

        bDeferRender: true,

        oLanguage: {
            sUrl: fileTraduction
        },

        //			oClasses		:{
        //				sFilterInput :  "inputClass",
        //				sLengthSelect : "selectClass",
        //			},

        sDom: SDOM_DATATABLE_DEFAULT,

        aoColumns: colConfig,

        fnServerData: function (sSource, aoData, fnCallback, oSettings) {
            //aoData =[{"name":"sEcho","value":3},{"name":"iColumns","value":2},{"name":"sColumns","value":","},{"name":"iDisplayStart","value":0},{"name":"iDisplayLength","value":10},{"name":"mDataProp_0","value":"code"},{"name":"sSearch_0","value":""},{"name":"bRegex_0","value":false},{"name":"bSearchable_0","value":true},{"name":"bSortable_0","value":true},{"name":"mDataProp_1","value":"name"},{"name":"sSearch_1","value":""},{"name":"bRegex_1","value":false},{"name":"bSearchable_1","value":true},{"name":"bSortable_1","value":true},{"name":"sSearch","value":"f"},{"name":"bRegex","value":false},{"name":"iSortCol_0","value":0},{"name":"sSortDir_0","value":"desc"},{"name":"iSortingCols","value":1}]
            //param = {name:3,iColumns:2,...}
            var param = {};

            //---chk if there is the option for search
            if (dataT.searchOption) {
                var selectEle = $(tableId).find("#sel_search_opt");
                param["searchOpt"] = selectEle.val();
                selectEle.off("change");
                selectEle.on("change", function () {
                    var searchText = $(tableId).find('.dataTables_filter').find('input').val();
                    if (searchText) searchText = searchText.trim();
                    if (searchText.length > 0)
                        dataT.fnServerData(sSource, aoData, fnCallback, oSettings);
                });
            } else {
                param["searchOpt"] = null; //no option, by default in server side
            }

            for (var k in aoData) {
                var o = aoData[k];
                param[o.name] = o.value;
            }

            refJson["dataTableParam"] = JSON.stringify(param);

            clearTimeout(funtFuture);

            funtFuture = setTimeout(function () {
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: sSource,
                    headers: url_header,
                    data: JSON.stringify(refJson),
                    success: function (msg) {
                        //		    				App.network.decodeUTF8(msg);								
                        //		    				msg.aaData = JSON.parse(msg.aaData);
                        //		    				fnCallback(msg);

                        if (!can_gl_BeLogged(msg)) return;
                        decodeUTF8(msg);
                        if (msg.sv_code == 20000) {
                            try {
                                msg.aaData = JSON.parse(msg.aaData);
                            } catch (e) {
                                //msg.aaData is aldready aaData
                            }

                        } else {
                            msg.aaData = [];
                            msg.iTotalRecords = 0;
                        }

                        if (fPreprocess) {
                            // Process the return data before building the table
                            msg = fPreprocess(msg);
                        }
                        if (msg.aaData.length >= 0) {
                            $(div).on("change", "select", function () {
                                if (!App.data.page) App.data.page = {};
                                App.data.page[div] = 1;
                            });

                            $(div).on("keydown", "input[type='search']", function () {
                                if (!App.data.page) App.data.page = {};
                                App.data.page[div] = 1;
                            });


                            fnCallback(msg);
                            if (fCallback) {
                                fCallback(msg.aaData, div, oTable, param);
                            }
                        }

                    },
                    error: function (res, statut, erreur) {
                        if (fError) execute(fError, [res, statut, erreur]);
                    },
                });
            }, timeWait);
        }

    };


    if (dataTableConf) dataT = Object.assign(dataT, dataTableConf);

    if (typeof (scrollX) == "undefined") {
        dataT["scrollX"] = true;
    }

    if (dataT["canScrollY"] == null || dataT["canScrollY"] == undefined || dataT["canScrollY"] == true) {
        //Scroll - vertical, dynamic height
        dataT["scrollY"] = "70vh";
        dataT["scrollCollapse"] = true;
    }

    if (dataT.searchOption) {
        dataT.sDom = SDOM_DATATABLE_SEARCH_OPT;

        dataT.initComplete = function (settings, json) {

            var opt = "";
            for (var i in dataT.searchOptionConfig) {
                var conf = dataT.searchOptionConfig[i];
                opt = opt + "<option value= '" + conf.val + "'>" + conf.lab + "</option>";
            }

            $(tableId).find("#table-header-search-opt").html(
                "<select class= 'form-control input-sm datatable_sel_search_opt' id='sel_search_opt'>"
                + opt
                + "</select> &nbsp;");

            //			$(tableId).find(".dataTables_filter").prepend(
            //					"<select class='form-control sel_search_opt' id='sel_search_opt'>"
            //					+ opt
            //					+ "</select> &nbsp;"); 


            //Add right to add btn

        }
    }

    //Enable ColReorder extension
    if (dataT["canColReorder"] == null || dataT["canColReorder"] == undefined || dataT["canColReorder"] == true) {
        dataT.sDom = "R" + dataT.sDom;
        //		new $.fn.dataTable.ColReorder( oTable );
    }

    $(div).find(datatableClass).addClass("table-bordered table-striped");
    var oTable = $(div).find(datatableClass).dataTable(dataT);

    return oTable;
}

var can_gl_BeLogged = function (res){
	if (!res.sess_stat){
//		localStorage.clear();	
		// try{
		// 	do_gl_LocalStorage_Remove (App.keys.KEY_STORAGE_CREDENTIAL);
		// }catch(e){}	
		// App.router.controller.do_lc_run(App.router.routes.HOME);
		return false;
	}		
	return true;
};

var req_gl_table_col_config = function (table, data, options) {
    if (!table.is("table")) {
        console.log("<table> is not a valid table");
        return;
    }
    var colConfig = [];
    var lstTh = table.find("th");
    var primaryCol = table.data("primary");
    if (lstTh) {
        lstTh.each(function (e, i) {
            var th = $(this);
            var name = th.data("name");
            var group = th.data("group");
            var groupIndex = th.data("gindex");
            var visible = th.data("visible");
            var editable = th.data("editable");

            var plugin = th.data("plugin");
            var tdClass = th.data("class");
            var tpyCode = th.data("code");
            var right = th.data("right");
            var pattern = th.data("pattern");
            var disable = th.data("disabled")
            var editable_class = "";
            if (visible == undefined) {
                visible = true;
            }
            if (editable == undefined) {
                editable = true;
            } else if (editable == "none") {
                editable = false;
            }

            if (visible == true && editable == true) {
                editable_class = "editable";
            }

            if (plugin == "fileinput") {
                //do not enable edit the td itself
                editable_class = "";
            }

            if (!tdClass) {
                tdClass = "";
            }

            if (name) {
                var config = { mData: name, bVisible: visible, sClass: editable_class + " " + name + " " + tdClass };
                if (name == "action") {
                    config.mData = "id";
                    bSortable = false;
                    //do not enable edit the td itself
                    config.sClass = name + " " + tdClass;
                }

                if (plugin == "fileinput") {
                    //fix the width so it not very large
                    config.sWidth = "30px";
                    //do not enable edit the td itself
                    config.sClass = name + " " + tdClass + " excl";
                }
                //bind default event
                config.fnCreatedCell = function (nTd, sData, oData, iRow, iCol) {
                    var line = $(nTd).parent();
                    line.attr("data-gIndex", iRow);

                    $(nTd).data("name", name);
                    if (group) $(nTd).data("group", group);
                    if (groupIndex) $(nTd).data("gindex", groupIndex);

                    if (visible == true && editable == true) {
                        $(nTd).keydown(function (event) {
                            if (event.which == 13) {
                                event.preventDefault();
                                var next = $(this).nextAll("[contenteditable='true']")[0];
                                if (next.length > 0) {
                                    next[0].focus();
                                } else {
                                    var nextLine = $(this).parent().next();
                                    if (nextLine.length > 0) {
                                        $(nextLine).find("[contenteditable='true']")[0].focus();
                                    }
                                }
                            }
                        });

                        if (plugin == "datepicker") {
                            do_gl_datepicker_plugin($(nTd), th);
                        } else if (plugin == "datetimepicker") {
                            do_gl_datetimepicker_plugin($(nTd), th);
                        } else if (plugin == "fileinput") {
                            $(nTd).html("<input class='fileinput editable' type='file' data-name='" + name + "' data-code='" + tpyCode + "'/>")
                            do_gl_init_fileinputPlugin($(nTd), { obj: oData, fileinput: { dropZoneEnabled: true } });
                        }
                    }

                    if (pattern) {
                        $(nTd).on("blur", function (event) {
                            var data = $(nTd).html();
                            data = data.split(" ").join("");
                            if (data != null && data != "") {
                                data = parseFloat(data).toFixed(2);
                                if (pattern == "number") {
                                    data = data.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(" ");
                                } else {
                                    var patt = pattern.split(",");
                                    var a = patt[0];
                                    var b = patt[1];
                                    data = data.toString().replace(new RegExp(a, "g"), b);
                                }

                                $(nTd).html(data);
                            }
                        });
                    }

                    if (name == "action") {
                        //bind delete line action
                        $(nTd).find(".a_delete").on("click", function () {
                            var table = $(this).parents("table").DataTable();
                            var row = table.row($(this).parents('tr'))
                            var canConfirm = false;
                            if (oData[primaryCol] != null && oData[primaryCol] != "") {
                                canConfirm = true;
                            }
                            // if (canConfirm) {
                            //     App.MsgboxController.do_lc_show({
                            //         title: $.i18n("msgbox_confirm_title"),
                            //         content: $.i18n("common_msg_del_confirm"),
                            //         buttons: {
                            //             OK: {
                            //                 lab: $.i18n("common_btn_ok"),
                            //                 funct: function () {
                            //                     oData.mode = 3;
                            //                     table.draw();
                            //                 },
                            //             },
                            //             NO: {
                            //                 lab: $.i18n("common_btn_cancel"),
                            //             }
                            //         }
                            //     });
                            // } else {
                            //     row.remove().draw();
                            // }
                        });
                    }

                    //add optional function
                    if (options && options[name] && options[name].fnCreatedCell) {
                        options[name].fnCreatedCell(nTd, sData, oData, iRow, iCol);
                    }
                }

                if (options && options[name] && options[name].mRender) {
                    config.mRender = options[name].mRender;
                } else {
                    config.mRender = function (data, type, oData, position) {
                        var dataFormat = th.data("format");
                        var name = th.data("name");
                        if (data === null || data === undefined || data === "") {
                            oData[name] = "";
                            data = "";
                        } else if (dataFormat) {
                            var pformat = "viShortDate";
                            localStorage.language == "vn" ? pformat = "vnShortDate" : localStorage.language == "fr" ? pformat = "frShortDate" : pformat = "enShortDate"
                            var parts = dataFormat.split(" ");
                            if (parts.length == 2) {
                                pformat = parts[1];
                            }
                            if (parts[0] == "date") {
                                var date = reg_gl_DateObj_From_DateStr(data, DateFormat.masks.isoDateTime);
                                data = value = reg_gl_DateStr_From_DateObj(date, DateFormat.masks[pformat]);

                                //								var date = luxon.DateTime.fromString(data, DateFormat.masks["isoDateTime"]);
                                //								data = value = date.toFormat(DateFormat.masks[pformat]);
                            } else if (parts[0] == "double") {
                                data = $.formatNumber(data, { format: parts[1], locale: localStorage.language })
                            } else if (parts[0] == "date_time") {
                                localStorage.language == "vn" ? pformat = "vnFullDate" : localStorage.language == "fr" ? pformat = "frFullDate" : pformat = "enFullDate"
                                var date = reg_gl_DateObj_From_DateStr(data, DateFormat.masks.isoDateTime);
                                data = value = reg_gl_DateStr_From_DateObj(date, DateFormat.masks[pformat]);
                            }
                        }
                        return data;
                    }
                }

                if (name == "action") {
                    config.mRender = function (id) {
                        var res = '<div class="box-icon" style="text-align:center" data-right="' + right + '">'
                            + '<a class="editable a_delete action-btn not-active" data-id="' + id + '" ><i class="fa fa-minus-circle"></i></a></div>';
                        return res;
                    };
                }

                colConfig.push(config);
            } else {
                return;
            }
        })
    }
    return colConfig;
}


export {
    req_gl_Datatable_Ajax_Dyn,
    req_gl_table_col_config
}