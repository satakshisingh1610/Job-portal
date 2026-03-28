# MongoDB Installation Guide for Windows

## Option 1: Install MongoDB Community Server

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows
   - Choose the latest version
   - Download the MSI installer

2. **Install MongoDB**
   - Run the downloaded MSI file
   - Choose "Complete" installation
   - Install MongoDB Compass (optional GUI tool)
   - Keep default settings

3. **Start MongoDB Service**
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`

## Option 2: Use MongoDB Atlas (Cloud Database)

1. **Sign up for MongoDB Atlas**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create a free account

2. **Create a Cluster**
   - Choose "Shared Cluster" (FREE)
   - Select a cloud provider and region
   - Create cluster

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update .env file**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal
   ```

## Option 3: Use Docker (if you have Docker)

1. **Run MongoDB with Docker**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Update .env file**
   ```
   MONGODB_URI=mongodb://localhost:27017/jobportal
   ```

## After Installation

1. **Verify MongoDB is running**
   ```bash
   mongosh --eval "db.adminCommand('ismaster')"
   ```

2. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## Troubleshooting

### If MongoDB service doesn't start:
1. Open "Services" in Windows
2. Find "MongoDB" service
3. Right-click → Start

### If connection fails:
1. Check if MongoDB is running on port 27017
2. Verify the .env file has correct MONGODB_URI
3. Check Windows Firewall settings

### Quick Test Connection:
```bash
# Test if MongoDB is accessible
telnet localhost 27017
```
