import {trigger, state, transition,style,animate,group} from "@angular/animations"

export const routeAnim = trigger('routeAnim', [
    state('void',style({width:"100%",height:'80%'})),
    state('*',style({width:"100%",height:'80%'})),
    transition(':enter', [
        style({transform:"translateX(-100%)", opacity: 0}),
        group([
            animate('0.5s ease-in-out',  style({transform:"translateX(0%)"})),
            animate('0.4s ease-in',  style({opacity: 1})),
        ])
  
    ]),
    transition(':leave', [
        style({transform:"translateX(0%)"}),
        animate('0.5s ease-in-out',  style({transform:"translateX(100%)"}),)
    ]),
])