# Fix MQTT 

These fixes needed for "ng2-mqtt": "^0.1.2",

## Fix in file /node_modules/ng2-mqtt/mqttws31.js

1. Replace lines 83,84,85 with

```
const Paho = {};
```

2. On line 916 there is missing **var** before **wireMessage = ...**