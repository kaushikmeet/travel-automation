import { Injectable } from '@angular/core'

@Injectable({ providedIn:'root' })
export class ThemeService{

toggleTheme(){

const body = document.body

if(body.classList.contains('dark-theme')){
  body.classList.remove('dark-theme')
}else{
  body.classList.add('dark-theme')
}

}

}