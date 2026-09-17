import type {Rect} from "../types";
export const overlaps=(a:Rect,b:Rect):boolean=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
