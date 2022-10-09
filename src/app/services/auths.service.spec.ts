import { inject, TestBed } from "@angular/core/testing";
import { AuthService } from "./auths.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from "../domain";


describe("AuthService", ()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientModule,HttpClientTestingModule],
            providers:[AuthService,
            {
                provide:"BASE_CONFIG",
                useValue : {
                    url: 'http://localhost:3000'
                }
            },
            ]
        });
    });

    it("should return a Observable<Auth>", 
    inject([AuthService,HttpClient,HttpTestingController], 
          async(service: AuthService, http:HttpClient, backend:HttpTestingController)=>{
                const mockUser=  {
                    "password": "wp123456",
                    "name": "王芃",
                    "avatar": "avatars:svg-1",
                    "email": "wpcfan@163.com",
                 
                }
                const mockResponse ={
                    "password": "wp123456",
                    "name": "王芃",
                    "avatar": "avatars:svg-1",
                    "email": "wpcfan@163.com",
                    "id": "fafef-342fea-fafaf-zscsz"
                };
                // http.get('/foo/bar').subscribe();

                // backend.match('/foo');
                // backend.verify()

                // http.get('/foo/bar').subscribe((next) => {
                //     expect(next).toEqual({ baz: '123' });
                //   });

               
        
               service.register(mockUser as User).subscribe(auth=>{
                    
                    console.log(auth)
                    expect(auth.token).toBeDefined();
                    expect(auth.user).toBeDefined();
                    expect(auth.user?.id).toEqual(mockResponse.id)

                })

                backend.expectOne('http://localhost:3000/users?'+"email="+mockUser.email).flush(null,mockResponse);
                backend.verify()

            //     expect(service).toBeTruthy()

            }))

})