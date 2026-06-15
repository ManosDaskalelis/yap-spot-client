import { Routes } from '@angular/router';
import { DmComponent } from './layout/dm/dm.component';
import { FriendlistComponent } from './layout/friendlist/friendlist.component';

export const routes: Routes = [
  { path: 'friends', component: FriendlistComponent },
  { path: 'dm/:username', component: DmComponent },
];
