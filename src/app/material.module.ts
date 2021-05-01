import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
const data = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule
]

@NgModule({
  imports: data,
  exports: data
})
export class MaterialModule {}