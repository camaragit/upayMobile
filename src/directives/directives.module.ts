import { NgModule } from '@angular/core';
import { MadirectiveDirective } from './madirective/madirective';
import { LowercaseDirective } from './lowercase/lowercase';
@NgModule({
	declarations: [MadirectiveDirective,
    LowercaseDirective],
	imports: [],
	exports: [MadirectiveDirective,
    LowercaseDirective]
})
export class DirectivesModule {}
