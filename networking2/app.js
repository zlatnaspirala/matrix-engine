import {htmlHeader, scriptManager} from "../lib/utility";
import {BIGLOG, byId, closeSession, joinSession, leaveSession, netConfig, REDLOG, removeUser} from "./matrix-stream";

/**
 * Main instance for matrix-stream
 * version 1.0.0 beta
 */

export class MatrixStream {
	constructor(arg) {

		console.log(`LOADED 1`)

		if(typeof arg === 'undefined') {
			throw console.error('MatrixStream constructor must have argument : { domain: <DOMAIN_NAME> , port: <NUMBER> }');
		}
		netConfig.NETWORKING_DOMAIN = arg.domain;
		netConfig.NETWORKING_PORT = arg.port;
		netConfig.sessionName = arg.sessionName;
		scriptManager.LOAD('openvidu-browser-2.20.0.js', undefined, undefined, undefined, () => {
			this.loadNetHTML()
			console.log(`%c MatrixStream constructed.`, BIGLOG)
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
			});
	}

	attachEvents() {
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
