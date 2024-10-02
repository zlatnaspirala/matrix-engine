import {htmlHeader, scriptManager} from "../lib/utility";
import {BIGLOG, byId, closeSession, joinSession, leaveSession, netConfig, REDLOG, removeUser} from "./matrix-stream";

/**
 * Main instance for matrix-stream
 * version 1.0.0 beta
 */

export class MatrixStream {

	connection = null;
	session = null;

	constructor(arg) {
		if(typeof arg === 'undefined') {
			throw console.error('MatrixStream constructor must have argument : { domain: <DOMAIN_NAME> , port: <NUMBER> }');
		}
		netConfig.NETWORKING_DOMAIN = arg.domain;
		netConfig.NETWORKING_PORT = arg.port;
		netConfig.sessionName = arg.sessionName;
		scriptManager.LOAD('openvidu-browser-2.20.0.js', undefined, undefined, undefined, () => {
			this.loadNetHTML()
		});
	}

	loadNetHTML() {
		fetch("./broadcaster2.html", {headers: htmlHeader}).then((res) => {return res.text()})
			.then((html) => {
				var popupUI = byId("matrix-net");
				popupUI.style = 'display: block;';
				popupUI.innerHTML = html;
				this.joinSessionUI = byId("join-btn");
				this.buttonCloseSession = byId('buttonCloseSession');
				this.buttonLeaveSession = byId('buttonLeaveSession');
				byId("sessionName").value = netConfig.sessionName;
				this.sessionName = byId("sessionName");
				console.log('[CHANNEL]' + this.sessionName.value)
				this.attachEvents()
				console.log(`%c MatrixStream constructed.`, BIGLOG)
			});
	}

	attachEvents() {

		addEventListener(`LOCAL-STREAM-READY`, (e) => {
			console.log('LOCAL-STREAM-READY ', e.detail.connection)
			this.connection = e.detail.connection;

			var CHANNEL = netConfig.sessionName
			// console.log("ONLY ONES CHANNEL =>", CHANNEL);
			this.connection.send = (netArg) => {
				// to Array of Connection objects (optional. Broadcast to everyone if empty)
				this.session.signal({
					data: JSON.stringify(netArg),
					to: [],
					type: CHANNEL
				}).then(() => {
					// console.log('emit all successfully');
				}).catch(error => {
					console.error("Erro signal => ", error);
				});
			}

		})

		addEventListener('setupSessionObject', (e) => {
			// this.connection.session = session;
      console.log("setupSessionObject=>", e.detail);
			this.session = e.detail;
			this.session.on(`signal:${netConfig.sessionName}`, (event) => {
				App.net.injector.update(event);
			});
			
		})


		this.joinSessionUI.addEventListener('click', () => {
			console.log(`%c JOIN SESSION`, REDLOG)
			joinSession({resolution: '320x480'})
		})
		this.buttonCloseSession.addEventListener('click', closeSession)
		this.buttonLeaveSession.addEventListener('click', () => {
			console.log(`%c LEAVE SESSION`, REDLOG)
			removeUser()
			leaveSession()
		})
	}
}
