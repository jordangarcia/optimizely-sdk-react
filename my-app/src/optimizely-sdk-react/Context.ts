import * as React from 'react'
import { OptimizelySDKWrapper } from './OptimizelySDKWrapper'

const { Consumer, Provider } = React.createContext<OptimizelySDKWrapper | null>(null)

export const OptimizelyContextConsumer = Consumer
export const OptimizelyContextProvider = Provider
