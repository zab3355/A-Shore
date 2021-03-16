import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shore',
  templateUrl: './shore.component.html',
  styleUrls: ['./shore.component.scss']
})
export class ShoreComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService) { }
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  private ctx: CanvasRenderingContext2D;



  ngOnInit(): void {
    //Using canvas for animations
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  private draw() {
    let NUM_SAMPLES = 256;
    let percent;
    let circleRadius;
    let analyserNode;
    	// this schedules a call to the update() method in 1/60 seconds
			requestAnimationFrame(this.draw);
			
			/*
				Nyquist Theorem
				http://whatis.techtarget.com/definition/Nyquist-Theorem
				The array of data we get back is 1/2 the size of the sample rate 
			*/
			
			// create a new array of 8-bit integers (0-255)
			var data = new Uint8Array(NUM_SAMPLES/2); 
			
			// populate the array with the frequency data
			// notice these arrays can be passed "by reference" 
		//	analyserNode.getByteFrequencyData(data);
		
			//How to define width and height in TS
              const x = (this.canvas.nativeElement as HTMLCanvasElement).width / 2;
              const y = (this.canvas.nativeElement as HTMLCanvasElement).height / 2;
			// DRAW!
			this.ctx.clearRect(0,0,800,600);  
			var barWidth = 6;
			var barSpacing = 6;
		 	var barHeight = 250;
			var topSpacing = 105;
			
			// loop through the data and draw!
			for(var i=0; i<data.length; i++) { 

    this.ctx.beginPath();

    this.ctx.fillStyle = this.makeColor(50,70,150,.4-percent/15.0);
    this.ctx.arc(x,y,circleRadius *.50,0,2*Math.PI,false);
    this.ctx.fill();
    this.ctx.closePath();

   /* this.ctx.font = "30px Arial";
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';

    this.ctx.fillText("hello!", x, y);*/
    
      }
        //rectangle bars
       this.ctx.fillRect(i * (barWidth + barSpacing),topSpacing + 200-data[i],barWidth,barHeight);

       //this.manipulatePixels();
             	
       //Save, restore, and activate options
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.fillStyle= this.makeColor(200,200,0, .5 - percent/5.0);
      this.ctx.arc(x,y, circleRadius * .50 , 0 , 2 * Math.PI, false);
      this.ctx.closePath();
      this.ctx.restore();
  }

  makeColor(red, green, blue, alpha){
    var color='rgba('+red+','+green+','+blue+', '+alpha+')';
    return color;
  }

}
