export interface Product {
    _id:string;
     title:string;
     price:number;
     priceWithoutDiscount:number;
     badge:string;
     imageUrl:string;
     description:string;
     inventory:number;
     tags:string[];
     category:{
       title:string;
       products:number;
       imageUrl:string;
     }
 }
 