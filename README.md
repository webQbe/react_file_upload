# React File Uploader

- Creating back-end with **express-fileupload** package
- Using Bootstrap & FontAwesome for UI elements: progress bar & "File Uploaded" alert
- Using `Async/Await` and `axios` to show file upload progress: 
    - Fills up to 100%, go back to 0% after 10 secs
- Show uploaded image with file name
- Uploaded image file is saved in `public/uploads` folder


### Create React App

1. Download and Install **Node.js**
2. Open project folder in VSCode Integrated Terminal
3. Install Vite on terminal:
    - Run `npm create vite@latest .`
    - Select `React` & Enter
    - Select `JavaScript` & Enter
4. Update `vite.config.js` file:
    - Add `server: { port: 3000, }` in `defineConfig()`
5. Install dependencies:
    - Open terminal and run `npm install`
6. Delete: `public/vite.svg`, `src/assets`, `src/index.css`
    1. Remove `import './index.css'` from `src/main.jsx`
    2. Modify and Remove from `src/App.jsx`:
        ```
        import reactLogo from './assets/react.svg'
        import viteLogo from '/vite.svg'
        ```
    3. Clear contents in `src/App.css`
7. Add `"proxy": "http://localhost:5000"` to root `package.json`
8. Install Axios: `npm i axios`



## Create Back-End

1. Create `server/` directory
    1. Open it in VSCode terminal: `cd server`
    2. Create `server/package.json` file: `yarn init -y`

2. Install back-end dependencies: `yarn add express express-fileupload cors dotenv`
3. Install `nodemon` for development: `yarn add -D nodemon`
4. Create `server/server.js`
5. Add following script to root `package.json`:
    ```
    "scripts": {
                "client": "vite",
                "server": "nodemon server/server.js",
                "dev": "concurrently \"yarn run server\" \"yarn run client\""
                }
    ```
6. Start front-end & back-end servers: `npm run dev`