import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

   transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.agc_titulo.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}