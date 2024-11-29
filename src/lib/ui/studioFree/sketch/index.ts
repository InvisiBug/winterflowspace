import { P5CanvasInstance, ReactP5Wrapper, SketchProps } from "react-p5-wrapper";
import { Gym, ActivitiesEntity } from "@/lib/types/schedule";
import { parseSchedule } from "../utils";
import { text } from "stream/consumers";

type MySketchProps = SketchProps & {
  sketchProps: Gym;
};

const breakpoints: Record<string, number> = {
  small: 500,
  medium: 768,
  xmedium: 950,
  large: 1500,
  xlarge: 1750,
};

/*
 * schedule passed in as a prop from getServerSideProps ./pages/studioFree.tsx
 * and parsed at the bottom of this file
 */
export const sketch = (p5: P5CanvasInstance<MySketchProps>) => {
  let schedule: number[][] = [];

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.draw = () => {
    p5.noLoop();

    const DAYS = 0;
    const TIME_SLOT = 1;

    const dimensions = [schedule.length /* Days */, schedule[0].length /* Time slot (15 min) */];
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dotSize = 10;

    let xmargin = 0;
    if (p5.windowHeight > 400) {
      xmargin = p5.windowWidth / 10;
    } else {
      xmargin = p5.windowWidth / 9;
    }

    let ymargin = 0;
    if (p5.windowHeight > 400) {
      ymargin = p5.windowHeight / 2.5;
    } else {
      ymargin = p5.windowHeight / 4;
    }

    console.log(p5.windowHeight);

    const textColour = p5.color("#E6E6E6");
    const freeColour = p5.color("#86A95B");
    const inUseColour = p5.color("#710000");

    console.log("This", schedule[0].length);
    /*
      Create header and sub title
    */
    if (p5.windowHeight > 300) {
      p5.fill(textColour);
      p5.textSize(50);
      p5.textStyle(p5.BOLD);
      p5.textAlign(p5.CENTER);
      p5.text("Winter Flow Space", p5.width / 2, p5.height / 5 - 10);

      p5.textSize(25);
      p5.textStyle(p5.NORMAL);
      p5.text("Studio availability at my local gym (in 15min intervals) \nSoon to be all gyms", p5.width / 2, p5.height / 5 + 25);
    }

    let startingY = 0;
    let flag = false;

    for (let x = 0; x < dimensions[TIME_SLOT]; x++) {
      for (let y = 0; y < dimensions[DAYS]; y++) {
        const u = x / dimensions[TIME_SLOT];
        const v = y / (dimensions[DAYS] - 1);

        const xpos = p5.lerp(xmargin, p5.windowWidth - xmargin, u);
        const ypos = p5.lerp(ymargin, p5.height - ymargin, v);

        // Nasty hack to get the lines to draw between the first and last row
        if (y === 0 && !flag) {
          startingY = ypos;
          flag = true;
          console.log("here");
        }
        console.log("Starting y", startingY);

        p5.fill(textColour);
        p5.textSize(16);

        /*
          Row titles (Which day is it)
        */
        const oldPos = false;
        if (oldPos) p5.textAlign(p5.LEFT);
        if (!oldPos) p5.textAlign(p5.RIGHT);

        if (x === 0) {
          if (y === 0) {
            if (oldPos) p5.text(`Today`, xpos - 10, ypos - 15);
            if (!oldPos) p5.text(`Today`, xpos - 15, ypos + 4);
          } else if (y === 1) {
            if (oldPos) p5.text(`Tomorrow`, xpos - 10, ypos - 15);
            if (!oldPos) p5.text(`Tomorrow`, xpos - 15, ypos + 4);
          } else {
            const day = new Date();
            day.setDate(day.getDate() + y);
            if (oldPos) p5.text(`${weekday[day.getDay()]}`, xpos - 10, ypos - 15);
            if (!oldPos) p5.text(`${weekday[day.getDay()]}`, xpos - 15, ypos + 4);
          }
        }

        /*
          Draw the schedule markers
        */
        if (schedule[y][x] === 0) {
          p5.fill(freeColour);
        } else {
          p5.fill(inUseColour);
        }
        p5.ellipse(xpos, ypos, dotSize);

        /*
          Only show times on the hour
        */
        if (x % 4 === 0 && y === 4) {
          p5.stroke(0, 0, 0);
          p5.fill(textColour);
          p5.stroke(p5.color("#696866"));
          p5.line(xpos, startingY, xpos, ypos + 20);
          p5.stroke(0, 0, 0);

          p5.textAlign(p5.CENTER);
          // p5.text(`${x / 4}:00`, xpos, ypos + 40);
          p5.text(`${x / 4}`, xpos, ypos + 40);
        }
      }
    }
  };

  /*
    Raw schedule data is passed in
    Parse the data and save the parsed schedule
  */
  p5.updateWithProps = ({ sketchProps }: { sketchProps: Gym }) => {
    const { activities } = sketchProps;

    schedule = parseSchedule(activities);
    console.log(schedule);
  };

  p5.mouseClicked = () => {};

  p5.mouseDragged = () => {};
};

export interface Config {
  p5: P5CanvasInstance<MySketchProps>;
}
