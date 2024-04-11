import { debugMode } from '@/core/repositories/optionsRepository.js'

export const isDebugMode = () => debugMode.getValue()
