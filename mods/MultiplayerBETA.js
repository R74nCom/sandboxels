(function() {
    class MultiplayerMod {
        constructor() {
            this.socket = null;          // WebSocket-соединение
            this.serverCode = null;        // Код сервера
            this.isServer = false;         // Флаг: создатель сервера
            this.playerList = [];          // Список игроков для админ-панели
            this.init();
        }
        
        init() {
            this.injectMultiplayerButton();
        }
        
        injectMultiplayerButton() {
            const mpButton = document.createElement('button');
            mpButton.innerText = 'Multiplayer';
            mpButton.style.position = 'absolute';
            mpButton.style.top = '10px';
            mpButton.style.right = '10px';
            mpButton.style.zIndex = '1000';
            mpButton.addEventListener('click', () => this.openMainMenu());
            document.body.appendChild(mpButton);
        }
        
        openMainMenu() {
            this.removeElement('mpMenu');
            const menu = document.createElement('div');
            menu.id = 'mpMenu';
            menu.style.position = 'absolute';
            menu.style.top = '50px';
            menu.style.left = '50%';
            menu.style.transform = 'translateX(-50%)';
            menu.style.backgroundColor = '#333';
            menu.style.color = '#fff';
            menu.style.padding = '20px';
            menu.style.borderRadius = '5px';
            menu.style.zIndex = '1000';
            menu.innerHTML = `
                <h2>Multiplayer Menu</h2>
                <button id="btnCreate">Create Server</button>
                <button id="btnJoin">Join Server</button>
                <button id="btnSearch">Search Servers</button>
                <button id="btnClose">Close</button>
            `;
            document.body.appendChild(menu);
            document.getElementById('btnCreate').addEventListener('click', () => this.openCreateServerUI());
            document.getElementById('btnJoin').addEventListener('click', () => this.openJoinServerUI());
            document.getElementById('btnSearch').addEventListener('click', () => this.openSearchServerUI());
            document.getElementById('btnClose').addEventListener('click', () => this.removeElement('mpMenu'));
        }
        
        openCreateServerUI() {
            this.removeElement('mpMenu');
            this.serverCode = this.generateServerCode();
            const createDiv = document.createElement('div');
            createDiv.id = 'mpUI';
            createDiv.style.position = 'absolute';
            createDiv.style.top = '50px';
            createDiv.style.left = '50%';
            createDiv.style.transform = 'translateX(-50%)';
            createDiv.style.backgroundColor = '#444';
            createDiv.style.color = '#fff';
            createDiv.style.padding = '20px';
            createDiv.style.borderRadius = '5px';
            createDiv.style.zIndex = '1000';
            createDiv.innerHTML = `
                <h2>Create Server</h2>
                <label>Server Name: <input type="text" id="serverName" placeholder="Server Name"/></label><br/><br/>
                <label>Password (optional): <input type="text" id="serverPassword" placeholder="Password"/></label><br/><br/>
                <label><input type="checkbox" id="publicToggle"/> Public Server</label><br/><br/>
                <label><input type="checkbox" id="modsToggle"/> Enable Mods for Others</label><br/><br/>
                <div>Server Code: <span id="displayCode">${this.serverCode}</span></div><br/>
                <button id="btnStartServer">Start Server</button>
                <button id="btnBack">Back</button>
                <div id="adminPanel" style="display: none; margin-top:20px; border-top: 1px solid #aaa; padding-top:10px;">
                    <h3>Admin Panel</h3>
                    <button id="btnStopServer">Stop Server</button>
                    <div id="playerList"><h4>Players:</h4><ul></ul></div>
                </div>
            `;
            document.body.appendChild(createDiv);
            document.getElementById('btnBack').addEventListener('click', () => this.removeElement('mpUI'));
            document.getElementById('btnStartServer').addEventListener('click', () => this.startServer());
            document.getElementById('btnStopServer').addEventListener('click', () => this.stopServer());
        }
        
        openJoinServerUI() {
            this.removeElement('mpMenu');
            const joinDiv = document.createElement('div');
            joinDiv.id = 'mpUI';
            joinDiv.style.position = 'absolute';
            joinDiv.style.top = '50px';
            joinDiv.style.left = '50%';
            joinDiv.style.transform = 'translateX(-50%)';
            joinDiv.style.backgroundColor = '#444';
            joinDiv.style.color = '#fff';
            joinDiv.style.padding = '20px';
            joinDiv.style.borderRadius = '5px';
            joinDiv.style.zIndex = '1000';
            joinDiv.innerHTML = `
                <h2>Join Server</h2>
                <label>Server Code: <input type="text" id="joinCode" placeholder="Server Code"/></label><br/><br/>
                <label>Password (if any): <input type="text" id="joinPassword" placeholder="Password"/></label><br/><br/>
                <button id="btnJoinServer">Join</button>
                <button id="btnBack">Back</button>
            `;
            document.body.appendChild(joinDiv);
            document.getElementById('btnBack').addEventListener('click', () => this.removeElement('mpUI'));
            document.getElementById('btnJoinServer').addEventListener('click', () => this.joinServer());
        }
        
        openSearchServerUI() {
            this.removeElement('mpMenu');
            const searchDiv = document.createElement('div');
            searchDiv.id = 'mpUI';
            searchDiv.style.position = 'absolute';
            searchDiv.style.top = '50px';
            searchDiv.style.left = '50%';
            searchDiv.style.transform = 'translateX(-50%)';
            searchDiv.style.backgroundColor = '#444';
            searchDiv.style.color = '#fff';
            searchDiv.style.padding = '20px';
            searchDiv.style.borderRadius = '5px';
            searchDiv.style.zIndex = '1000';
            searchDiv.innerHTML = `
                <h2>Search Public Servers</h2>
                <div id="serverList">Loading servers...</div><br/>
                <button id="btnBack">Back</button>
            `;
            document.body.appendChild(searchDiv);
            document.getElementById('btnBack').addEventListener('click', () => this.removeElement('mpUI'));
            // Здесь эмулируется получение списка серверов; в реальной реализации запрос идёт к серверу
            setTimeout(() => {
                const serverListDiv = document.getElementById('serverList');
                const dummyServers = [
                    { code: 'ABC12345', name: 'Sandboxels Server 1' },
                    { code: 'XYZ98765', name: 'Sandboxels Server 2' }
                ];
                serverListDiv.innerHTML = `<ul>${dummyServers.map(s => `<li>${s.name} - Code: ${s.code} <button data-code="${s.code}" class="joinPublicBtn">Join</button></li>`).join('')}</ul>`;
                document.querySelectorAll('.joinPublicBtn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const code = e.target.getAttribute('data-code');
                        this.openJoinServerUI();
                        setTimeout(() => { document.getElementById('joinCode').value = code; }, 100);
                    });
                });
            }, 1000);
        }
        
        generateServerCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
            let code = "";
            for (let i = 0; i < 8; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }
        
        startServer() {
            const serverName = document.getElementById('serverName').value || 'Unnamed Server';
            const serverPassword = document.getElementById('serverPassword').value;
            const isPublic = document.getElementById('publicToggle').checked;
            const enableMods = document.getElementById('modsToggle').checked;
            this.isServer = true;
            
            // Устанавливаем соединение с WebSocket-сервером (адрес и реализация сервера должны быть настроены отдельно)
            this.socket = new WebSocket("ws://localhost:8080");
            this.socket.onopen = () => {
                console.log("Server socket opened");
                const payload = {
                    action: "createServer",
                    code: this.serverCode,
                    name: serverName,
                    password: serverPassword,
                    isPublic: isPublic,
                    enableMods: enableMods
                };
                this.socket.send(JSON.stringify(payload));
                // Отображаем админ-панель
                document.getElementById("adminPanel").style.display = "block";
            };
            this.socket.onmessage = (msg) => { this.handleMessage(msg); };
            this.socket.onerror = (err) => { console.error("Socket error", err); };
            this.socket.onclose = () => { console.log("Socket closed"); this.cleanUp(); };
        }
        
        joinServer() {
            const code = document.getElementById('joinCode').value;
            const password = document.getElementById('joinPassword').value;
            if (!code) {
                alert("Please enter a valid server code");
                return;
            }
            this.socket = new WebSocket("ws://localhost:8080");
            this.socket.onopen = () => {
                console.log("Client socket opened");
                const payload = {
                    action: "joinServer",
                    code: code,
                    password: password
                };
                this.socket.send(JSON.stringify(payload));
            };
            this.socket.onmessage = (msg) => { this.handleMessage(msg); };
            this.socket.onerror = (err) => { console.error("Socket error", err); };
            this.socket.onclose = () => { console.log("Socket closed"); this.cleanUp(); };
        }
        
        handleMessage(message) {
            let data;
            try {
                data = JSON.parse(message.data);
            } catch(e) {
                console.error("Invalid JSON:", message.data);
                return;
            }
            switch(data.action) {
                case "spawn":
                    this.handleSpawn(data);
                    break;
                case "explode":
                    this.handleExplode(data);
                    break;
                case "updatePlayers":
                    this.updatePlayerList(data.players);
                    break;
                case "kick":
                    alert("You have been kicked from the server.");
                    this.socket.close();
                    break;
                case "ban":
                    alert("You have been banned from the server.");
                    this.socket.close();
                    break;
                case "stopServer":
                    alert("Server has been stopped by admin.");
                    this.socket.close();
                    break;
                default:
                    console.log("Unhandled action:", data.action);
            }
        }
        
        handleSpawn(data) {
            // Вызов функции игрового движка для спауна элемента, например: game.spawn(data.element, data.position);
            console.log(`Spawn ${data.element} at`, data.position);
        }
        
        handleExplode(data) {
            // Вызов функции игрового движка для взрыва, например: game.explode(data.position, data.radius);
            console.log(`Explosion at`, data.position, `with radius`, data.radius);
        }
        
        updatePlayerList(players) {
            this.playerList = players;
            const playerListEl = document.querySelector('#playerList ul');
            if (playerListEl) {
                playerListEl.innerHTML = '';
                players.forEach(player => {
                    const li = document.createElement('li');
                    li.innerText = player.name;
                    const kickBtn = document.createElement('button');
                    kickBtn.innerText = 'Kick';
                    kickBtn.addEventListener('click', () => this.kickPlayer(player.id));
                    const banBtn = document.createElement('button');
                    banBtn.innerText = 'Ban';
                    banBtn.addEventListener('click', () => this.banPlayer(player.id));
                    li.appendChild(kickBtn);
                    li.appendChild(banBtn);
                    playerListEl.appendChild(li);
                });
            }
        }
        
        kickPlayer(playerId) {
            if (this.isServer && this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ action: "kick", target: playerId }));
            }
        }
        
        banPlayer(playerId) {
            if (this.isServer && this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({ action: "ban", target: playerId }));
            }
        }
        
        cleanUp() {
            this.socket = null;
            this.isServer = false;
            this.removeElement('mpUI');
        }
        
        removeElement(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }
    }
    
    // Создаем глобальный экземпляр мода
    window.SandboxelsMultiplayer = new MultiplayerMod();
    
    // Хук для игровых действий: при вызове game-движка можно отправлять события на сервер
    window.onGameAction = (action, data) => {
        if (window.SandboxelsMultiplayer && window.SandboxelsMultiplayer.socket &&
            window.SandboxelsMultiplayer.socket.readyState === WebSocket.OPEN) {
            const payload = { action, ...data };
            window.SandboxelsMultiplayer.socket.send(JSON.stringify(payload));
        }
    };
})();
