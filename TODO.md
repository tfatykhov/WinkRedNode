# TODO
    
## Documentation

* Review images for consistency and add visual clues.
    
## Node-RED
    
* Create an alternative flow for use with Freeboard
    
    1. Start by calling `/users/me/wink_devices` and `/users/me/linked_services`
    
    2. Convert to a data structure that looks like this:
    
            { "light_bulb"      :
              { "Kitchen"       :
                { "id"          : "1"
                , "connection"  : true
                , "powered"     : false
                , "brightness"  : 1.0
                }
    
              , ...                // more light bulbs here
    
              }
    
            , ...                  // more object types here
    
            , "linked_services" :
              { "123"           : // indexed by linked_service_id, not name
                {
                  ...
                }
              }
    
            , "lastUpdates"     : // information from the last update
              {
    
              }
            }

        Merge the results of both calls into a single object.
(The `wink_devices` call returns many different object types;
the `linked_services` call returns onlyl the `linked_service` object type.)    
    
    3. For each device and service, subscribe for state notifications; 
    
    4. Whenever a notification arrives, update the data structure accordingly.
    
    5. Export `/red/getWinkState`` but require an HTTP `Authorization: Bearer ...` header.
(The token value should be in an environment variable, e.g., `NODE_RED_TOKEN`.)
    
## Freeboard

* Clone [node-red-contrib-freeboard](https://github.com/urbiworx/node-red-contrib-freeboard)
to add new widgets.
    
* New widget: modified RAG indicator
    
    * if color value present, use that instead of R-A-G
    
    * if percentage present, display as a (partially-)filled vertical-bar rather than a cricle
    
* Displaying objects:

    * RAG indicator: binary_switch, button, gang, hub, lock, smoke_detector, sprinkler_zone, unknown_device
    
    * RAG indicator with color: thermostat
    
    * RAG indicator with percentage: garage_door, shade
    
    * RAG indicator with color and percentage: light_bulb, sensor_pod
    
    * TBD: camera

* Indicator Light should evaluate ON/OFF when javascript present (bug!).
