---
description: "This guide will help you integrate ProxLock into your iOS app to securely proxy your API requests."
---

# iOS SDK Guide

This guide will help you integrate ProxLock into your iOS app to securely proxy your API requests.

To see the ProxLock iOS SDK in action, check out our [Sample App](https://github.com/ProxLock/ProxLock-Demo)!

## Prerequisites

Before you begin, make sure you have:

1. **ProxLock credentials** from the web dashboard:
   - Partial Key
   - Association ID
2. **Xcode** installed
3. An iOS project set up
4. **App Attest capability** enabled (required for Device Check)

## Installation

### Using Swift Package Manager

1. In Xcode, go to **File** → **Add Package Dependencies...**
2. Enter the repository URL:
   ```
   https://github.com/ProxLock/proxlock-ios
   ```
3. Select the version or branch you want to use
4. Add the package to your target

### Using Package.swift

Add ProxLock to your `Package.swift` file:

```swift
dependencies: [
    .package(url: "https://github.com/ProxLock/proxlock-ios", from: "0.1.0")
]
```

## Getting Your Credentials

Before you can use ProxLock in your app, you need to get your credentials from the web dashboard:

1. Log in to the [ProxLock web portal](https://app.proxlock.dev)
2. Navigate to your project
3. Add an API key (see [Web Dashboard Guide](web-dashboard.md) for details)
4. Copy your **Partial Key** and **Association ID** from the key card

## Setting Up App Attest

ProxLock requires Apple's Device Check framework, which needs App Attest to be enabled:

1. In Xcode, select your project in the navigator
2. Select your app target
3. Go to the **Signing & Capabilities** tab
4. Click **"+ Capability"**
5. Add **App Attest**
6. Make sure it's enabled for your target

## Basic Setup

### Import ProxLock

At the top of your Swift file, import ProxLock:

```swift
import ProxLock
```

### Create a PLSession

Create a `PLSession` instance with your credentials. We recommend creating one session per API key:

```swift
let session = PLSession(
    partialKey: "your-partial-key-here",
    assosiationID: "your-association-id-here"
)
```

**Best Practice**: Store your credentials securely (e.g., in a configuration file or environment variables) and initialize your session once, then reuse it throughout your app.

## Making API Requests

### Using the Convenience Method

The easiest way to make requests is using the `data(for:from:)` method:

```swift
// Create your original request
var request = URLRequest(url: URL(string: "https://api.example.com/users")!)
request.httpMethod = "GET"
request.setValue("Bearer \(session.bearerToken)", forHTTPHeaderField: "Authorization")

// Make the request through ProxLock
do {
    let (data, response) = try await session.data(for: request)
    // Handle the response
    if let httpResponse = response as? HTTPURLResponse {
        print("Status code: \(httpResponse.statusCode)")
    }
    // Process your data
} catch {
    print("Error: \(error)")
}
```

### Using processURLRequest

If you need more control over the request, you can process it manually:

```swift
var request = URLRequest(url: URL(string: "https://api.example.com/users")!)
request.httpMethod = "GET"
request.setValue("Bearer \(session.bearerToken)", forHTTPHeaderField: "Authorization")

// Process the request for ProxLock
let proxiedRequest = try await session.processURLRequest(request)

// Use the proxied request with URLSession
let (data, response) = try await URLSession.shared.data(for: proxiedRequest)
```

## Using the Bearer Token

ProxLock automatically replaces the `bearerToken` placeholder in your requests. Use `session.bearerToken` wherever you would normally use your full bearer token:

```swift
// The bearerToken property returns: "%ProxLock_PARTIAL_KEY:your-partial-key%"
// ProxLock will replace this with the actual bearer token server-side
request.setValue("Bearer \(session.bearerToken)", forHTTPHeaderField: "Authorization")
```

**Important**: Always use `session.bearerToken` instead of your full API key. Never hardcode your full API key in your app!

## Testing in the Simulator

Device Check only works on real devices. For simulator testing, you need to use a bypass token:

1. Get your **Bypass Token** from the web dashboard (in the Device Check section)
2. Set it as an environment variable in Xcode:
   - Go to **Product** → **Scheme** → **Edit Scheme...**
   - Select **Run** in the left sidebar
   - Go to the **Arguments** tab
   - Under **Environment Variables**, click **+**
   - Add:
     - Name: `PROXLOCK_DEVICE_CHECK_BYPASS`
     - Value: `your-bypass-token-here`
3. Run your app in the simulator

## Complete Example

Here's a complete example of making an API request with ProxLock:

```swift
import ProxLock

class APIService {
    private let session: PLSession
    
    init(partialKey: String, associationID: String) {
        self.session = PLSession(
            partialKey: partialKey,
            assosiationID: associationID
        )
    }
    
    func fetchUsers() async throws -> [User] {
        var request = URLRequest(url: URL(string: "https://api.example.com/users")!)
        request.httpMethod = "GET"
        request.setValue("Bearer \(session.bearerToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw APIError.invalidResponse
        }
        
        let users = try JSONDecoder().decode([User].self, from: data)
        return users
    }
}
```

## Best Practices

1. **One session per API key**: Create a separate `PLSession` instance for each API key you use in your app
2. **Reuse sessions**: Create your `PLSession` instances once (e.g., in an initializer or singleton) and reuse them throughout your app's lifecycle
3. **Error handling**: Always wrap ProxLock calls in do-catch blocks to handle potential errors
4. **Never store full keys**: Only use partial keys and association IDs in your app
5. **Test on real devices**: While you can test in the simulator with a bypass token, always test on real devices before releasing

## Troubleshooting

### Device Check Errors

If you see Device Check errors, try the following:

- Make sure **App Attest** is enabled in your target's capabilities
- For simulator testing, ensure the `PROXLOCK_DEVICE_CHECK_BYPASS` environment variable is set
- On real devices, Device Check should work automatically

### Request Failures

If your requests are failing, check the following:

- Verify your partial key and association ID are correct
- Check that the destination URL is in your key's whitelisted URLs
- Ensure you're using `session.bearerToken` in your Authorization header
- Check the response status code for more details

### Network Errors

If you encounter network errors, verify the following:

- Your app has internet connectivity
- The ProxLock service is accessible
- Your request format and headers are correct

## Next Steps

- Review the [Web Dashboard Guide](web-dashboard.md) to learn how to manage your keys
- Check out the [Getting Started](getting-started.md) guide for an overview

