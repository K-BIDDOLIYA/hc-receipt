import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080,
  seed: 67,
};

export function drawReceipt(p) {
  const w = p.width;
  const margin = 24;

  p.background(255);


  // HEADER

  p.fill(0);
  p.noStroke();
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.BOLD);
  p.textSize(25);

  p.text("KARTIK", w / 2, 28);

  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text("HACK CLUB RECEIPT", w / 2, 58);

  dashedLine(p, margin, 88, w - margin, 88, 6, 5);


  // SMALL TOP DECORATION

  drawSmallStar(p, 55, 135, 9);
  drawSmallStar(p, w - 55, 135, 9);

  p.noStroke();
  p.fill(0);
  p.textSize(10);
  p.textStyle(p.BOLD);

  p.text("★", w / 2 - 35, 128);
  p.text("★", w / 2 + 35, 128);

  // STAR

  p.push();
  p.translate(w / 2, 350);

  // Outer star
  p.fill(255);
  p.stroke(0);
  p.strokeWeight(6);

  drawStar(p, 205, 92, 5);

  // Inner star
  p.noFill();
  p.strokeWeight(2);

  drawStar(p, 184, 82, 5);

  // Little dots
  p.fill(0);
  p.noStroke();

  p.circle(0, -143, 7);
  p.circle(143, 0, 7);
  p.circle(0, 143, 7);
  p.circle(-143, 0, 7);

  p.pop();

  // ========

  p.fill(0);
  p.noStroke
  p.textAlign(p.CENTER, p.CENTER);

  p.textStyle(p.BOLD);
  p.textSize(28);

  p.text("KARTIK BIDDOLIYA", w / 2, 320);

  // X
  p.noStroke();
  p.textSize(40);
  p.text("×", w / 2, 360);

  // Hack Club
  p.textSize(24);
  p.text("STARDANCE", w / 2, 400);


  drawSmallStar(p, 55, 300, 8);
  drawSmallStar(p, w - 55, 300, 8);

  drawSmallStar(p, 55, 450, 6);
  drawSmallStar(p, w - 55, 450, 6);


  p.noStroke();
  p.textStyle(p.NORMAL);
  p.textSize(11);

  p.text(
    "BUILD • CREATE • SHARE",
    w / 2,
    520
  );

  p.textSize(9);

  dashedLine(
    p,
    margin,
    580,
    w - margin,
    580,
    6,
    5
  );

  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);

  p.rect(
    margin,
    615,
    w - margin * 2,
    105
  );

  p.noStroke();
  p.fill(0);
  p.textAlign(p.LEFT, p.CENTER);

  p.textStyle(p.BOLD);
  p.textSize(10);

  p.text("MEMBER", margin + 12, 640);
  p.text("ORGANISATION", margin + 12, 670);
  p.text("YEAR", margin + 12, 700);

  p.textStyle(p.NORMAL);
  p.text("KARTIK BIDDOLIYA", w - margin - 100, 640);
  p.textAlign(p.RIGHT, p.CENTER);

  p.text("HACK CLUB", w - margin - 12, 670);
  p.text("2026", w - margin - 12, 700);

  p.textAlign(p.CENTER, p.CENTER);

  const barcodeValue = "KARTIK-X-HACK-CLUB";

  drawBarcode(
    p,
    barcodeValue,
    w / 2,
    765
  );

  p.noStroke();
  p.fill(0);
  p.textStyle(p.NORMAL);
  p.textSize(9);

  p.text(
    barcodeValue,
    w / 2,
    835
  );

  // FOOTER

  dashedLine(
    p,
    margin,
    875,
    w - margin,
    875,
    6,
    5
  );

  p.textStyle(p.BOLD);
  p.textSize(13);

  p.text(
    "★ KEEP BUILDING ★",
    w / 2,
    910
  );

  p.textStyle(p.NORMAL);
  p.textSize(9);

  p.text(
    "THANK YOU FOR CREATING",
    w / 2,
    940
  );
}


// STAR

function drawStar(p, outerRadius, innerRadius, points) {
  p.beginShape();

  for (let i = 0; i < points * 2; i++) {
    const angle =
      -p.HALF_PI +
      i * p.PI / points;

    let radius;

    if (i % 2 === 0) {
      radius = outerRadius;
    } else {
      radius = innerRadius;
    }

    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;

    p.vertex(x, y);
  }

  p.endShape(p.CLOSE);
}


// SMALL STAR

function drawSmallStar(p, x, y, size) {
  p.push();

  p.translate(x, y);

  p.fill(0);
  p.noStroke();

  drawStar(
    p,
    size,
    size / 2,
    5
  );

  p.pop();
}


// BARCODE

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas =
    document.createElement("canvas");

  JsBarcode(
    barcodeCanvas,
    value,
    {
      format: "CODE128",
      width: 1,
      height: 52,
      displayValue: false,
      margin: 0,
      background: "#ffffff",
      lineColor: "#000000",
    }
  );

  p.drawingContext.drawImage(
    barcodeCanvas,
    Math.floor(
      centerX -
      barcodeCanvas.width / 2
    ),
    y
  );
}


// DASHED LINE

function dashedLine(
  p,
  x1,
  y1,
  x2,
  y2,
  dash,
  gap
) {
  p.stroke(0);
  p.strokeWeight(2);

  for (
    let x = x1;
    x < x2;
    x += dash + gap
  ) {
    p.line(
      x,
      y1,
      Math.min(x + dash, x2),
      y2
    );
  }
}
