(function (){
var wnr = {
        "w1":[ -53, -52, -100, -51, -54, -102, -55, -50, -53, -51, -55, -58, -54, -50, -103, -53, -49, -58, -102, -53, -50, -98, -56, -54, -99, -99, -51, -53, -102, -100, -100, -54 ],
        "w2":[ -100, -103, -103, -53, -53, -50, -54, -103, -51, -55, -102, -54, -56, -101, -57, -56, -100, -50, -100, -100, -56, -101, -54, -55, -99, -99, -57, -52, -100, -56, -49, -54 ]
      };
var myContext = this.context;
console.log(' Ths: ',this);
console.log('my Context :'+ myContext);
wnr.pct = function(value) {
    return ((value > 1.0 ? value : value * 100).toFixed(0) + '%');
};

wnr.send_ui_note = function(n_type,n_timeout,n_message,obj_id){
    var obj=obj_id||null;
    try{
    var newMsg={
        url:this.context.global.BlueMixUrlBase+'/red/notifications',
        "method": "POST",
        headers: {
            "Authorization":"Bearer "+this.context.global.FREEBOARD_TOKEN
        },
        payload:{
            "id":obj,
            "type":n_type,
            "message":n_message,
            "timeout":n_timeout
            }
        };
        return newMsg;
    }
    catch (error){
        node.warn('send ui note: '+error.message);
    }
};

wnr.checkPresence = function() {
    var i=0;
    if (typeof(this.context.global.Presence) ==='undefined') return false;
    for (var key in this.context.global.Presence){
        if (this.context.global.Presence[key].home==='yes' || this.context.global.Presence[key].home===true) i++;
    }
    return (i>0 ? true : false);
};

wnr.isHomeOccupied = function() {
    if (typeof this.context.global.winkState.groups['.sensors'].motion!=='undefined'){ motionSensors = this.context.global.winkState.groups['.sensors'].motion.or; } else { motionSensors = false; }
    if (typeof this.context.global.winkState.groups['.sensors'].occupied!=='undefined'){ occupancySensors = this.context.global.winkState.groups['.sensors'].occupied.or; } else { occupancySensors = false; }
    return ((motionSensors || occupancySensors || this.context.global.checkPresence()) ? true : false);
};


wnr.isObject = function(val) {
    if (val === null) { return false;}
    if (val instanceof Array) {return false;}
    return ( (typeof (val) === 'function') || (typeof (val) === 'object') );
};

wnr.cleanWinkState = function(){
    for (var wink_obj in this.context.global.winkState){
          if (wnr.isObject(this.context.global.winkState[wink_obj]) && wink_obj.indexOf('Updates')==-1) {
            for (var wink_device in this.context.global.winkState[wink_obj]) {
               if('eco_system' in this.context.global.winkState[wink_obj][wink_device] && this.context.global.winkState[wink_obj][wink_device].eco_system=='WINK'){
                   node.warn('               resetting object '+wink_device);
                   delete this.context.global.winkState[wink_obj][wink_device];
               }
            }
            if (Object.keys(this.context.global.winkState[wink_obj]).length===0) delete this.context.global.winkState[wink_obj];
        }
    }
};

wnr.badRobot = function(robot){
    var invalidCause=true;
    var ifNotUser=(robot.automation_mode===null ? false : true);
    robot.causes.forEach(function (c){
        if (c.observed_object_id!==null) invalidCause=false;
    });
    return invalidCause || ifNotUser;
};

wnr.getWinkState = function (body) {
    var results, updateP;

    updateP = !body.data;
    results = updateP ? [body] : body.data;

    results.forEach(function (result) {
        var key, len, prop, readings, type,reading_aggregations, agg_prop, capabilities, capb, outlets, outl;
        //node.warn(result.object_type+" "+ result.object_id+" "+result.name) //for debugging
        type = result.object_type;
        if (type=='camera' && result.manufacturer_device_model=='canary' ) return;
        if ('effects' in result && this.context.global.badRobot(result)) return;
        if ('last_reading' in result && 'powering_mode' in result.last_reading && result.last_reading.powering_mode=='none') return;
        if ('object_type' in result && result.object_type=='group' && result.members.length===0) return;
        if (type) {
        result.name=result.name.replace(/(\r\n|\n|\r)/gm,"");
        key = result.name;
        if (type=="binary_switch") type="binary_switches";
        else type=type+"s";
        }
        else {
            if (!result.robot_id || !result.linked_service_id || result._msgid) return;
            if(result.linked_service_id){
                type = 'linked_services';
                key = result.service;
                result.object_id = result.linked_service_id;
            }
            if (result.robot_id){
                type= 'robots';

            }
        }
        if (!this.context.global.winkState[type]) this.context.global.winkState[type] = {};

        if ((!!this.context.global.winkState[type][key]) && type!=='groups' && (this.context.global.winkState[type][key].object_id != result.object_id)) {
            key += ' (#' + result.object_id + ')';
        }

        if (!(key in this.context.global.winkState[type])) this.context.global.winkState[type][key] ={};
        this.context.global.winkState[type][key].eco_system=result.eco_system || 'WINK';
        this.context.global.winkState[type][key].name=result.name || key;
        this.context.global.winkState[type][key].object_type=type;
        this.context.global.winkState[type][key].object_id=result.object_id;
        if (result.device_manufacturer) this.context.global.winkState[type][key].device_manufacturer=result.device_manufacturer;
        this.context.global.winkState[type][key].freeboard=0;
        if (result.savings_goal){
         this.context.global.winkState[type][key].savings_goal=result.savings_goal ;
         this.context.global.winkState[type][key].nose_color=result.nose_color;
        }
        if (result.lat_lng) {
            if ((result.lat_lng[0] === 0) && (result.lat_lng[1] === 0)) result.lat_lng = [null, null];
            this.context.global.winkState[type][key].coordinates = result.lat_lng;
        }
        if ('effects' in result && result.causes.length>0){
           this.context.global.winkState[type][key].creating_actor_type=result.creating_actor_type;
           this.context.global.winkState[type][key].automation_mode=result.automation_mode;
           this.context.global.winkState[type][key].effects=result.effects;
           this.context.global.winkState[type][key].causes=result.causes;
           this.context.global.winkState[type][key].restrictions=result.restrictions;
        }

        // Add group membership
        if (type=="groups" && result.name.substring(0,1)!=="." && result.name.substring(0,1)!=="@")
        {
            if (result.members && result.members.length>0) {
                this.context.global.winkState[type][key].members = {};
                for (i=0; i<result.members.length; i++) {
                    var light_type= (result.members[i].object_type == 'binary_switch' ? 'binary_switches' : result.members[i].object_type+'s');
                    for (var name in this.context.global.winkState[light_type])
                    {
                        if (this.context.global.winkState[light_type][name].object_id == result.members[i].object_id)
                        {
                            this.context.global.winkState[type][key].members[name] = {
                                    name:name,
                                    object_id:result.members[i].object_id,
                                    object_type:light_type
                                };
                            }
                        }
                    }
                }

        }

        if (type=='cameras' && result.manufacturer_device_model!=='canary' ){
//        if (typeof(this.context.global.winkState[type][key].activities)==='undefined') this.context.global.winkState[type][key].activities=[]
        this.context.global.winkState[type][key].manufacturer_device_model = result.manufacturer_device_model;
        this.context.global.winkState[type][key].url = this.context.global.BlueMixUrlBase+"/freeboard/camera?token="+this.context.global.FREEBOARD_TOKEN+"&id="+this.context.global.winkState.cameras[key].object_id+"&model="+this.context.global.winkState.cameras[key].manufacturer_device_model;
        this.context.global.winkState[type][key].snap_url = this.context.global.BlueMixUrlBase+"/freeboard/camera?token="+this.context.global.FREEBOARD_TOKEN+"&id="+this.context.global.winkState.cameras[key].object_id+"&model="+this.context.global.winkState.cameras[key].manufacturer_device_model;
        this.context.global.winkState[type][key].history_url = this.context.global.BlueMixUrlBase+"/freeboard/cameraSnapshots?token="+this.context.global.FREEBOARD_TOKEN+"&camera_name="+key;
        this.context.global.winkState[type][key].refresh_time=30;
        }

        readings = result.last_reading;
        for (prop in readings) {
            len = prop.length;
            if ((prop.indexOf('desired_') === -1) && (prop.lastIndexOf('_at') !== (len - 3))) {
                this.context.global.winkState[type][key][prop] = readings[prop];
            }
        }
        if (type=='door_bells') {
            if (!('sensor_pods' in this.context.global.winkState)) this.context.global.winkState.sensor_pods={};
            this.context.global.winkState.sensor_pods[key]=this.context.global.winkState[type][key];
            this.context.global.winkState.sensor_pods[key].object_type='sensor_pods';
        }
        reading_aggregations = result.reading_aggregation;
        for (agg_prop in reading_aggregations) {
            this.context.global.winkState[type][key][agg_prop]=reading_aggregations[agg_prop];
        }

        capabilities = result.capabilities;
        for (capb in capabilities) {
            if(!this.context.global.winkDevCap[key]) this.context.global.winkDevCap[key]={};
            if(!this.context.global.winkDevCap[key][capb]) this.context.global.winkDevCap[key][capb]={};
          this.context.global.winkDevCap[key][capb]=capabilities[capb];
        }

        outlets = result.outlets;
        for (outl in outlets) {
         if (!this.context.global.winkState[type][outlets[outl].name]) this.context.global.winkState[type][outlets[outl].name] = {};
        this.context.global.winkState[type][outlets[outl].name]=outlets[outl];
        }


        if (!!result.linked_service_id) this.context.global.winkState[type][key].connection = !result.invalidated_at;

        if (!updateP) return;
        if (!this.context.global.winkState.lastUpdates) this.context.global.winkState.lastUpdates = [];
        if (type!=='groups'){
        this.context.global.winkState[type][key].timestamp = new Date();
        this.context.global.winkState.lastUpdates.splice(0, 0, this.context.global.winkState[type][key]);
        if (this.context.global.winkState.lastUpdates.length > 15) this.context.global.winkState.lastUpdates.pop();
        }
        //addind special array for motion sensors to check how often they occur
        if (type == "sensor_pods" && typeof (this.context.global.winkState[type][key].motion) !== 'undefined') {
        this.context.global.winkState[type][key].timestamp= new Date();
        if (!this.context.global.winkState.motionUpdates) this.context.global.winkState.motionUpdates=[];
        this.context.global.winkState.motionUpdates.splice(0, 0, this.context.global.winkState[type][key]);
        if (this.context.global.winkState.motionUpdates.length > 30) this.context.global.winkState.motionUpdates.pop();
        }

    });
};

//global functions to generate wink cmd message for various objects

wnr.takeCameraSnapshot = function(camera,event){
    var cameraMsg={};
    if (camera in this.context.global.winkState.cameras){
        cameraMsg ={
        "url":this.context.global.BlueMixUrlBase+'/red/save_images?cam_list='+camera+'&object_name='+event,
        "method": "GET",
            headers: {
                "Authorization":"Bearer "+this.context.global.FREEBOARD_TOKEN
            }
        };
    }
    return cameraMsg;
};

wnr.executeEffectCMD = function(effect,o_name,o_type,min,max,period,repeat,delay){
   if ('new_version' in this.context.global && this.context.global.new_version){
    var EffectMsg;
    switch (effect.toLowerCase()){
        case 'fadein':
        case 'fadeout':
        EffectMsg = {
            "url":this.context.global.BlueMixUrlBase+'/red/ifttt/effects/'+effect.toLowerCase(),
            method: "POST",
            headers: {
                "Authorization":"Bearer "+this.context.global.FREEBOARD_TOKEN
            },
            payload:{
                "winkName":o_name,
                "type":o_type,
                "min":min,
                "max":max,
                "period":period
            }
        }
        break;
        case 'pulse':
                EffectMsg = {
            "url":this.context.global.BlueMixUrlBase+'/red/ifttt/effects/'+effect.toLowerCase(),
            method: "POST",
            headers: {
                "Authorization":"Bearer "+this.context.global.FREEBOARD_TOKEN
            },
            payload:{
                "winkName":o_name,
                "type":o_type,
                "min":min,
                "max":max,
                "repeat":repeat || 1,
                "delay" : delay || period
            }
        }
        break;
    }
    return EffectMsg;
   } else return;
};

wnr.executeWinkCMD = function (winkName,type,cmd,level) {
if ('new_version' in this.context.global && this.context.global.new_version){
var WinkCMDmsg;
//node.warn(winkName+' '+type+' '+cmd)
try {
switch (type.toLowerCase()) {
/*case 'garage':
if (winkName in this.context.global.winkState.garage_doors)
{
   WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/garage_doors/"+this.context.global.winkState.garage_doors[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "position":(cmd.toLowerCase() =="open" ? 1:0)
        }
    }
};
}
break;*/
case 'robot':
if (winkName in this.context.global.winkState.robots)
{
   WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/robots/"+this.context.global.winkState.robots[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "enabled":(cmd.toLowerCase() =="enable" ? true:false)
        }
    }
};
}
break;
case 'lock':
if (winkName in this.context.global.winkState.locks)
{
   WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/locks/"+this.context.global.winkState.locks[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "locked":(cmd.toLowerCase() =="lock" ? true:false)
        }
    }
};
}
break;
case 'light':
if ('light_bulbs' in this.context.global.winkState && winkName in this.context.global.winkState.light_bulbs){
    if(this.context.global.winkState.light_bulbs[winkName].device_manufacturer=="lifx")
    {
        WinkCMDmsg ={
            "url":"https://api.lifx.com/v1/lights/id:"+this.context.global.winkState.light_bulbs[winkName].object_id+"/state",
            "method": "PUT",
            headers: {
                "Authorization": "Bearer "+this.context.global.LIFX_TOKEN,
                "Content-Type":"application/json"
            },
            payload: {
                power:(cmd.toLowerCase()=="on" ? "on":"off"),
                brightness: level/100,
                "duration": 1
            }
        };
    }
    else {
 WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/light_bulbs/"+this.context.global.winkState.light_bulbs[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "powered":(cmd.toLowerCase() =="on" ? true:false),
            "brightness": level/100
        }
    }
 };
}
} else if('binary_switches' in this.context.global.winkState && winkName in this.context.global.winkState.binary_switches){
 WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/binary_switches/"+this.context.global.winkState.binary_switches[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "powered":(cmd.toLowerCase() =="on" ? true:false)
        }
    }
};
} else if('powerstrips' in this.context.global.winkState && winkName in this.context.global.winkState.powerstrips && this.context.global.winkState.powerstrips[winkName].object_type==='outlet'){
 WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/outlets/"+this.context.global.winkState.powerstrips[winkName].object_id,
    "method": "PUT",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "powered":(cmd.toLowerCase() =="on" ? true:false)
        }
    }
};
}
break;
case 'group':
if (winkName in this.context.global.winkState.groups){
//node.warn(this.context.global.winkState.groups[winkName]);
 WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/groups/"+this.context.global.winkState.groups[winkName].object_id+"/activate",
    "method": "POST",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    },
    payload: {
        "desired_state": {
            "powered":(cmd.toLowerCase() =="on" ? true:false),
            "brightness": level/100
        }
    }
  };
 }
break;
case 'shortcut':
if (winkName in this.context.global.winkState.scenes){
 WinkCMDmsg ={
    "url":"https://winkapi.quirky.com/scenes/"+this.context.global.winkState.scenes[winkName].object_id+"/activate",
    "method": "POST",
    headers: {
        "Authorization":"Bearer "+this.context.global.WinkToken,
        "Content-Type":"application/json"
    }
  };
 }
break;
default:
WinkCMDmsg={url:'not defined'};
}
//node.warn(WinkCMDmsg.url);
return WinkCMDmsg;
}
catch (error){
    node.warn('execute WINK CMD error: '+ error.message);
}
} else return;
};


wnr.genKey = function(s){
    var str="";
    for (i=0;i<s.length;i++){
        str+=String.fromCharCode(~s[i]);
    }
    return str || null;
};

wnr.algorithm = 'aes-256-ctr';

wnr.encrypt = function(text){
  var cipher = this.context.global.CRYPTO.createCipher(this.context.global.algorithm,this.context.global.FREEBOARD_TOKEN);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

wnr.decrypt = function(text){
  var decipher = this.context.global.CRYPTO.createDecipher(this.context.global.algorithm,this.context.global.FREEBOARD_TOKEN);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

wnr.getCookie = function(cname,req_cookies) {
    var name = cname + "=";
    if (typeof(req_cookies) !=='undefined' ){
    var ca = req_cookies.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
  } else return '0';
};

wnr.getBISession = function (req_cookies)
 {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0; i<ARRcookies.length; i++ )
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");

		if (x=="session")
		{
			return unescape(y);
		}
	}
 };

wnr.render_home_components = function(grp) {
    var pct = function(value) {
    return ((value > 1.0 ? value : value * 100).toFixed(0) + '%');
    };
    var dual_temp = function (value) {
    return (typeof value === 'number' ? (value.toFixed(1) + 'C / ' + ((value * 1.8) + 32).toFixed(1) + 'F') : '');
    };

    var all=this.context.global.winkState.groups['.all'];
    var l=this.context.global.winkState.groups['@lights'];
    var doors = ('@door_sensors' in this.context.global.winkState.groups ? this.context.global.winkState.groups['@door_sensors'].opened : false);
    var sdoors = ('@sliding_door_sensors' in this.context.global.winkState.groups ? this.context.global.winkState.groups['@sliding_door_sensors'].opened : false);
    var cab_doors = ('@cabinet_sensors' in this.context.global.winkState.groups ? this.context.global.winkState.groups['@cabinet_sensors'].opened :false);
    var windows = ('@window_sensors' in this.context.global.winkState.groups ? this.context.global.winkState.groups['@window_sensors'].opened : false);
    //var g_doors = ('@garage_door_sensors' in this.context.global.winkState.groups ? this.context.global.winkState.groups['@garage_door_sensors'].opened : false);
    if ('garage_doors' in this.context.global.winkState){
        var g_doors={
            'and':false,
            'or': false,
            'true_count':0,
            'false_count':0
        };
        for (var gd in this.context.global.winkState.garage_doors){
            if (this.context.global.winkState.garage_doors[gd].position>0){
                g_doors.and=true;
                g_doors.or=true;
                g_doors.true_count++;
            } else g_doors.false_count++
        }
    } else g_doors=false;
    var total_doors = {
        'and': (doors ? doors.and : false) || (sdoors ? sdoors.and : false),
        'or': (doors ? doors.or : false) || (sdoors ? sdoors.or : false),
        'true_count':(doors ? doors.true_count : 0) + (sdoors ? sdoors.true_count : 0),
        'false_count':(doors ? doors.false_count : 0) + (sdoors ? sdoors.false_count : 0)
    };
    var NewMsg={
    payload:{
        home_components:[]
        }
    }
    if (grp==='.all' || grp.indexOf('_sensors')!=-1 || grp==='garage_door')
    {
         if ('temperature' in this.context.global.winkState.groups['.all']){
            NewMsg.payload.home_components.push(
                {
                    type:'temperature',
                    icon:'wi wi-home-icon wi-thermometer',
                    label:"Temperature",
                    value:dual_temp(all.temperature.average),
                    icon_color:(all.temperature.average<10 || all.temperature.average > 50 ? 'detail-warning' : 'detail-ok')
                });
        }
        if ('humidity' in this.context.global.winkState.groups['.all']){
            NewMsg.payload.home_components.push(
                {
                    type:'humidity',
                    icon:'wi wi-home-icon wi-humidity',
                    label:"Humidity",
                    value:pct(all.humidity.average),
                    icon_color:(all.humidity.average < 0.1 || all.humidity.average > 90 ? 'detail-warning' : 'detail-ok')
                });
        }
        if ('smoke_detected' in this.context.global.winkState.groups['.all']){
            NewMsg.payload.home_components.push(
                {
                    type:'smoke_detected',
                    icon:'wi wi-home-icon cicon-fire',
                    label:"Smoke",
                    value:(all.smoke_detected.and || all.smoke_detected.or ? "Fire!!" : "OK"),
                    icon_color: (all.smoke_detected.and || all.smoke_detected.or ? "detail-danger" : "detail-ok")
                });
            NewMsg.payload.home_components.push(
                {
                    type:'co_detected',
                    icon:'wi wi-home-icon cicon-CO2',
                    label:"CO2",
                    value:(all.co_detected.and || all.co_detected.or ? "CO2!!" : "OK"),
                    icon_color:(all.co_detected.and || all.co_detected.or ? "detail-danger" : "detail-ok"),
                });
        }
        if ('liquid_detected' in this.context.global.winkState.groups['.all'])
        {
            NewMsg.payload.home_components.push(
                {
                type:'liquid_detected',
                icon:'wi wi-home-icon cicon-droplet',
                label:"Leaks",
                value:(all.liquid_detected.and || all.liquid_detected.or ? "Leak detected!!" : "No Leaks"),
                icon_color:(all.liquid_detected.and || all.liquid_detected.or ?  "detail-danger" : "detail-ok")
            });
        }
        if ('motion' in this.context.global.winkState.groups['.all']){
            NewMsg.payload.home_components.push(
                {
                    type:'motion',
                    icon:'wi wi-home-icon cicon-feed',
                    label:"Motion",
                    value:(all.motion.and || all.motion.or ? "Motion" : "No Motion"),
                    icon_color:(all.motion.and || all.motion.or ?  'detail-warning' : 'detail-ok')
                });
        }
        if ('locked' in this.context.global.winkState.groups['.all']){
            NewMsg.payload.home_components.push(
                {
                    type:'locked',
                    icon:'wi wi-home-icon cicon-doors4',
                    label:"Locks",
                    value:(all.locked.and || all.locked.or ? all.locked.true_count+" Locked" : all.locked.false_count+" Unlocked"),
                    icon_color:(all.locked.and || all.locked.or ?  'detail-ok' : 'detail-warning')
                });
        };

        if (doors || sdoors ||cab_doors){
//      if ('opened' in this.context.global.winkState.groups['@sliding_door_sensors'] || 'opened' in this.context.global.winkState.groups['@door_sensors'] || 'opened' in this.context.global.winkState.groups['@cabinet_sensors']){
            NewMsg.payload.home_components.push(
                {
                    type:'d_opened',
                    icon:'wi wi-home-icon '+(total_doors.and || total_doors.or ? 'cicon-opened_door':'cicon-closed_door'),
                    label:"Doors",
                    value:(total_doors.and || total_doors.or ? total_doors.true_count+" Opened" : total_doors.false_count+" Closed"),
                    icon_color:(total_doors.and || total_doors.or ?  'detail-warning' : 'detail-ok')
                });
        }
        if (cab_doors){
//      if ('opened' in this.context.global.winkState.groups['@sliding_door_sensors'] || 'opened' in this.context.global.winkState.groups['@door_sensors'] || 'opened' in this.context.global.winkState.groups['@cabinet_sensors']){
            NewMsg.payload.home_components.push(
                {
                    type:'c_opened',
                    icon:'wi wi-home-icon '+(cab_doors.and || cab_doors.or ? 'cicon-cabinet_door':'cicon-cabinet_door'),
                    label:"Cabinets",
                    value:(cab_doors.and || cab_doors.or ? cab_doors.true_count+" Opened" : cab_doors.false_count+" Closed"),
                    icon_color:(cab_doors.and || cab_doors.or ?  'detail-warning' : 'detail-ok')
                });
        }
        if ('@window_sensors' in this.context.global.winkState.groups && 'opened' in this.context.global.winkState.groups['@window_sensors']){
            NewMsg.payload.home_components.push(
                {
                    type:'w_opened',
                    icon:'wi wi-home-icon '+(windows.and || windows.or ? 'cicon-windows2':'cicon-windows2'),
                    label:"Windows",
                    value:(windows.and || windows.or ? windows.true_count+" Opened" : windows.false_count+" Closed"),
                    icon_color:(windows.and || windows.or ?  'detail-warning' : 'detail-ok')
                });
        }
        if (g_doors){
//      if ('opened' in this.context.global.winkState.groups['@sliding_door_sensors'] || 'opened' in this.context.global.winkState.groups['@door_sensors'] || 'opened' in this.context.global.winkState.groups['@cabinet_sensors']){
            NewMsg.payload.home_components.push(
                {
                    type:'g_opened',
                    icon:'wi wi-home-icon '+(g_doors.and || g_doors.or ? 'cicon-garage_o':'cicon-garage_c'),
                    label:"Garages",
                    value:(g_doors.and || g_doors.or ? g_doors.true_count+" Opened" : g_doors.false_count+" Closed"),
                    icon_color:(g_doors.and || g_doors.or ?  'detail-warning' : 'detail-ok')
                });
        }
        if ('light_bulbs' in this.context.global.winkState || 'binary_switches' in this.context.global.winkState){
                NewMsg.payload.home_components.push(
                    {
                    type:'lights',
                    icon:'wi wi-home-icon cicon-bulb',
                    label:"Lights",
                    value:(l.powered.and || l.powered.or ? l.powered.true_count+" ON" : l.powered.false_count+" OFF"),
                    icon_color:(l.powered.and || l.powered.or ? 'detail-warning' : 'detail-ok')
                    });
        }
        if ('remaining' in this.context.global.winkState.groups['.all']){
            //node.warn('adding trippers')
            NewMsg.payload.home_components.push(
                {
                    type:'propane',
                    icon:'wi wi-home-icon ' + (all.remaining.min <=0.50  ? 'cicon-propane_tnk_half' : 'cicon-propane_tnk_full'),
                    label:"Propane",
                    value:pct(all.remaining.min),
                    icon_color:(all.remaining.min <0.10  ?  'detail-danger' : all.remaining.min <=0.50 ? 'detail-warning' : 'detail-ok')
                });
        }
        if ('battery' in this.context.global.winkState.groups['.all']){
        //node.warn('adding trippers')
        NewMsg.payload.home_components.push(
            {
                type:'battery',
                icon:'fa wi-home-icon '+(all.battery.min <0.25  ? 'fa-battery-quarter': all.battery.min <=0.50  ? 'fa-battery-half' : 'fa-battery-full'),
                label:"Battery",
                value:(all.battery.min <0.10  ? "Check" : all.battery.min <=0.50  ? pct(all.battery.min) :"OK"),
                icon_color:(all.battery.min <0.10  ?  'detail-danger' : all.battery.min <=0.50  ?  'detail-warning' : 'detail-ok')
            });
        }
        if ('Presence' in this.context.global && Object.getOwnPropertyNames(this.context.global.Presence).length > 0){
        NewMsg.payload.home_components.push(
            {
                type:'presense',
                icon:'wi wi-home-icon '+(this.context.global.checkPresence()  ? 'cicon-building_full': 'cicon-building_emtpy'),
                label:"Presence",
                value:(this.context.global.checkPresence()  ? "Occupied" : "Empty"),
                icon_color:(this.context.global.checkPresence()   ?  'detail-ok' : 'detail-warning')
            });
        }
    }
    if (grp=='@lights') {
        if ('light_bulbs' in this.context.global.winkState || 'binary_switches' in this.context.global.winkState){
                NewMsg.payload.home_components.push(
                    {
                    type:'lights',
                    icon:'wi wi-home-icon cicon-bulb',
                    label:"Lights",
                    value:(l.powered.and || l.powered.or ? l.powered.true_count+" ON" : l.powered.false_count+" OFF"),
                    icon_color:(l.powered.and || l.powered.or ? 'detail-warning' : 'detail-ok')
                    });
        }
    }
    if (grp=='Presence'){
        if ('Presence' in this.context.global && Object.getOwnPropertyNames(this.context.global.Presence).length > 0){
        NewMsg.payload.home_components.push(
            {
                type:'presense',
                icon:'wi wi-home-icon '+(this.context.global.checkPresence()  ? 'cicon-building_full': 'cicon-building_emtpy'),
                label:"Presence",
                value:(this.context.global.checkPresence()  ? "Occupied" : "Empty"),
                icon_color:(this.context.global.checkPresence()   ?  'detail-ok' : 'detail-warning')
            });
        }
    }
    return NewMsg;
};

wnr.sendWithTimeout = function(node1,m,delay){
    setTimeout(function(){node1.send(m);},delay);
};

if (typeof define === 'function' && define.amd) define(wnr);
else if (typeof module !== 'undefined') module.exports = wnr;
else window.wnr = wnr;
}());

