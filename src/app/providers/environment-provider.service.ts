import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environments } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentProviderService {

  
  environment: any
  environmentSubject  : BehaviorSubject<any> = new BehaviorSubject(null)

    constructor() {
    const savedEnvironment = localStorage.getItem('environment')
    if(savedEnvironment){
      this.environment = JSON.parse(savedEnvironment);
    }else{
      this.environment = environments[0]
    }
  }

  emitEvent(event: any) {
    this.environmentSubject.next(event);
  }

  getEvent() {
    return this.environmentSubject.asObservable();
  }


  async changeEnvironment(network){
    const selectedNetwork = environments.find(item => item.identifier === network);
    this.environmentSubject.next(selectedNetwork);
    this.environment = selectedNetwork;
    this.emitEvent(selectedNetwork);
    localStorage.setItem('environment', JSON.stringify(environments[0]))
  }
}
