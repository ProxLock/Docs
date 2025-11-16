# ProxLock Documentation

Welcome to the ProxLock documentation. This site uses the same styling as the ProxLock frontend application.

## Features

ProxLock is an API proxy service that helps you manage and secure your API keys.

### Key Features

- **Secure API Key Management** - Safely store and manage your API keys
- **Device Check Integration** - Built-in support for Apple DeviceCheck
- **Project Organization** - Organize your keys by project
- **Usage Tracking** - Monitor your API usage and limits

## Getting Started

To get started with ProxLock, you'll need to:

1. Create a project
2. Add your API keys
3. Configure your endpoints
4. Start making requests

## Code Example

Here's a simple example of how to use ProxLock:

```python
import requests

# Your ProxLock endpoint
url = "https://api.proxlock.example.com/proxy"
headers = {
    "X-API-Key": "your-proxlock-key",
    "X-Target-URL": "https://api.example.com/data"
}

response = requests.get(url, headers=headers)
print(response.json())
```

## Styling

This documentation site matches the ProxLock frontend styling with:

- Purple gradient accents (`#8b6bdb`, `#8b71c7`, `#a58bff`)
- Dark mode with gradient backgrounds
- Light mode support
- Smooth transitions and modern UI elements
