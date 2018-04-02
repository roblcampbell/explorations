import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
//     template: `<iframe src="'vendor/svg-edit-2.8.1/svg-editor.html'" width="100%" height="100%"
//                        id="svg-edit" name="svg-edit"></iframe>`,
    styleUrls: ['./app.component.css']
})
export class DrcSvgEditorComponent implements OnInit {

    private canvas: any;

    // Size of the HTML canvas.
    private canvasWidth: number = 700;
    private canvasHeight: number = 400;
    // Drawing area background.
    private canvasFill: string = '#ffffff';
        // Image to display on drawing area background.
    private canvasImage: string = '';

    // The object that is current selected, if any.
    private selected: any;

    constructor() {
    }

    ngOnInit() {

        // Set up front-side canvas.
        // this.canvas = ;
        // this.canvas.setWidth(this.canvasWidth);
        // this.canvas.setHeight(this.canvasHeight);

    }

}
