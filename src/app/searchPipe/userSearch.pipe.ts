import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'userSearchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
        console.log(val) 
      let rVal =  (val.name.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.email.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.userName.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.mobile.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.userName.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.age.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.id.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.createdOn.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) 
                   );
      return rVal;
    })

  } 
       
}