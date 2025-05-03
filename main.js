const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#87CEEB",
  scene: {
    create,
    preload,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 }
    }
},
};

const game = new Phaser.Game(config);

let ball;
let cursors;
let landHeight = 100;
const ballRadius = 30;
let canvasHeight,canvasWidth;
let ballSpeed=5;

function preload() {
  const circleGfx = this.make.graphics({ x: 0, y: 0, add: false });
  circleGfx.fillStyle(0xFF0000, 1);
  circleGfx.fillCircle(ballRadius, ballRadius, ballRadius);
  circleGfx.generateTexture('redBall', ballRadius * 2, ballRadius * 2);
}

function create() {
  const graphics = this.add.graphics();

  const landHeight = 100;
  const greenTopHeight = 20;
  canvasWidth = this.scale.width;
  canvasHeight = this.scale.height;
 

  graphics.fillStyle(0x8b4513, 1);
  graphics.fillRect(0, canvasHeight - landHeight, canvasWidth, landHeight);

  graphics.fillStyle(0x228b22, 1);
  graphics.fillRect(0, canvasHeight - landHeight, canvasWidth, greenTopHeight);
  ball = this.physics.add.image(canvasWidth / 4, canvasHeight - landHeight - ballRadius, 'redBall');
  ball.setOrigin(0.5);
  ball.setCollideWorldBounds(true);
  ball.setBounce(0.9);
  ball.setCircle(ballRadius);
  

  cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.startFollow(ball);

  this.cameras.main.setBounds(0, 0, canvasWidth * 2, canvasHeight);
  this.physics.world.setBounds(0, 0, canvasWidth * 2, canvasHeight);

  this.add.text(20, 20, "Balls Land", { font: "20px Arial", fill: "#ffffff" });
}

function update() {
    if (cursors.left.isDown) {
        ball.setVelocityX(-ballSpeed); 
       
    }
    else if (cursors.right.isDown) {
        ball.setVelocityX(ballSpeed); 
    }
    else {
        ball.setVelocityX(0); 
    }
}