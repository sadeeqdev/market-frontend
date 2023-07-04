import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';
@Injectable({
  providedIn: 'root'
})
export class DefaultProviderService {

  provider: ethers.providers.WebSocketProvider;
  KEEP_ALIVE_CHECK_INTERVAL = 1000;
  keepAliveInterval: any;
  pingTimeout: any;

  constructor(
    private environmentService: EnvironmentProviderService
  ) {
    this.provider = new ethers.providers.WebSocketProvider(this.environmentService.environment.webSocketUrl);
    this.listenToEvents();
  }


  listenToEvents(){
    this.environmentService.getEvent().subscribe((network) => {
      if(network){
        this.provider = new ethers.providers.WebSocketProvider(network.webSocketUrl);
        return
      }
    });
    // Set up event handlers for WebSocket events
    this.provider._websocket.addEventListener('open', (event) => this.onWsOpen(event));
    this.provider._websocket.addEventListener('close', (event) => this.onWsClose(event));
  }

  onWsOpen(event: any) {
    console.log("Connected to the WS!");
    this.keepAliveInterval = setInterval(() => {
      if (this.provider._websocket && (
        this.provider._websocket.readyState === WebSocket.OPEN ||
        this.provider._websocket.readyState === WebSocket.CONNECTING
      )) return;

      this.provider._websocket?.close();
    }, this.KEEP_ALIVE_CHECK_INTERVAL);
  }

  onWsClose(event: any) {
    console.log("WS connection lost! Reconnecting...");
    clearInterval(this.keepAliveInterval);
    this.load();
  }

  async getBlockNumber() {
    const blockNumber = await this.provider.getBlockNumber();
    console.log('block number is: ', blockNumber);
  }

  getBalance() {
    // Implement function to get balance
  }

  load() {
    // Reload the WebSocketProvider
    this.provider = new ethers.providers.WebSocketProvider(this.environmentService.environment.webSocketUrl);

    // Re-set up event handlers for WebSocket events
    this.provider._websocket.addEventListener('open', (event) => this.onWsOpen(event));
    this.provider._websocket.addEventListener('close', (event) => this.onWsClose(event));
  }
}