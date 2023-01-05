import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'bookingSearchFilter'
})
export class BookingSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val:any) => {
        console.log(val) 
      let rVal =  (val.packageName.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.paymentId.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.id.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) || 
                   val.bookedById.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.noOfSlots.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) || 
                   val.totalBill.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
                   val.bookedDate.toString().toLocaleLowerCase().includes(args.toLocaleLowerCase()) 
                   );
      return rVal;
    })    
  }  
}