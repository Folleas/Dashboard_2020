import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/_models';
import { authentificationService } from 'src/app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    constructor(
        private route: ActivatedRoute,
        public router: Router,
      ) {
    }
  
    ngOnInit() {
    }
}