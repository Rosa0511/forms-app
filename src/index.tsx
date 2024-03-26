import React, { useEffect } from 'react';
import {useState} from 'react';
import { apiKey } from './apiKey';

interface Form {
  formId:string;
  id:number;
  name:string;
}
/*interface FilterClauseType {
	id: string,
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
};*/
const FilterClauseType = {
    id: 'string',
    condition: 'equals | does_not_equal | greater_than | less_than',
    value: 'number | string'
};


const stringifyFilterClauseType =JSON.stringify(FilterClauseType);



export default function Demo(){
const [forms,setForms] = useState<Form[]>([]);
const headers = {
    "Authorization" :'Bearer' +' ' + apiKey
}

useEffect(()=>{
    
const fetchForms = async () =>{
const response = await fetch('https://api.fillout.com/v1/api/forms?cLZojxk94ous?' +
new URLSearchParams(stringifyFilterClauseType).toString(),{ 
    method:'GET',
    headers    
 });
const forms = await response.json();
console.log(forms);
setForms(forms);
};
fetchForms();
},[]);


return(
    <div>
        <h1>
            Data Fetching from Fillout
        </h1>
        {forms.map((form)=>
        <ul>
            <li key={form.id}>
               <label> FormId:</label> {form.formId} <br/>
               <label>Name:</label> {form.name}                
            </li>
        </ul>)}
    </div>
)

}