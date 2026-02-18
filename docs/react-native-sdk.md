# React Native SDK Guide

The ProxLock React Native SDK provides a secure and easy networking layer for proxying API requests through ProxLock's service.

To see ProxLock in action, check out our [Demo Apps](https://github.com/ProxLock/ProxLock-Demo)!

## Requirements

- **React Native**: 0.70 or later
- **Platforms**:
  - iOS 13.0+
  - Android (API level 21+)

## Installation

Add ProxLock to your project using npm or yarn:

```bash
npm install @proxlock/react-native
```

Then, install the pods for iOS:

```bash
cd ios && pod install
```

## Usage

### Getting Started

1.  **Obtain your credentials from ProxLock**:
    - Log in to the [ProxLock web portal](https://app.proxlock.dev)
    - Add your bearer token to get a partial key and association ID

2.  **Create a ProxLockSession instance**:

    ```typescript
    import { ProxLockSession } from "@proxlock/react-native";
    import { Platform } from "react-native";

    // Android configuration is required if you are targeting Android
    const androidConfig = {
      cloudProjectNumber: "your-google-cloud-project-number",
    };

    const session = new ProxLockSession(
      "your-partial-key",
      "your-association-id",
      Platform.OS === "android" ? androidConfig : undefined,
    );
    ```

### Making Requests

#### Using the Convenience Method

The easiest way to make requests is using the `fetch` method, which is a drop-in replacement for the standard global `fetch`:

```typescript
// Make the request through ProxLock
try {
  const response = await session.fetch("https://api.example.com/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.bearerToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  // Handle the response
} catch (error) {
  // Handle errors
}
```

#### Using getRequestHeaders

If you need more control or are using a different networking library (like Axios), you can get the required headers manually:

```typescript
// Get the secure headers for your request
const proxLockHeaders = await session.getRequestHeaders(
  "https://api.example.com/users",
  "GET",
);

// Combine with your existing headers
const headers = {
  ...proxLockHeaders,
  Authorization: `Bearer ${session.bearerToken}`,
  "Content-Type": "application/json",
};

// Use the headers with your preferred client (e.g., standard fetch)
// Note: ProxLock requests must always be POST to the proxy URL
const response = await fetch("https://api.proxlock.dev/proxy", {
  method: "POST",
  headers: headers,
  // Your original body goes here if it exists
});
```

### Using the Partial Key Placeholder

The `session.bearerToken` property returns the partial key placeholder string. ProxLock will replace this placeholder with your full API key wherever it appears in your request.

#### In Authorization Header

```typescript
const authHeader = `Bearer ${session.bearerToken}`;
```

#### In Custom Headers

You can use it in custom headers as well:

```typescript
const headers = {
  "X-API-Key": session.bearerToken,
};
```

#### In Body Parameters

Due to privacy concerns, we do not currently support including the partial key placeholder in the body of your request. If you want this feature, please reach out and let us know at support@proxlock.dev.

### Platform Integration

#### iOS

ProxLock uses Apple's DeviceCheck framework for device validation. This generally happens automatically.

> **Note**: For `ProxLockSession` and ProxLock to work correctly on iOS, you must enable **App Attest** in your `Signing & Capabilities` tab for the target in Xcode.

#### Android

ProxLock uses Google Play Integrity for device validation. You must provide your Google Cloud Project Number in the `androidConfig` when initializing the session.

### Best Practices

1.  **One session per API key**: Create a separate `ProxLockSession` instance for each API key you use in your app. This makes it easier to manage multiple keys.

2.  **Singleton/Context**: Create your `ProxLockSession` instance once (e.g., in a Context provider or a singleton service) and reuse it throughout your app's lifecycle.

3.  **Error handling**: Always wrap ProxLock calls in `try-catch` blocks to handle potential errors, especially during token generation.

## Support

For issues or questions, please open a [GitHub Issue](https://github.com/proxlock/proxlock-react-native/issues).
