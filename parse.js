// jshint asi: true

var winkState = {}


// call this to update winkState:
//     results of /users/me/wink_devices
//     results of /users/me/linked_services
//     body of notification

var getWinkState = function(body) {
    var results, updateP

    updateP = !body.data
    results = updateP ? [ body ] : body.data

    results.forEach(function(result) {
        var key, len, prop, readings, type

        type = result.object_type
        if (type) key = result.name
        else {
          if (!result.linked_service_id) return
          type = 'linked_service'
          key = result.service
          result.object_id = result.linked_service_id
        }
        if (!winkState[type]) winkState[type] = {}
        
        if ((!!winkState[type][key]) && (winkState[type][key].object_id != result.object_id)) {
            key += ' (#' + result.object_id + ')'
        }

        winkState[type][key] =
        { name        : result.name || key
        , object_type : type
        , object_id   : result.object_id
        }
        if (result.lat_lng) {
            if ((result.lat_lng[0] === 0) && (result.lat_lng[1] === 0)) result.lat_lng = [ null, null ]
            winkState[type][key].coordinates = result.lat_lng
        }

        readings = result.last_reading
        for (prop in readings) {
            len = prop.length
            if ((prop.indexOf('desired_') === -1) && (prop.lastIndexOf('_at') !== (len - 3))) {
                winkState[type][key][prop] = readings[prop]
            }
        }
        if (!!result.linked_service_id) winkState[type][key].connection = !result.invalidated_at
var value = freeboard.wink_helpers.value(winkState[type][key])
winkState[type][key].freeboard = { }
winkState[type][key].freeboard.generic = { value: value,
on: value ? freeboard.wink_helpers.on_text(winkState[type][key]) : '',
off: !value ? freeboard.wink_helpers.off_text(winkState[type][key]) : ''}
var a = 
[ 'co_detected'
, 'liquid_detected'
, 'locked'
, 'loudness'
, 'motion'
, 'opened'
, 'presence'
, 'smoke_detected'
, 'tamper_detected'
, 'vibration'
, 'battery'
, 'brightness'
, 'co_severity'
, 'humidity'
, 'smoke_severity'
, 'temperature'
]
a.forEach(function(property) {
    var value2

    if (typeof winkState[type][key][property] === 'undefined') return
value2 = freeboard.wink_helpers.value(winkState[type][key], property)
winkState[type][key].freeboard[property] = { value: value2,
on: value2 ? freeboard.wink_helpers.on_text(winkState[type][key], property) : '',
off: !value2 ? freeboard.wink_helpers.off_text(winkState[type][key], property) : ''}
})



        if (!updateP) return
        if (!winkState.lastUpdates) winkState.lastUpdates = []
        winkState[type][key].timestamp = new Date()
        winkState.lastUpdates.splice(0, 0, winkState[type][key])
        if (winkState.lastUpdates.length > 10) winkState.lastUpdates.pop()
    })
}


// for freeboard

var freeboard = {}
freeboard.wink_helpers = { }

// data, e.g., datasources["WinKData"]["light_bulb"]["Kitchen"]

freeboard.wink_helpers.value = function(data, property) {
    var value

    if ((!data.connection) || (data.object_type === 'camera')) return false
    if (typeof property !== 'undefined') {
        if (typeof data[property] === 'undefined') return false
        return ({ sensor_pod : true, smoke_detector: true }[data.object_type] || false)
    }

    value = { button         : true
            , gang           : true
            , garage_door    : data.position > 0
            , hub            : true
            , linked_service : true
            , lock           : data.locked
            , sensor_pod     : true
            , shade          : data.position > 0
            , smoke_detector : true
            , thermostat     : data.mode !== 'off'
            , unknown_device : true
            }[data.object_type]
    return (typeof value !== 'undefined' ? value : data.powered)
}

freeboard.wink_helpers.on_text = function(data, property) {
    var value
      , text = 
            { button         : ''
            , garage_door    : 'open'
            , hub            : 'OK'
            , linked_service : 'OK'
            , light_bulb     : data.brightness === 1.0 ? 'on'   : (data.brightness * 100) + '%'
            , lock           : 'locked'
            , sensor_pod     : 'OK'
            , shade          : data.position === 1.0   ? 'on'   : (data.position * 100) + '%'
            , thermostat     : data.cool_active        ? 'cool' : data.heat_active ? 'heat' : data.aux_active ? 'aux' : data.fan_active? 'fan' : 'on'
            }[data.object_type] || 'on'
    if (typeof property === 'undefined') return (typeof text !== 'undefined' ? text : 'on')
    if (typeof data[property] === 'undefined') return ''

    value = data[property]
console.log('property='+JSON.stringify(property)+' value='+JSON.stringify(value)+'\n'+inspect(data, { depth: null }))
    text =  { co_detected     : value && 'CO'
            , liquid_detected : value && 'leak'
            , locked          : value && 'locked'
            , loudness        : value && 'loud'
            , motion          : value && 'motion'
            , opened          : value && 'opened'
            , presence        : value && 'presence'
            , smoke_detected  : value && 'smoke'
            , tamper_detected : value && 'tamper'
            , vibration       : value && 'vibration'

            , battery         : (value * 100) + '%'
            , brightness      : (value * 100) + '%'
            , co_severity     : (value * 100) + '%'
            , humidity        : (value > 1.0 ? value.toFixed(0) : value * 100) + '%'
            , smoke_severity  : (value * 100) + '%'

            , temperature     : !isNaN(value) && value.toFixed(1) + '&deg;C' + ' / ' + ((value * 1.8) + 32).toFixed(1) + '&deg;F'
            }[property]

  return text
}

freeboard.wink_helpers.off_text = function(data) {
    if (!data.connection) return 'ERR'

    return { button          : 'idle'
           , garage_door     : 'closed'
           , lock            : 'unlocked'
           , shade           : 'closed'
           }[data.object_type] || 'off'
}

freeboard.wink_helpers.style = function(data, property) {
    var color, value
      , black  = '#000000'
      , blue   = '#00b8f1'
      , green  = '#00ff00'
      , red    = '#ff0000'
      , shape  = 'circle'
      , yellow = '#eed202'

    if (!data.connection) return ('color="' + red + '" shape="diamond"')

    color = { binary_switch  : data.powered          ? blue  : black
            , button         : !data.pressed         ? blue  : green
            , garage_door    : data.position === 1.0 ? blue  : yellow
            , hub            : !data.update_needed   ? blue  : yellow
            , light_bulb     : 'ffffff'
            , thermostat     : { cool_only : blue, heat_only : red }[data.mode] || green
            }[data.object_type] || blue

    if (typeof property === 'undefined') return ('color="' + color + '" shape="' + shape + '"')
    if (typeof data[property] === 'undefined') return ''

    value = data[property]    
    color = { co_detected     : value && red
            , liquid_detected : value && red
            , locked          : (!value) && red
            , loudness        : value && yellow
            , motion          : value && yellow
            , opened          : value && yellow
            , presence        : value && yellow
            , smoke_detected  : value && red
            , tamper_detected : value && red
            , vibration       : value && yellow

            , battery         : value === 1.0 ? blue : value > 0.66 ? green : value > 0.33 ? yellow : red
            , brightness      : false
            , co_severity     : (value > 0) && red
            , humidity        : false
            , smoke_severity  : (value > 0) && red

            , temperature     : false
            }[property] || 'green'

    if (color != green) shape = 'triangle'
    return ('color="' + color + '" shape="' + shape + '"')
}
