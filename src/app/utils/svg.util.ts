import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser'

export const loadSvgResources = (
    ir: MatIconRegistry,
    ds: DomSanitizer
 ) =>{
    const imgDir = 'assets/img';
    const avatarDir =`${imgDir}/avatar`;
    const iconDIr = `${imgDir}/icons`;
    ir.addSvgIcon('month',ds.bypassSecurityTrustResourceUrl('https://fonts.gstatic.com/s/i/materialicons/calendar_month/v1/24px.svg'));
    ir.addSvgIconSetInNamespace('avatars',ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
    ir.addSvgIcon('move',ds.bypassSecurityTrustResourceUrl(`${iconDIr}/move.svg`));
    ir.addSvgIcon('add',ds.bypassSecurityTrustResourceUrl(`${iconDIr}/add.svg`));
    ir.addSvgIcon('delete',ds.bypassSecurityTrustResourceUrl(`${iconDIr}/delete.svg`))

}