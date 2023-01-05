import { AbstractControl,  FormControl,  ValidationErrors } from '@angular/forms';  
    
export class userNameSpecialCharValidator {  
    static userNameSpeChar(control: AbstractControl) : ValidationErrors | null {
        const nameRegexp: RegExp = /[ !#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
        if (control.value && nameRegexp.test(control.value)) {
           return { userNameSpeChar: true };
        }

        return null;
    }

     
    
}