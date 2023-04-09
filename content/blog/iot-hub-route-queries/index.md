---
title: "Ensuring IoT Hub Treats Messages as JSON: A Step-by-Step Guide"
date: "2023-04-09T12:00:00.000Z"
description: "IoT Hub receives message bodies as byte arrays, regardless of whether it's JSON format or not. To make routing work, you need to add some metadata!"
---

# Introduction:

Azure IoT Hub  allows users to manage and route messages from IoT devices to various endpoints based on routing rules. These rules can be customized and filtered to process incoming messages effectively. However, if you want IoT Hub to treat your messages as JSON, it's important to provide content properties to your messages. In this blog post, I will explain why it's necessary to set content properties and provide a step-by-step guide on how to ensure IoT Hub treats messages as JSON.

## Step 1: Understanding the Importance of Content Properties

By default, IoT Hub receives message bodies as byte arrays, regardless of whether it's JSON format or not. Without the correct content properties, IoT Hub may not be able to correctly interpret the message content or apply the routing rules and filters that depend on JSON properties. To ensure that your messages are treated as JSON, you need to provide the necessary content properties.

## Step 2: Configuring Message Content Properties

When working with IoT device SDKs (such as C#, JavaScript, or Python) or even non-SDK MQTT communication, it's essential to provide the appropriate content properties for IoT Hub to understand how to decode the incoming byte array messages. This enables IoT Hub to treat the messages as JSON and access the message properties. The two properties are `ContentEncoding` and `ContentType` Here's an example using C#:

```csharp
var telemetryDataPoint = new
{
    temperature = 24.5,
    humidity = 80.23,
    pointInfo = "situation normal"
};

// Serialize the telemetry data and convert it to JSON.
string telemetryDataString = JsonConvert.SerializeObject(telemetryDataPoint);

// Encode the serialized object using UTF-8 so it can be parsed by IoT Hub when
// processing messaging rules.
using var message = new Message(Encoding.UTF8.GetBytes(telemetryDataString))
{
    ContentEncoding = "utf-8",
    ContentType = "application/json",
};
```

## Step 3: Handling JSON Message Routing

With the content properties set, IoT Hub can now recognize and decode the incoming message as JSON. This allows the IoT Hub to route the message to the appropriate endpoints based on the routing rules and filters that depend on JSON properties. You can then process the JSON messages at the endpoint level, depending on your application requirements. You can read more about creating queries [here][1]

# Conclusion:

Setting the correct content properties is essential when you want IoT Hub to treat your messages as JSON. By providing the necessary content properties and ensuring that your messages are compatible with the routing rules and filters, you can effectively route and process JSON messages in your IoT Hub. This will allow you to build more efficient and powerful IoT applications that can handle various message types and content.

[1]: https://learn.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-routing-query-syntax?WT.mc_id=IoT-MVP-5004034
