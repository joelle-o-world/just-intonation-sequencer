import * as React from 'react';
import {FunctionComponent, createContext, useContext} from 'react';

export const linearFrequencyScale = {
  fToY: (f: number) => f,
  yToF: (y: number) => y,
}

export interface TimeFrequencyPlotProps {
  tLeft: number;
  tRight: number;
  fTop: number;
  fBottom: number;
  frequencyScale?: {
    fToY: (f: number) => number;
    yToF: (y: number) => number;
  }
}
export const TimeFrequencyPlot: FunctionComponent<TimeFrequencyPlotProps> = ({
  tLeft, tRight,
  fTop, fBottom, 
  frequencyScale = linearFrequencyScale,
  children
}) => {
  const width = 500
  const height = 400
  const viewBox = `0 0 ${width} ${height}`
  return <svg width={`${width}px`} height={`${height}px`} viewBox={viewBox}>
    <TimeFrequencyPlotContext.Provider value={{tLeft, tRight, fTop, fBottom, frequencyScale, width, height}}>
      {children}
    </TimeFrequencyPlotContext.Provider>
  </svg>
}
export default TimeFrequencyPlot;

export const TimeFrequencyPlotContext = createContext({
  tLeft: 0,
  tRight: 1,
  fTop: 440,
  fBottom: 220,
  width: 550,
  height: 400,
  frequencyScale: linearFrequencyScale
})

export function useTimeAxis() {
  let {width, tLeft, tRight} = useContext(TimeFrequencyPlotContext)
  return (t:number) => width * (t - tLeft) / (tRight - tLeft)
}


