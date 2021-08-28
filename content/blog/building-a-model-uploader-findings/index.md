---
title: Things I Learned While Building A Better Model Uploader
date: "2021-08-28T12:00:00.000Z"
description: Here are a few things I learned about Azure Digital Twins and DTDL while building a new model uploader, and why I stopped trying to parse DTDL myself.
---

I'm a big fan of writing my own tooling. Sometimes it just takes the form of ConsoleProject43.csproj, and sometimes it can be a crucial part of your software development process. My model uploader was neither, it's convenient but not world changing. The most value I've seen from it is that it taught me some things I didn't know about Azure Digital Twins and DTDL. Here are some of my key takeaways:

# A Property type can be a string or an array
While it *is* [documented][1], I had never considered that the `@type` of a property could be anything but a string value in DTDL. But after trying to build my own parser, I quickly found out that wasn't the case. Example:

```json
{
  "@id": "dtmi:digitaltwins:rec_3_3:asset:Elevator;1",
  "@type": "Interface",
  "contents": [
    {
      "@type": [
        "Mass",
        "Property"
      ],
      "displayName": {
        "en": "weight capacity"
      },
      "name": "weightCapacity",
      "schema": "double",
      "unit": "kilogram",
      "writable": true
    }
  ],
  "displayName": {
    "en": "Elevator"
  },
  "extends": "dtmi:digitaltwins:rec_3_3:asset:ConveyanceEquipment;1",
  "@context": "dtmi:dtdl:context;2"
}
```
Regardless of whether you include a semantic type in the `@type` field, it always needs to contain at least `"Property"`. And when you do include a semantic type, you can use the `unit` field as well!

# A Model can extend from more than 1 interface
This is another thing that's perfectly documented, but you might not realise that it's possible until you find it in another ontology. For instance, take the FirePump model below:
```json
{
  "@id": "dtmi:digitaltwins:rec_3_3:asset:FirePump;1",
  "@type": "Interface",
  "displayName": {
    "en": "Fire Pump"
  },
  "extends": [
    "dtmi:digitaltwins:rec_3_3:asset:SprinklerEquipment;1",
    "dtmi:digitaltwins:rec_3_3:asset:Pump;1"
  ],
  "@context": "dtmi:dtdl:context;2"
}
```
It extends two interfaces, SprinklerEquipment and Pump, which makes a lot of sense for a FirePump. An interesting limitation here is that DTDL allows you to extend 0-2 interfaces. You can't extend more than two interfaces in a single model.

The reason I'm listing it here, is because when you try to parse models using only the `System.Text.Json.JsonSerializer`, you're going to run into issues when you're expecting a string, but reading an array. You might have to write some custom implementations of a `JsonConverter` to do so. For my model uploader, I instead opted to use the `Microsoft.Azure.DigitalTwins.Parser` [NuGet package][2]. This library can parse all your models in one go, and return it as a handy dictionary. This is very easy to then run LINQ queries on. For instance, getting all the interfaces:
```cs
var dictionary = await modelParser.ParseAsync(modelDtdl);

var interfaces = dictionary.Values
    .Where(info => info.EntityKind == DTEntityKind.Interface)
    .Cast<DTInterfaceInfo>();
```

# The target model of a relationship does not have to be in ADT
Ha! Finally something that wasn't in the documentation. In an early version of my model uploader, I was working under the assumption that a model can't be uploaded if it has a relationship with a specified target. Like this example:
```json
{
  "@id": "dtmi:digitaltwins:rec_3_3:core:Agent;1",
  "@type": "Interface",
  "contents": [
    {
      "@type": "Relationship",
      "displayName": {
        "en": "has role"
      },
      "name": "hasRole",
      "target": "dtmi:digitaltwins:rec_3_3:business:Role;1"
    }
  ],
  "@context": "dtmi:dtdl:context;2"
}
```
In the example above, you would think this model depends on `dtmi:digitaltwins:rec_3_3:business:Role;1`, but in reality, you can upload it just fine!

[1]: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#property
[2]: https://www.nuget.org/packages/Microsoft.Azure.DigitalTwins.Parser/3.12.7
[3]: https://github.com/Azure/opendigitaltwins-dtdl/blob/master/DTDL/v2/dtdlv2.md#relationship