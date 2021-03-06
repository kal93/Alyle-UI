import { LyMenuTriggerFor, LyTemplateMenu } from './menu';
import { LyMenu } from './menu';
import { LyCommonModule, LxDomModule } from '@alyle/ui';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from'@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule, LyCommonModule, LxDomModule],
  exports: [LyMenu, LyMenuTriggerFor],
  declarations: [LyMenu, LyMenuTriggerFor, LyTemplateMenu],
})
export class LyMenuModule { }
