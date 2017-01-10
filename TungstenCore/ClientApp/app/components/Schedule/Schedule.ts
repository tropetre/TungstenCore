﻿import { Component, AfterViewInit, Inject, Input } from '@angular/core';
import { ScheduleSegment } from '../../interfaces/schedulesegment';
import { ScheduleService } from '../../services/schedule.service';

/**
 * To use the component; make sure you have it and its services listed in.
 * Then simply use it by using its selector and providing the [groupId] params.
 * <lms-schedule-app [groupId]="GroupId"></lms-schedule-app> where "GroupID" is a
 * public property of the parent component (page).
 */

@Component({
    selector: 'lms-schedule-app',
    styleUrls: ['./lms/components/Schedule/Schedule.css'],
    template: `
    <div class="schedule-wrapper">
        <div class="content">
            <canvas id="schedule-canvas" style="">
                Your browser does not support HTML5 Canvas.
            </canvas>
        </div>
    </div>`
})

export class Schedule implements AfterViewInit {

    @Input()
    public groupId: string;

    constructor( @Inject(ScheduleService) private scheduleService: ScheduleService) { }

    ngAfterViewInit(): void {
        console.log('[ScheduleComponent] GroupID Passed: ' + this.groupId);
        this.scheduleService.getSchedule(this.groupId)
            .subscribe(Segments => this.setupSchedule(Segments),
            error => console.error(error));
    }

    // DOM Variables
    private htmlCanvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    // Schedule Size Information
    private height: number;
    private width: number;
    private hourHeight: number;


    // Style Information
    public fontName: string = 'Arial';
    public fontColor: string = '#000000';
    public backgroundColor: string = '#ffffff';
    private smallFont: string;
    private largeFont: string;

    // Schedule Time-frame
    public scheduleStart: string = '07:00:00';
    public scheduleEnd: string = '17:00:00';
    private scheduleOffset: number = this.parseTimespan(this.scheduleStart);
    private dayLength: number = this.parseTimespan(this.scheduleEnd) - this.scheduleOffset;

    setupSchedule(segments: ScheduleSegment[]): void {

        // DOM Setup
        this.htmlCanvas = <HTMLCanvasElement>document.getElementById('schedule-canvas');
        this.ctx = this.htmlCanvas.getContext('2d');

        // Add EventListener to Re-render on Resize. Perhaps set a timeout on this?
        window.addEventListener('resize', (e) => this.drawSchedule(segments));

        // Render Schedule
        this.drawSchedule(segments);
    }

    drawSchedule(segments: ScheduleSegment[]): void {

        // Scaling Workaround
        this.width = this.ctx.canvas.width = this.htmlCanvas.offsetWidth;
        this.height = this.ctx.canvas.height = this.htmlCanvas.offsetHeight;

        // Setup Dynamic Properties
        this.hourHeight = this.height / this.dayLength;
        this.smallFont = this.width / 72 + 'px ' + this.fontName;
        this.largeFont = this.width / 56 + 'px ' + this.fontName;

        // Fill Background
        // this.ctx.fillStyle = this.backgroundColor;
        // this.ctx.fillRect(0, 0, this.width, this.height);

        // Setup side-ruler
        let rulerWidth: number = this.width / 14;
        this.ctx.strokeRect(0, 0, rulerWidth, this.height);

        // Style Setup for Side-Ruler
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.font = this.smallFont;

        // Start Rendering Side-Ruler
        this.ctx.beginPath();

        for (let hour = 1; hour < this.dayLength; hour++) {
            this.ctx.moveTo(rulerWidth * 3 / 4, hour * this.hourHeight);
            this.ctx.lineTo(rulerWidth, hour * this.hourHeight);
            this.ctx.fillText(hour + this.scheduleOffset + ':00', rulerWidth / 6, hour * this.hourHeight);
        }

        this.ctx.stroke();

        // Remove SideRuler from Active Drawing-Area
        this.ctx.translate(rulerWidth, 0);
        this.width -= rulerWidth;

        // Render Days
        for (let day = 0; day < 5; day++) {
            this.renderDay(day, segments.filter(
                (segment) => segment.Day === day + 1)
            );
        }
    }

    renderDay(day: number, segments: ScheduleSegment[]): void {

        // Log data that was passed into the function
        console.log('[ScheduleComponent] Day(' + day + ') rendering started. Segments passed:');
        console.log(segments);

        // Save Position to translate origin back to once rendering is complete.
        this.ctx.save();

        let colWidth = this.width / 5;
        this.ctx.translate(colWidth * day, 0);
        this.ctx.strokeRect(0, 0, colWidth, this.height);

        segments.forEach(
            (segment): void => {
                // Setup Sizing for Segment
                let segmentStart: number = this.parseTimespan(segment.StartTime) - this.scheduleOffset;
                let segmentEnd: number = this.parseTimespan(segment.EndTime) - this.scheduleOffset;
                let segmentLength: number = segmentEnd - segmentStart;

                // Set the segments background-color
                this.ctx.fillStyle = segment.Color;

                this.ctx.fillRect(0, segmentStart * this.hourHeight, colWidth, segmentLength * this.hourHeight);
                this.ctx.strokeRect(0, segmentStart * this.hourHeight, colWidth, segmentLength * this.hourHeight);

                // Reset Color and font
                this.ctx.fillStyle = this.fontColor;
                this.ctx.font = this.smallFont;

                // Draw timestamps
                this.ctx.fillText(segment.StartTime, colWidth / 16, segmentStart * this.hourHeight);
                this.ctx.fillText(segment.EndTime, colWidth / 16, segmentEnd * this.hourHeight);

                // Draw coursename
                this.ctx.font = this.largeFont;
                this.ctx.fillText(segment.CourseName, colWidth / 12, (segmentStart + segmentEnd) / 2 * this.hourHeight);
            }
        );

        this.ctx.restore();
    }

    parseTimespan(timespan: string): number {
        let parts = timespan.split(':');
        return Number(parts[0]) + Number(parts[1]) / 60;
    }
}
