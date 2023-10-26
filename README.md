# Right Shift

A simple react application for Microsoft Teams. This app allows user to login using SSO and log attendence."

## Main features

1. You can side load into Microsoft teams. 
2. Login using SSO.
3. Log attendence.
4. View attendence.
5. View your profile.


## Stack

- indexDb
- express
- react
- Microsoft Graph API
- Microsoft Teams SDK
- Azure AD

## Run

### Server

```bash
npm install 
npm run start

```

### Client

```bash
cd client
npm install 
npm run start

```

### Package
You can generate a Teams compatible package by executing this command.
This package will populate app details from `.env` file to `manifest.json` file.
```bash
npm run package
```

## Hosting
- NGROK
- Microsoft Dev Tunnel (preferred)

You can use [Microsoft's Dev tunnel](https://learn.microsoft.com/en-us/azure/developer/dev-tunnels/overview)  to get a persistant remote URL for your localhost.
This will save you from updating the remote URL in your Azure Portal App registration for SSO purpose.
