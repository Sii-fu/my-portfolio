---
slug: fire-fighting-robot
title: Arduino-Based Fire-Fighting Robot
short: Autonomous and manual fire detection and suppression robot.
badge: Academic
category: iot
tech:
  - Arduino Uno
  - IR Flame Sensors
  - Ultrasonic Sensors
  - Servo Motors
  - C++
---

A hardware fire-fighting vehicle prototype equipped with sensors and active extinguish modules designed for hazardous area container cooling and fire suppression.

## Key Architecture

- **Direct Fire Tracking**: Utilizes 3 infrared flame sensors (left, right, center) to map fire origins.
- **Active Suppression**: Once inside range, activates a servo-rotated gas-based spray system covering sweeps of 50°–130°.
- **Safe Navigation**: Employs a front-mounted ultrasonic sensor to steer clear of obstacles in high-smoke environments.
