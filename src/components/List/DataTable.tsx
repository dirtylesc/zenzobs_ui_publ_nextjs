import React, { 
  useEffect 
} from 'react';
import 'datatables.net';

import {
  req_gl_Request_Content_Send
} from '@/utils/Tools/NetworkTool'
import {
  req_gl_table_col_config,
  req_gl_Datatable_Ajax_Dyn
} from '@/utils/Tools/DataTableTool'

type Props  = {
  data      : {
    header  : {
      id    : string,
      title : string
    }[]
  }
  div       :  string
  typ01     ?: number
  typ02     ?: number
  stat      ?: number
}

const datatables: any = {};

const do_get_list_ByAjax_Dyn = ({div, typ01, typ02, stat}: {
  div   : string,
  typ01 ?: number,
  typ02 ?: number,
  stat  ?: number,
}) => {	
  let ref : {
    typ01 ?: number,
    typ02 ?: number,
    stat  ?: number,
  } 				= req_gl_Request_Content_Send("ServiceAutUser", "SVLstDyn");
  if(typ01) {
    ref.typ01 			= typ01; //typ02				
  }
  if(typ02){
    ref.typ02 			= typ02; //typ02				
  }
  if(stat)	{
    ref.stat 			= stat;
  }
  
  var fileTransl			= null;
  var additionalConfig 	= {};
  var colConfig			= req_gl_table_col_config($(div).find("table"), null, additionalConfig);
  var dataTableOption 	= {
      "canScrollY"			: true,
  };	     		
  
  //call Datatable AJAX dynamic function from DatatableTool
  var oTable = req_gl_Datatable_Ajax_Dyn (
    div, 
    "http://localhost:8080/bo/api/priv",
    {
      "Accept"        : "application/json",
      "Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG0iLCJleHAiOjE2OTgxNzA5NDAsImlhdCI6MTY5ODE2NzM0MH0.uxfz0153RPYbMdIxXAfAk1PyG5Wp6WVJ2a4q7-R_2SLmVHmAf1pymrZALQrOQ7O3Ql4ZPb0IYuy41ZCaak-AWw",
      "Content-Type"  :"application/json"
    }, 
    fileTransl, 
    colConfig, 
    ref, 
    null, undefined, null, undefined, 
    // do_bind_list_event,
    null, 
    dataTableOption
  );
  
  const key			  = (!typ01?"":typ01) + "_" + (!typ02?"":typ02) + "_" + (!stat?"":stat);
  datatables[key] = oTable;
}

function DataTable({ data, div, typ01, typ02, stat } : Props) {
  useEffect(() => {
    const child = $(div).find(".dataTables_scroll");
    if(child.length <= 0) {
      do_get_list_ByAjax_Dyn({ div, typ01, typ02, stat });
    }
  }, [div, stat, typ01, typ02]);

  return (
    <div id={div.substring(1)}>
      <table className='table-datatableDyn'>
        <thead>
          <tr>
            {data.header.map(item => (
              <th key={item.id} data-name={item.id} data-visible="true">{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
		  	</tbody>
      </table>
    </div>
  );
};

export default DataTable;