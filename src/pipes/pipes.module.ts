import { NgModule } from '@angular/core';
import { MillierPipe } from './millier/millier';
import { FormatphonePipe } from './formatphone/formatphone';
import { FormatdatePipe } from './formatdate/formatdate';
import { FormatCodeTransfertPipe } from './format-code-transfert/format-code-transfert';
import { CoupureChainePipe } from './coupure-chaine/coupure-chaine';
@NgModule({
	declarations: [/*MillierPipe,
    MillierPipe,
    FormatphonePipe,
    FormatdatePipe,
    FormatCodeTransfertPipe,
    CoupureChainePipe*/],
	imports: [],
	exports: [/*MillierPipe,
    MillierPipe,
    FormatphonePipe,
    FormatdatePipe,
    FormatCodeTransfertPipe,
    CoupureChainePipe*/]
})
export class PipesModule {}
