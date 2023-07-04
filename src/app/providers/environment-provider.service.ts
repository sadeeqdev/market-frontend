import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environments } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentProviderService {

  environment: any;
  environmentSubject  : BehaviorSubject<any> = new BehaviorSubject(null)

  constructor() {
    this.environment = environments[0];
    this.startApp()
  }

  async startApp(){
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      const detectedEnvironment = environments.find(item => item.config.networkParams.chainId.toLowerCase() === chainId) 
      if(detectedEnvironment){
        this.sendEvents(detectedEnvironment)
        return
      }
      this.loadSavedEnvironment()
      return
    }
    this.loadSavedEnvironment()
  }

  sendEvents(environment: any){
    this.environment = environment;
    this.environmentSubject.next(environment);
    localStorage.setItem('environment', JSON.stringify(environment))
  }

  loadSavedEnvironment(){
    const savedEnvironment = localStorage.getItem('environment')
    if(savedEnvironment){
      this.environment = JSON.parse(savedEnvironment);
      this.sendEvents(this.environment)
    }
  }

  getEvent() {
    return this.environmentSubject.asObservable();
  }

  async changeEnvironment(network){
    const selectedEnvironment = environments.find(item => item.identifier === network);
    this.sendEvents(selectedEnvironment)
    localStorage.setItem('environment', JSON.stringify(selectedEnvironment))
  }
}
