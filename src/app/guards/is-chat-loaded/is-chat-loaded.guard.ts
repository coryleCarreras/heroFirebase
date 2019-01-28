import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppState } from 'app/store/chat';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators'
import { selectChatsLoaded$ } from 'app/store/chat/selectors/chat-list.selector';
import { ChatListModule } from 'app/store/chat/actions/chat-list.action';

@Injectable({
  providedIn: 'root'
})
export class IsChatLoadedGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(select(selectChatsLoaded$),
    map(isLoaded => {
      if(!isLoaded){
        this.store.dispatch(new ChatListModule.LoadInitChats());
      }
      return true;
    }));
  }
}
