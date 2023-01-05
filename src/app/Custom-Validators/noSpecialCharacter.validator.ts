import { AbstractControl,  FormControl,  ValidationErrors } from '@angular/forms';  
    
export class noSpecialCharacter {  
    static noSpecialChar(control: AbstractControl) : ValidationErrors | null {
        const nameRegexp: RegExp = /[@.!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
        if (control.value && nameRegexp.test(control.value)) {
           return { noSpecialChar: true };
        }

        return null;
    }

     
    
}