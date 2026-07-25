---
slug: smart-wheelchair
title: Smart Wheelchair – Arduino-Based Mobility System
short: Smart wheelchair supporting manual, autonomous, and hybrid control.
badge: Academic
category: iot
tech:
  - Arduino Uno
  - HC-SR04 Sensors
  - HC-05 Bluetooth
  - L298N Motor Driver
  - C++
---

An Arduino-powered smart wheelchair prototype engineered to enhance independence for individuals with mobility challenges.

## Supported Modes

- **Manual Bluetooth Mode**: Controlled remotely via custom-paired Android/iOS mobile application with live communication and emergency brakes.
- **Autonomous Obstacle Avoidance**: Scans paths with 4 ultrasonic sensors, running a local rerouting path logic.
- **Hybrid Safety Mode**: Manual control with active proximity overrides that automatically avoid collisions based on sensor readings.
- **Joystick Redundancy**: Physical hardware controller fallback for offline/manual operation.
