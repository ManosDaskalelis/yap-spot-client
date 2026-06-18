import { Routes } from '@angular/router';
import { DmComponent } from './layout/dm/dm.component';
import { FriendlistComponent } from './layout/friendlist/friendlist.component';
import { RoomComponent } from './layout/room/room.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { MyAccountComponent } from './layout/settings/my-account-settings/my-account/my-account.component';

export const routes: Routes = [
  { path: 'friends', component: FriendlistComponent },
  { path: 'dm/:username', component: DmComponent },
  { path: 'room/:roomName', component: RoomComponent },
  { path: 'user-settings', 
    component: SettingsComponent ,
    children: [
      {path: 'my-account', component: MyAccountComponent},
      {path: ':section', component: DmComponent},
    ]},
];
