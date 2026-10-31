TimeLabels is a Swift package of short, deterministic date and time labels for UIs: "In 2h", "5mins ago", "3:30 PM", "Tomorrow". It saves you from repeating `DateFormatter` setup on every screen.

## What it does

- **Time until and since.** `timeRemaining`, `timeAgo` and `relative`, which picks "In 5mins" or "5mins ago" for you.
- **Durations.** `duration` gives a compact ("1h 30m") or countdown ("1:30:00") label, from seconds or a Swift `Duration`.
- **Clock and dates.** `time`, `timeRange`, `date` ("Tomorrow") and `dateTime` ("Tomorrow at 3:30 PM").
- **Units and rounding.** Seconds, days and weeks, with optional rounding to the nearest unit. Options include `expandUnits`, `addSpace`, `spellNumbers`, `use24Hour` and `largestUnit`.
- **Date extensions and SwiftUI.** Shortcuts like `date.timeAgoLabel()` and a self-updating `TimeLabelText` view.
- **Predictable output.** A fixed `en_US_POSIX` locale, no shared mutable state, and a `now:` parameter so tests can pin the clock.

## Example

```swift
TimeLabel.timeRemaining(1_800)                   // "In 30mins"
TimeLabel.timeAgo(date.addingTimeInterval(-300)) // "5mins ago"
TimeLabel.time(Date())                           // "3:30 PM"
```

## Install

In Xcode, choose File > Add Package Dependencies, enter `https://github.com/founding5067/TimeLabels` and use "Up to Next Major Version" from 2.0.0. Or add it to `Package.swift`:

```swift
.package(url: "https://github.com/founding5067/TimeLabels", from: "2.0.0")
```

## Requirements

Swift 6.0+ on iOS 16, macOS 13, watchOS 9, tvOS 16 or visionOS 1. CI also runs on Linux. MIT licensed.
