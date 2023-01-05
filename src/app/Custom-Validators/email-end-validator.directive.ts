import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appEmailEndValidator]',
    providers:[{
               provide: NG_VALIDATORS,
               useExisting: EmailEndValidatorDirective,
               multi: true
    }]
})


export class EmailEndValidatorDirective implements Validator{
    @Input() appEmailEndValidator :any;

     
     
    validate(control: AbstractControl<string>): {[key:string]: any} | null {
        const emailAddrs = control.parent?.get(this.appEmailEndValidator); 
        
        let email:string;
         

        // if(email.endsWith('@gmail.com') || email.endsWith('@yahoo.com') ){
        //     return {'notEnds': true }
        // }

        return null;
    }

}