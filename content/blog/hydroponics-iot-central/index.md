---
title: Integrating A Hydroponics Installation in IoT Central
date: "2020-06-23T12:00:00.000Z"
description: "Receiving telemetry from a simple hydroponics set up in IoT Central"
---

My plants die... a lot

In an attempt to be able to grow something I bought [this little hydroponics set up][4] online. It arrived with all the needed accessories and I plugged it in right away. I don't know what I expected, but a huge wave of dissatisfaction rushed over me. Sure the pump works, but where is my data?! To remedy this lack of insight, I wanted to at least measure a few things so I could blame my apartment's environment in the inevitable event of plant extinction. Also, this month is #JulyOT, so CONNECT EVERYTHING!

*picture of hydroponics*

## Building the device
If you're like me, you probably have an unlabeled box or boxes filled to the brim with sensors, wires and microcontrollers. If not, here are the parts I'm using:
- ESP32 (ESP8266 works too, with a few changes to the code)
- DHT22 sensor
- DS18B20 sensor (these are sold as just the sensor or with a metal housing and waterproof cable, get the latter one if you don't like sparks)
- 1 10K Ohm and 1 5K Ohm resistor
- Optional: an analogue light sensor like pictured below. I decided not to include it in the end because of where my device is placed (behind the curtains)
- Assorted wires and prototyping board
- An enclosure, because stepping on a microcontroller is the equivalent of stepping on electrified Lego.

![The parts needed](./images/parts.png  "The parts needed")

I'm not going into detail on how to connect these sensors, because the tutorials for the [DHT22][1] and [DS18B20][2] have been written a hundred times before. Just make sure that you connect the DHT22 to GPIO 4 and DS18B20 to GPIO 5. I like [this writeup][3] of the pinout reference for the ESP32. I started by trying to use GPIO 34 but couldn't get the sensor to work, I still haven't figured out why that's happening. The result is that I jump some cables across the prototyping board to the other side of the microcontroller. Not my finest work, but the extra cables sure do give it a nice aesthetic!

![Device closeup](./images/device-closeup.jpg "Device closeup")

For the code, I started with the [IoT Central Firmware repository][5] that Microsoft provides. It has samples for IoT Central for different devices, including the ESP8266 and ESP32. Now, I'm no embedded developer, my skillset includes Arduino at a basic level. The repository contains an Arduino example for ESP8266, but not for ESP32. So I took the ESP8266 code and changed a couple of things to get it working on the ESP32. You can find my code [on my GitHub][6].

## Connecting to IoT Central
IoT Central is Microsoft's Software as a Service solution for IoT. It offers a quick and easy way to model and provision devices and comes with a few integrations to other platforms. It's the perfect place to get started with smaller IoT projects, and the first 2 devices are free.



[1]: https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/
[2]: https://arduinogetstarted.com/tutorials/arduino-temperature-sensor
[3]: https://randomnerdtutorials.com/esp32-pinout-reference-gpios/
[4]: https://www.aliexpress.com/item/32826785497.html
[5]: https://github.com/Azure/iot-central-firmware
[6]: https://github.com/MatthijsvdVeer/iot-central-hydroponics
