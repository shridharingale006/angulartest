import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-rest-api',
  templateUrl: './rest-api.component.html',
  styleUrls: ['./rest-api.component.css']
})

export class RestApiComponent implements OnInit {
  sanitizer: any;
  videourl : any;
  searchid : any;
  constructor(private http: HttpClient,private sanitizer1: DomSanitizer) { }
  callJsonGetRestApiResponse!: string;


  ngOnInit() {
  }



  onClick(searchid:string){
    
   
      this.callJsonGetRestApi("https://pixabay.com/api/?key=29577960-41beef3d7d3a1ea40708371b0&q="+searchid+"").subscribe(data=>{
          this.callJsonGetRestApiResponse=data.hits;
          this.videourl =this.callJsonGetRestApiResponse;
          console.log("called from callJsonGetRestApi",data.hits)
          console.log(data.hits[0].pageURL)
      });
    


}


callJsonGetRestApi(url:string):Observable<any> {
   
    
  return this.http.get(url)
    .pipe(map((data: any) => {
    //handle api 200 response code here or you wanted to manipulate to response
      return data;

    }),
      catchError((error) => {    // handle error
       
        if (error.status == 404) {
          //Handle Response code here
        }
        return throwError(error);
      })
    );

}
}