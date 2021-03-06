import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LyRippleModule } from '@alyle/ui/ripple';
import { LyHeaderPagination } from './header-pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule, LyRippleModule],
  exports: [LyHeaderPagination],
  declarations: [LyHeaderPagination]
})
export class LyHeaderPaginationModule {}
