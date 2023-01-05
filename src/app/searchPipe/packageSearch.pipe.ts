import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'packageSearchFilter'
})
export class PackageSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
        console.log(val) 
      let rVal =  (val.packageName.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.cost.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.location.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.description.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.slots.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.noOfPeoples.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) || 
                   val.startDate.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.endDate.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) 
                   );
      return rVal;
    })    
  } 
       
}