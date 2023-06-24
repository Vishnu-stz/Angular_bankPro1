import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

	transform( transactionArray : any[]	,	searchTerm : string	,	searchKey : string )	:	any[] {
		
		// Variable to Store the input data
		const result : any = []

		if (!transactionArray || !searchTerm || !searchKey) {
			return transactionArray
		}
		else {
			transactionArray.forEach(item => {

				if (item[searchKey].includes(searchTerm)) {
					result.push(item)
				}

			})

			return result
		}


	}

	
}
