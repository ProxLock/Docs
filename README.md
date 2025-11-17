# ProxLock Documentation Website

This repository contains the documentation website for **ProxLock**, a secure API proxy service designed to protect your API keys in mobile applications. The documentation is built using [MkDocs](https://www.mkdocs.org/) with the [Material theme](https://squidfunk.github.io/mkdocs-material/).

## About ProxLock

ProxLock helps you secure your API keys by:
- Splitting your keys into partial keys stored separately
- Proxying requests through a secure service
- Validating devices using Apple's Device Check
- Preventing full API key exposure in your app's code

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd Docs
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Documentation Locally

1. **Start the development server**:
   ```bash
   mkdocs serve
   ```

2. **View the documentation**:
   Open your browser and navigate to `http://127.0.0.1:8000`

   The site will automatically reload when you make changes to the documentation files.

3. **Build the static site** (optional):
   ```bash
   mkdocs build
   ```
   This creates a `site/` directory with the static HTML files.

## Contributing

We welcome contributions to improve the ProxLock documentation! Here's how you can help:

### Making Changes

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Edit the documentation**:
   - Documentation files are located in the `docs/` directory
   - Edit existing `.md` files or create new ones
   - The navigation structure is defined in `mkdocs.yml`

3. **Preview your changes**:
   ```bash
   mkdocs serve
   ```
   Review your changes at `http://127.0.0.1:8000` to ensure everything looks good.

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin your-branch-name
   ```

5. **Create a Pull Request**:
   - Open a pull request on GitHub
   - Provide a clear description of your changes
   - Reference any related issues

### Documentation Guidelines

- **Markdown**: All documentation is written in Markdown (`.md` files)
- **Structure**: Follow the existing structure and navigation defined in `mkdocs.yml`
- **Style**: Maintain consistency with the existing documentation style
- **Clarity**: Write clear, concise, and helpful content
- **Examples**: Include code examples where appropriate

### File Structure

```
Docs/
├── docs/                    # Documentation source files
│   ├── index.md            # Home page
│   ├── getting-started.md  # Getting started guide
│   ├── web-dashboard.md    # Web dashboard guide
│   ├── ios-sdk.md          # iOS SDK guide
│   ├── stylesheets/        # Custom CSS
│   └── javascripts/        # Custom JavaScript
├── mkdocs.yml              # MkDocs configuration
├── requirements.txt        # Python dependencies
└── README.md               # This file
```

### Questions or Issues?

If you have questions about contributing or encounter any issues:
- Open an issue on GitHub
- Check existing issues and pull requests
- Review the [MkDocs documentation](https://www.mkdocs.org/user-guide/) for help with MkDocs-specific questions

Thank you for helping improve the ProxLock documentation! 🎉

