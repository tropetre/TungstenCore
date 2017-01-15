import { Component, Input, animate, trigger, state, style, transition, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';

@Component({
    selector: 'dropdownbox',
    template: require('./dropdownbox.html'),
    styles: [require('./dropdownbox.css')],
    animations: [
        trigger('openClose', [
            state('open', style({ height: '*', opacity: 1})),
            state('close', style({ height: '0px', opacity: 0 })),
            transition('open => close', [animate('300ms', style({ opacity: 0, height: '0px' }))]),
            transition('close => open', [animate('300ms', style({ opacity: 1, height: '*' }))])
        ])
    ]
})
export class DropdownBox implements OnInit, AfterViewInit {
    @Input('title') Title: string;
    @Input('content') Content: any;
    @Input('content-type') ContentType: any;
    @Input('create-id') CreateId: string;
    @Input('role') role: string;
    @ViewChild('schedule') schedule: ElementRef;
    isOpen: string;

    constructor(@Inject(Renderer) private renderer: Renderer) {
        this.isOpen = 'close';
    }

    ngOnInit() {
        this.isOpen = 'close';
        console.log(this.Content);
    }
    
    OpenClose() {
        //console.log(this.ContentType + ':');
        //console.log(this.Content);
        if (this.isOpen === 'open')
            this.isOpen = 'close';
        else if (this.isOpen === 'close')
            this.isOpen = 'open';
    }

    isSchedule() {
        return (this.schedule.nativeElement.childNodes.length > 2);
    }

    ngAfterViewInit() {
        if (this.schedule.nativeElement.childNodes.length < 3)
            this.renderer.setElementStyle(this.schedule.nativeElement, 'display', 'none');

        this.renderer.setElementClass(this.schedule.nativeElement, 'item', (this.schedule.nativeElement.childNodes.length > 2));
    }

    ngSwitcher(i: number): number {
        if (i === 0)
        {
            return 0;
        }
        if (i === 1)
        {
            return 1;
        }
        return 9999;
    }
}