window.addEventListener("load",function() {
	var canvas	= document.getElementsByTagName("canvas")[0],
		context	= canvas.getContext("2d"),
		width	= canvas.width	= window.innerWidth,
		height	= canvas.height	= window.innerHeight;
	
	
	var ball = {
		speedx	: 0,
		speedy	: 0,
		accly	: 0,
		attrs	: 0,
		fric	: 0.9,
		gravity	: 0.1,
		bounce	: 0.9,
		bsize	: 50,
		attrpx	: width/2,
		attrpy	: height/2,
		attrf	: 1,
			x	: width/2,
			y	: 50, // Must be same as bsize
			r	: 0,
			g	: 0,
			b	: 0,

		create: function() {
			var obj	= Object.create(this)
			obj.wall	= width || 0
			obj.ground	= height || 0
			console.log("Object created")

			document.addEventListener("mousedown", function(event) {
				obj.attrs	= 0.1;
				obj.bounce	= 0;
				obj.gravity	= 0;
				obj.accly	= 0;
				obj.attrf	= 0.8;
			});
			document.addEventListener("mouseup", function(event) {
				obj.attrs	= 0;
				obj.bounce	= 0.8;
				obj.gravity	= 0.1;
				obj.attrf	= 1;
			});
			document.addEventListener("mousemove",function(event) {
				obj.attrpx = event.clientX;
				obj.attrpy = event.clientY;
			});

			return obj;
		},
		render: function() {
			view	= 1
			cam		= context.getImageData(this.x-(view/2),this.y-(view/2)+this.bsize,view,view)
			console.log(cam[3])

			this.speedx *= this.attrf;
			this.speedx += (this.attrpx - this.x) * this.attrs;
			this.x += this.speedx;
			
			this.accly	+= this.gravity;
			this.speedy	+= this.accly;
			this.speedy	*= this.attrf;
			this.speedy	+= (this.attrpy - this.y) * this.attrs;
			this.y += this.speedy;
			
			if(this.x<this.bsize) {
				this.x = this.bsize;
				this.speedx = -(this.speedx * this.bounce);
				this.r += Math.floor(70 * this.bounce);
				this.g -= Math.floor(20 * this.bounce);
				this.b -= Math.floor(20 * this.bounce);
			}
			if(this.x > this.wall - this.bsize) {
				this.x = this.wall - this.bsize;
				this.speedx = -(this.speedx * this.bounce);
				this.b += Math.floor(70 * this.bounce);
				this.g -= Math.floor(20 * this.bounce);
				this.r -= Math.floor(20 * this.bounce);
			}
			if(this.y<this.bsize) {
				this.y = this.bsize;
				this.speedy = -(this.speedy * this.bounce);
				this.g += Math.floor(70 * this.bounce);
				this.r -= Math.floor(20 * this.bounce);
				this.b -= Math.floor(20 * this.bounce);
			}
			if(this.y>this.ground-this.bsize) {
				this.y = this.ground - this.bsize;
				this.speedx	*= this.fric;
				this.speedy	= -(this.speedy * this.bounce);
			}
			
			if(this.r > 255) this.r = 255;
			if(this.g > 255) this.g = 255;
			if(this.b > 255) this.b = 255;
			if(this.r < 0) this.r = 0;
			if(this.g < 0) this.g = 0;
			if(this.b < 0) this.b = 0;
			
			context.clearRect(0,0,this.wall,this.ground);
			context.beginPath();
			context.arc(this.x,this.y,this.bsize,0,Math.PI*2);
			context.fillStyle = "rgb("+this.r+","+this.g+","+this.b+")";
			context.fill();
			
		}
	}
	b1 = ball.create()
	start()
	function start() {
		b1.render()
		requestAnimationFrame(start);
	}
	
});