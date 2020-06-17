---
title: Connecting Azure IoT Central and Node-Red on Raspberry Pi – Part 2
date: "2019-06-08T12:00:00.000Z"
---

This post is a continuation on part 1. In this post we are going to connect our Raspberry Pi to our IoT Central instance.

Now browse to the Device Explorer on the left side and select your template. We are going to create an entry for the Raspberry we are about to connect. Hit the plus icon and press “Real”. Don’t bother copying these values yet, we’ll have plenty of chance for that later. This step creates a new device with a Device ID and a default name that suits our purposes just fine. If you are planning to connect multiple devices in this tutorial, you might want to change the device name to something more friendly.

As I mentioned before, we will be running Node-Red from a Raspberry Pi. If like me you are using a DHT11 sensor to get your measurements, you’ll need to follow some extra steps to get the node working in Node-Red. [Please follow the instructions for installing the node carefully.](https://flows.nodered.org/node/node-red-contrib-dht-sensor) I prefer to SSH into my Raspberry Pi rather than connecting it to a screen and input devices. With the node installed, run Node Red and browse to the exposed webpage. From the menu in the top right you can access the Manage Palette option, from here you can install the node-red-contrib-azure-iot-hub package. This contains all the nodes we need to connect to the Azure IoT Hub that IoT Central is built upon.

Now lets drag in 5 nodes. From left to right connect them.
- Inject
- rpi dht22
- Function
- Azure IoT Hub
- Debug

The Inject node is convenient right now because when we press the button attached to it, the flow can start. You can also set it to loop every X seconds. The rpi-dht22 (it supports DHT11 as well) must be configured. Double click it to configure the node. In the CrowPi, the DHT11 is connected to pin 4. If you are using a different pin, configure it accordingly.

We need the Device ID and Primary Key now. You can find them in the Device Explorer on your hub. Click on your device and hit “Connect” in the top right. You should see a screen similar to this:

The function block allows us to write a bit of JavaScript. We want to extract the temperature and humidity from the incoming message and forward that to the Azure IoT Hub node. Copy the code below and substitute the values with your own. Remember we named our telemetry measurements when creating the template? We use those same names in the code below.

    // Extract the temperature and humidity. Temperature is set on the payload property.
    var { payload, humidity } = msg

    // Return a new message with the required data for the Hub.
    return {
        payload: {
            "deviceId": "{your-device-id}",
            "key": "{your-primary-key}",
            "data": {
                "temperature" : payload, 
                "humidity": humidity
            }
        }
    };

Now to configure the IoT Hub node you will need the hostname. This is not the same as your IoT Central address. I got stuck here for a while until I found out how to create connection strings for IoT Central. On your pc, install dps-keygen and use it to create your connection string. Substitute the values below with your own.

    npm install -g dps-keygen
    dps-keygen [primary key] [device id] [scope id]

This creates a connection string that starts with “HostName=”, copy the value that comes after that ending with azure-devices.net; You can use that to configure the IoT Hub node. Be sure to set the protocol to mqtt.

The last node needs no further configuration. I set my Inject node to loop by using the following configuration:

Now when you Deploy your flow using the button in the top right, your device will send the temperature and humidity every 10 seconds. When you check your IoT Central again you’ll notice after a few minutes the graphs are populated.

This is only the start of what’s possible with Azure IoT Central, but it makes a good jumping off point for more.