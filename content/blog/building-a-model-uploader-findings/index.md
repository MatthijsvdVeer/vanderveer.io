---
title: Things I Learned While Building A Better Model Uploader
date: "2021-08-27T12:00:00.000Z"
description: Here are a few things I learned about Azure Digital Twins and DTDL while building a new model uploader, and why I stopped trying to parse DTDL myself.
---

Findings:
- The target of a relationship does not need to be a know dtmi. It can be any valid dtmi and doesn't need to be in the same instance.
- Property type can be both a string and an array:
{
      "@type": [
        "TimeSpan",
        "Property"
      ],
      "displayName": {
        "en": "fire rating"
      },
      "name": "fireRating",
      "schema": "double",
      "unit": "hour",
      "writable": true
    }
- An interface can extend 0-2 interfaces
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
- The above two items make parsing DTDL hard, you write your own JSON converters to solve for some of this. I moved to the DTDL parser lib instead.