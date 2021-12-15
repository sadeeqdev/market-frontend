import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'


enum StorageKeys {
  colorTheme = 'colorTheme'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage

  changes$ = new Subject()

  constructor() {
    this.localStorage   = window.localStorage
  }

  
  public get colorTheme() : string {
    return this.get(StorageKeys.colorTheme)
  }

  public set colorTheme(v : string) {
    this.set(StorageKeys.colorTheme, v)
  }
  
  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key))
    }

    return null
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value))
      this.changes$.next({
        type: 'set',
        key,
        value
      })
      return true
    }

    return false
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key)
      this.changes$.next({
        type: 'remove',
        key
      })
      return true
    }

    return false
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}