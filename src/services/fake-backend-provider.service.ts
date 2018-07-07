import { BaseRequestOptions, RequestMethod, Response, ResponseOptions, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  console.log("Running fake backend factory");

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTMwOTYyOTkzLCJleHAiOjE1Mzk5NjI5OTMsImFkbWluIjp0cnVlfQ.p77mJIx_JVJbazqTQXMYdJelvlW0ChcRcYMs_lBpGkY';
  //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6ZmFsc2V9.ulv5cd7x2VZBuXApvqDNlmBr2xswo9OX-GAUCXDv9s0';

  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(() => {
      console.log('inside the timeout');

      //Authentication**
      if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'majid@gmail.com' && body.password === '1234') {
          // success
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
            })
          ));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 400 })
          ));
        }
      }
      //End of authentication**

      //Start of orders**
      // fake implementation of /api/order
      if (connection.request.url.endsWith('/api/order') && connection.request.method === RequestMethod.Get) {

        if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
          // success authorized
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: [1, 2, 3, 4]
            })
          ));
        } else {
          // failure unauthorized
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 401 })
          ));
        }
        //End of orders
      }
    }, 500);
  });
  return new Http(backend, options);
}

export let fakeBackendProvider = {
  //when we inject HTTP
  provide: Http,
  //use factory function !
  useFactory: fakeBackendFactory,
  //factory function depend on these
  deps: [MockBackend, BaseRequestOptions]
};
