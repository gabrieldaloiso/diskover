import { Component, OnInit } from '@angular/core';
import { AutoComplete } from '../auto-complete/auto-complete';
import { Password } from './password/password';
import { SwitchMap } from './switch-map/switch-map';

@Component({
    selector: 'app-obs-page',
    imports: [AutoComplete, Password, SwitchMap],
    templateUrl: './obs-page.html',
    styleUrl: './obs-page.css'
})
export class ObsPage implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
