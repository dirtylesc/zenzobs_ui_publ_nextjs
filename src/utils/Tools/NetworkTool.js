const O_TYPE_NULL 	= 0;
const O_TYPE_STRING = 1;
const O_TYPE_ARRAY 	= 2;
const O_TYPE_OBJ 	= 3;
const O_TYPE_OTHER	= 4;

const req_gl_Request_Content_Send = (serviceClass, serviceName) => {
    let svClass 	= "sv_class"    || App['const'].SV_CLASS;
    let svName	    = "sv_name"     || App['const'].SV_NAME;
    let sessId	    = "sess_id"     || App['const'].SESS_ID;
    let userId      = "user_id"     || App['const'].USER_ID;

    const ref 		= {
        [svClass]   : serviceClass,
        [svName]    : serviceName,
        [userId]    : 1,
        [sessId]    : 1,
    };
    // ref[svClass] 	= serviceClass; 
    // ref[svName]		= serviceName;
    // ref[userId]		= App.data.user ? App.data.user.id : -1;
    // ref[sessId]		= App.data.session_id;

    return ref;
}

const typeOfObject = (object) => {
    if (object === null) {
          return O_TYPE_NULL;
    }
    else if (object === undefined) {
          return O_TYPE_NULL;
    }
    else{
          var t = $.type(object);
          if (t=='string') 	return O_TYPE_STRING;
          if (t=='array')   return O_TYPE_ARRAY;
          if (t=='object') 	return O_TYPE_OBJ;            
          return O_TYPE_OTHER;
    }      
}

const decodeUTF8Str = (str) => {
    try{
        if(str != null || str != undefined) {
            return decodeURIComponent(str);
        } else {
            return "";
        }
    }catch(e){
        return str;
    }
}

const decodeUTF8AllLevel = (object) => {	
    for (var k in object){
        const val   = object[k];		
        const type  = typeOfObject (val);
        switch(type){
        case O_TYPE_STRING	: object[k] = decodeUTF8Str(object[k]); break;
        case O_TYPE_OBJ		: decodeUTF8AllLevel (object[k]);		break;
        case O_TYPE_ARRAY	: 
            for (var i=0;i<val.length;i++){
                var v = val[i];
                var t = typeOfObject (v);
                if (t == O_TYPE_STRING) 	val[i] = decodeUTF8Str(v);	
                else if (t == O_TYPE_OBJ)	decodeUTF8AllLevel (v);	
                else if (t==O_TYPE_ARRAY)	decodeUTF8AllLevel (v);	
            }
            break;
        }
    }
}

const decodeUTF8 = (object) => {	
    decodeUTF8AllLevel (object);
}

export {
    req_gl_Request_Content_Send,
    decodeUTF8
}