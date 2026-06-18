import { Routes } from '@angular/router';
import { DmComponent } from './layout/dm/dm.component';
import { FriendlistComponent } from './layout/friendlist/friendlist.component';
import { RoomComponent } from './layout/room/room.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { MyAccountComponent } from './layout/settings/my-account-settings/my-account/my-account.component';
import { PrivacyComponent } from './layout/settings/privacy-settings/privacy/privacy.component';
import { SecurityComponent } from './layout/settings/security/security/security.component';
import { ConnectionsComponent } from './layout/settings/connections/connections/connections.component';
import { AppearanceComponent } from './layout/settings/appearance/appearance/appearance.component';
import { VoiceAndVideoSettingsComponent } from './layout/settings/voice-video/voice-and-video-settings/voice-and-video-settings.component';

export const routes: Routes = [
  { path: 'friends', component: FriendlistComponent },
  { path: 'dm/:username', component: DmComponent },
  { path: 'room/:roomName', component: RoomComponent },
  { path: 'user-settings', 
    component: SettingsComponent ,
    children: [
      {path: 'my-account', component: MyAccountComponent},
      {path: 'privacy', component: PrivacyComponent},
      {path: 'security', component: SecurityComponent},
      {path: 'connections', component: ConnectionsComponent},
      {path: 'appearance', component: AppearanceComponent},
      {path: 'voice-video', component: VoiceAndVideoSettingsComponent},
      {path: ':section', component: SecurityComponent},
    ]},
];
