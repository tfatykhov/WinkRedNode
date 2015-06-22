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
              [
    
              ]
            }

        Merge the results of both calls into a single object.
(The `wink_devices` call returns many different object types;
the `linked_services` call returns onlyl the `linked_service` object type.)    
    
    3. For each device and service, subscribe for state notifications; 
    
    4. Whenever a notification arrives, update the data structure accordingly.
    
    5. Export `/red/getWinkState`` but require an HTTP `Authorization: Bearer ...` header.
(The token value should be in an environment variable, e.g., `NODE_RED_TOKEN`.)
    
## Freeboard

* TBD: camera, remote, sprinkler/zones
