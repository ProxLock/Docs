---
description: "Learn how to set up Google Play Integrity for Android device validation with ProxLock."
---

# Google Play Integrity Setup

This guide walks you through setting up Google Play Integrity to validate that requests to ProxLock come from legitimate Android devices.

## Overview

Google Play Integrity is Google's solution for verifying the authenticity and integrity of Android apps. When integrated with ProxLock, it ensures that API requests are coming from genuine, unmodified versions of your app running on real Android devices.

## Prerequisites

Before you begin, you'll need:

- A Google account with access to the [Google Cloud Console](https://console.cloud.google.com/)
- Your Android app's package name (e.g., `com.example.myapp`)
- Access to the [ProxLock web dashboard](https://app.proxlock.dev)

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click **"New Project"**
4. Enter a **Project name** (e.g., "My App Play Integrity")
5. Select your **Organization** and **Location** if applicable
6. Click **"Create"**
7. Wait for the project to be created, then select it from the project dropdown

## Step 2: Enable the Play Integrity API

Enable the Play Integrity API in the [Google Cloud Console](https://console.cloud.google.com/apis/library/playintegrity.googleapis.com).

## Step 3: Create a Service Account

1. In your Google Cloud project, go to [**IAM & Admin** > **Service Accounts**](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click **"+ Create Service Account"**
3. Enter a **Service account name** (e.g., "proxlock-play-integrity")
4. The **Service account ID** will be auto-generated
5. Optionally add a description
6. Click **"Create and Continue"**
7. **Skip the permissions step** - no additional permissions are needed for Play Integrity
8. Click **"Continue"**, then **"Done"**

## Step 4: Download the Service Account Key

1. In the Service Accounts list, find the service account you just created
2. Click the three-dot menu (⋮) on the right side of the row
3. Select **"Manage keys"**
4. Click **"Add Key"** > **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"Create"**
7. The JSON key file will be automatically downloaded to your computer
8. **Keep this file secure** - it provides access to your Google Cloud project

> **Important:** Store the downloaded JSON key file securely. Anyone with access to this file can use your service account.

## Step 5: Upload to ProxLock

1. Log in to the [ProxLock web dashboard](https://app.proxlock.dev)
2. Navigate to your project
3. Scroll to the **Google Play Integrity** section
4. Click **"+ Upload Play Integrity Key"**
5. Enter your **Android Package Name** (e.g., `com.example.myapp`)
6. Upload or paste your **Service Account JSON** key
7. Click **"Upload"**

Once uploaded, you'll see the configuration details including the service account client email.

## Using Play Integrity with ProxLock

After completing the setup, your Android app can use the `play-integrity` validation mode when making proxy requests. Include the Play Integrity token in your requests:

```
X-Play-Integrity-Key: <your-play-integrity-token>
ProxLock_VALIDATION_MODE: play-integrity
```

For more details on making proxy requests, see the [REST API Guide](rest-api.md).

## Android SDK

> **Coming Soon:** A ProxLock Android SDK is in development to simplify Play Integrity integration in your Android apps. Stay tuned for updates!

## Troubleshooting

### API Not Enabled Error

If you receive an error about the Play Integrity API not being enabled, verify that:

1. You've enabled the API in the correct Google Cloud project
2. The service account belongs to the same project where the API is enabled

### Invalid Token Errors

If Play Integrity tokens are being rejected:

1. Ensure your app's package name matches exactly what you configured in ProxLock
2. Verify that your app is signed with the correct signing key
3. Check that the Play Integrity API is properly integrated in your Android app

### Service Account Issues

If there are issues with your service account:

1. Verify the JSON key file is complete and not corrupted
2. Ensure you're using the correct service account key
3. Try generating a new key if problems persist

## Next Steps

- [REST API Guide](rest-api.md) - Learn how to make proxy requests with Play Integrity validation
- [Web Dashboard Guide](web-dashboard.md) - Manage your projects and API keys
- [Getting Started](getting-started.md) - Overview of ProxLock
