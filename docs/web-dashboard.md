---
description: This guide will walk you through using the dashboard to add and manage your keys.
---

# Web Dashboard Guide

The ProxLock web dashboard is where you manage your projects and API keys. This guide will walk you through using the dashboard to add and manage your keys.

## Accessing the Dashboard

1. Navigate to the ProxLock web portal (typically at `https://app.proxlock.dev`)
2. Sign in with your account credentials
3. You'll be taken to your home page showing all your projects

## Creating a Project

Projects help you organize your API keys. Each project can contain multiple API keys.

1. On the home page, click the **"+ Create Project"** button
2. Enter a **Project Name** (required)
   - Example: "My iOS App" or "Production API Keys"
3. Optionally add a **Description** to help you remember what this project is for
4. Click **"Create Project"**
5. You'll be automatically taken to your new project's dashboard

## Adding an API Key

Once you're in a project, you can add API keys that you want to protect.

### Step 1: Open the Add Key Dialog

- Click the **"+ Add Key"** button in the API Keys section
- Or, if you have no keys yet, click **"Create Your First Key"**

### Step 2: Fill in Key Information

1. **Name** (required)
   - Enter a descriptive name for your API key
   - Examples: "OpenAI", "Stripe", "My API Key"
   - Tip: If you use a popular API name (like "OpenAI" or "Claude"), the whitelisted URLs will be automatically suggested

2. **Description** (optional)
   - Add a description to help you remember what this key is used for
   - Example: "Used for GPT-4 requests in production"

3. **Full API Key** (required)
   - Paste your complete API key here
   - ⚠️ **Important**: This key will be split and stored securely. You'll only see your partial key once after creation, so make sure to copy it!

4. **Whitelisted URLs** (required)
   - Add at least one URL that this key is allowed to access
   - You can add multiple URLs by typing each one and clicking "Add"
   - URLs are treated as wildcards (e.g., "api.example.com" matches "api.example.com/*")
   - You don't need to include the protocol (http:// or https://)
   - Examples:
     - `api.openai.com`
     - `api.anthropic.com`
     - `api.stripe.com/v1`

### Step 3: Save Your Partial Key

1. Click **"Create Key"**
2. A modal will appear showing your **Partial Key**
3. ⚠️ **This is the only time you'll see this key!** Copy it immediately
4. You'll also see your **Association ID** - copy this as well
5. Click **"Copy & Close"** to save the key to your clipboard

### Step 4: Use Your Credentials

- **Partial Key**: Use this in your iOS app with the ProxLock SDK
- **Association ID**: Also needed for the iOS SDK setup

Both of these values are also visible on the key card in your dashboard, so you can always reference them later.

## Managing Your Keys

### Viewing Key Details

Each key card shows:
- Key name and description
- **Association ID**: The unique identifier for this key
- **Key ID**: The internal ID for this key
- **Whitelisted URLs**: The URLs this key is allowed to access

### Editing a Key

1. Click the **edit icon** (pencil) on the key card
2. You can update:
   - Key name
   - Description
   - Whitelisted URLs (add or remove)
3. Click **"Update Key"** to save changes

### Deleting a Key

1. Click the **delete icon** (trash) on the key card
2. Confirm the deletion
3. ⚠️ This action cannot be undone

## Apple Device Check Setup

For iOS apps, you'll need to set up Apple Device Check to enable device validation.

### Uploading a Device Check Key

1. In your project dashboard, scroll to the **Apple Device Check** section
2. Click **"+ Upload DeviceCheck Key"**
3. Choose **"Upload New Key"** mode
4. Fill in the required information:
   - **Team ID**: Your Apple Developer Team ID (exactly 10 characters)
   - **Key ID**: The ID of your Device Check key
   - **Private Key**: Upload your `.p8` file or paste the PEM-formatted private key
5. Click **"Upload Key"**

### Linking an Existing Device Check Key

If you've already uploaded a Device Check key to another project:

1. Click **"+ Upload DeviceCheck Key"**
2. Choose **"Link Existing Key"** mode
3. Select the key you want to link from the list
4. Click **"Link Key"**

### Using the Bypass Token

After uploading a Device Check key, you'll see a **Bypass Token**. This token is used for testing in the iOS Simulator:

- Copy the bypass token
- Set it as an environment variable: `PROXLOCK_DEVICE_CHECK_BYPASS`
- Use this when testing in the simulator (Device Check only works on real devices)

## Web Requests

ProxLock supports web-based requests for applications that aren't running on iOS or Android devices.

> **WARNING:** Enabling web requests for an API key **effectively disables all device-based protections**. Without Device Check or Play Integrity validation, anyone with your partial key can make requests. **You should always enforce a rate limit** on keys that have web requests enabled.

### Enabling Web Requests

1. When creating or editing an API key, toggle **"Enable web requesting"** to enabled
2. Set an appropriate **Rate Limit** (requests per minute) to prevent abuse
3. Click **"Create Key"** or **"Update Key"** to save

Web requests use the `web` validation mode when calling the proxy API.

## Google Play Integrity Setup

For Android apps, you can set up Google Play Integrity to validate that requests come from legitimate Android devices.

### Prerequisites

Before setting up Play Integrity, you'll need:

- Your Android app's **Package Name** (e.g., `com.example.myapp`)
- A **Google Cloud Service Account** with Play Integrity API access
- The Service Account's **JSON key file**

### Uploading Play Integrity Configuration

1. In your project dashboard, scroll to the **Google Play Integrity** section
2. Click **"+ Upload Play Integrity Key"**
3. Fill in the required information:
   - **Android Package Name**: Your app's package name (e.g., `com.example.myapp`)
   - **Service Account JSON**: Upload or paste your Google Cloud service account JSON key
4. Click **"Upload"**

Once configured, your Android app can use the `play-integrity` validation mode when making proxy requests.

## Managing Projects

### Editing a Project

1. Click the **edit icon** (pencil) next to the project name
2. Update the project name or description
3. Click **"Update Project"**

### Deleting a Project

1. Scroll to the bottom of the project dashboard
2. In the **"Danger Zone"** section, click **"Delete Project"**
3. Confirm the deletion
4. ⚠️ This will permanently delete the project and all associated API keys. This action cannot be undone.

## Tips

- **Organize by project**: Create separate projects for different apps or environments (development, staging, production)
- **Use descriptive names**: Name your keys clearly so you know what they're for
- **Save your partial keys**: Copy and store your partial keys securely when you create them
- **Whitelist carefully**: Only add the URLs that your app actually needs to access
- **Test with bypass token**: Use the Device Check bypass token when testing in the iOS Simulator

